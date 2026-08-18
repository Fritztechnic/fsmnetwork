#!/usr/bin/env bash
# Installs/updates FSM Network on a Debian/Ubuntu server, builds it, and runs it
# permanently in the background via systemd (auto-starts on reboot/crash).
#
# Usage: sudo ./install.sh
# Config (env vars, all optional):
#   REPO_URL      default https://github.com/Fritztechnic/fsmnetwork.git
#   INSTALL_DIR   default /opt/fsmnetwork
#   PORT          default 3000
#   SERVICE_NAME  default fsmnetwork
#   RUN_USER      default fsmnetwork (system user, created if missing)

set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/Fritztechnic/fsmnetwork.git}"
INSTALL_DIR="${INSTALL_DIR:-/opt/fsmnetwork}"
PORT="${PORT:-3000}"
SERVICE_NAME="${SERVICE_NAME:-fsmnetwork}"
RUN_USER="${RUN_USER:-fsmnetwork}"
NODE_MAJOR="${NODE_MAJOR:-20}"

log() { printf '\n\033[1;32m==> %s\033[0m\n' "$1"; }

if [[ "${EUID}" -ne 0 ]]; then
  echo "Please run this script as root (e.g. sudo ./install.sh)." >&2
  exit 1
fi

if ! command -v apt-get >/dev/null 2>&1; then
  echo "This script only supports Debian/Ubuntu (apt-get not found)." >&2
  exit 1
fi

# --- git ---
if ! command -v git >/dev/null 2>&1; then
  log "git not found, installing..."
  apt-get update -y
  apt-get install -y git
else
  log "git already installed ($(git --version))"
fi

# --- node.js / npm ---
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  log "Node.js not found, installing Node.js ${NODE_MAJOR}.x via NodeSource..."
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
else
  log "Node.js already installed ($(node -v), npm $(npm -v))"
fi

# --- dedicated system user to run the app (not root) ---
if ! id -u "${RUN_USER}" >/dev/null 2>&1; then
  log "Creating system user '${RUN_USER}'..."
  useradd --system --create-home --shell /usr/sbin/nologin "${RUN_USER}"
fi

# --- fetch the website ---
if [[ -d "${INSTALL_DIR}/.git" ]]; then
  log "Existing checkout found in ${INSTALL_DIR}, updating..."
  git -C "${INSTALL_DIR}" fetch --depth 1 origin main
  git -C "${INSTALL_DIR}" reset --hard origin/main
else
  log "Cloning ${REPO_URL} into ${INSTALL_DIR}..."
  mkdir -p "$(dirname "${INSTALL_DIR}")"
  git clone --depth 1 "${REPO_URL}" "${INSTALL_DIR}"
fi
chown -R "${RUN_USER}:${RUN_USER}" "${INSTALL_DIR}"

# --- install dependencies & build ---
log "Installing dependencies..."
sudo -u "${RUN_USER}" npm ci --prefix "${INSTALL_DIR}"

log "Building production bundle..."
sudo -u "${RUN_USER}" npm run build --prefix "${INSTALL_DIR}"

# --- systemd service: runs permanently, restarts on crash and on server reboot ---
log "Writing systemd service (${SERVICE_NAME})..."
cat > "/etc/systemd/system/${SERVICE_NAME}.service" <<EOF
[Unit]
Description=FSM Network website
After=network.target

[Service]
Type=simple
User=${RUN_USER}
WorkingDirectory=${INSTALL_DIR}
Environment=NODE_ENV=production
ExecStart=${INSTALL_DIR}/node_modules/.bin/next start -p ${PORT}
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

log "Enabling and starting ${SERVICE_NAME}..."
systemctl daemon-reload
systemctl enable "${SERVICE_NAME}"
systemctl restart "${SERVICE_NAME}"

log "Done. FSM Network is running on port ${PORT} and will survive reboots."
systemctl --no-pager status "${SERVICE_NAME}"
