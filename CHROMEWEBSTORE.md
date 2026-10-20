# Chrome Web Store publishing — QuoteURL Bibtex

Last updated: 2026-10-20.

Existing listing: https://chromewebstore.google.com/detail/quoteurl-bibtex/emfeiimnpfdlnppacfklndigkpkkmbpn

The extension copies a BibTeX reference for the current page using its title, URL, and available author/date metadata. `activeTab` and `scripting` let it inspect the current page after an explicit action. `clipboardWrite` supports copying the reference, and `contextMenus` provides the page menu action. This migration changes publishing automation only. Listing copy, screenshots, privacy disclosures, visibility, and distribution settings are managed in the Developer Dashboard and were not changed or independently verified here.

## Publishing configuration

The publish workflow uses Chrome Web Store API v2 through the locked `chrome-webstore-upload@6.0.1` library on Node.js 24. It retains the existing `CLIENT`, `SECRET`, and `TOKEN` repository secrets. The `CHROME_PUBLISHER_ID` repository variable must contain the publisher account ID from the Developer Dashboard, not the extension ID or display name. It is configured for this repository.

Pull requests check syntax and package the extension without accessing the store. Pushes to `main` upload and submit for review. Version `0.0.8` is prepared for the publishing verification release. The previous `0.0.7` version is already public. The tested `scripts/publish-cws.mjs` checks versions, uploads, requests `DEFAULT_PUBLISH`, and reports provider status. `pnpm publish:cws --status` is read-only; the manually dispatched workflow defaults to status mode. Existing store visibility and rollout settings remain in effect.

The package includes only the manifest, runtime scripts, images, and existing `LISENCE` file. See the [migration handoff](docs/cws-api-v2.md) or its [offline HTML version](docs/cws-api-v2.html) for evidence and release checks. API acceptance, Google review, and public availability are distinct states.

Documentation-only pushes no longer trigger publication. The October 20 live runs rejected the sibling extensions’ saved OAuth grants; reauthorisation is required before claiming a successful update. See the handoff for exact run evidence.
