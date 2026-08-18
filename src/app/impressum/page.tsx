import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold sm:text-4xl">Impressum</h1>
      <p className="mt-2 text-sm text-muted">Angaben gemäß § 5 DDG</p>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-text">
        <section>
          <h2 className="font-display text-lg font-semibold text-text">
            Anbieter / Verantwortlicher
          </h2>
          <p className="mt-3 text-muted">
            Uwe Israel Serverdienstleistungen
            <br />
            Honnefer Grenzweg 20
            <br />
            53639 Königswinter
            <br />
            Deutschland
          </p>
          <p className="mt-3 text-muted">Vertreten durch: Uwe Israel</p>
          <p className="mt-3 text-muted">
            Tätigkeit: IT-Dienstleistungen, Hosting und Serverinfrastruktur
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text">Kontakt</h2>
          <p className="mt-3 text-muted">
            Telefon:{" "}
            <a href="tel:+491714094248" className="text-text hover:text-primary">
              +49 171 4094248
            </a>
          </p>
          <p className="mt-3 text-muted">
            E-Mail:{" "}
            <a href="mailto:info@vioserve.de" className="text-text hover:text-primary">
              info@vioserve.de
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text">
            Register / Steuern
          </h2>
          <p className="mt-3 text-muted">
            Unternehmensform: Einzelunternehmen (nicht im Handelsregister eingetragen)
          </p>
          <p className="mt-3 text-muted">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE458863672
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p className="mt-3 text-muted">
            Uwe Israel
            <br />
            Honnefer Grenzweg 20, 53639 Königswinter
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text">
            Haftungsausschluss (Disclaimer)
          </h2>
          <p className="mt-3 text-muted">
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
            Haftung für die Inhalte externer Links. Für den Inhalt der
            verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text">Urheberrecht</h2>
          <p className="mt-3 text-muted">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht.
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text">
            Online-Streitbeilegung / Verbraucherschlichtung
          </h2>
          <p className="mt-3 text-muted">
            Die Europäische Kommission hat ihre Plattform zur
            Online-Streitbeilegung (OS-Plattform) zum 20. Juli 2025
            eingestellt (Verordnung (EU) 2024/3228). Eine Übersicht der
            nationalen Verbraucherschlichtungsstellen ist unter{" "}
            <a
              href="https://consumer-redress.ec.europa.eu/dispute-resolution-bodies"
              target="_blank"
              rel="noreferrer"
              className="text-text hover:text-primary"
            >
              consumer-redress.ec.europa.eu
            </a>{" "}
            abrufbar.
          </p>
          <p className="mt-3 text-muted">
            Wir sind nicht verpflichtet und nicht bereit, an einem
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            im Sinne des Verbraucherstreitbeilegungsgesetzes (VSBG)
            teilzunehmen.
          </p>
        </section>
      </div>
    </div>
  );
}
