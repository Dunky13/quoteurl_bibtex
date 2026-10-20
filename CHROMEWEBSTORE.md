# Chrome Web Store publishing — QuoteURL Bibtex

Last updated: 2026-10-20.

Existing listing: https://chromewebstore.google.com/detail/quoteurl-bibtex/emfeiimnpfdlnppacfklndigkpkkmbpn

The extension copies a BibTeX reference for the current page using its title, URL, and available author/date metadata. `activeTab` and `scripting` let it inspect the current page after an explicit action. `clipboardWrite` supports copying the reference, and `contextMenus` provides the page menu action. This migration changes publishing automation only. Listing copy, screenshots, privacy disclosures, visibility, and distribution settings are managed in the Developer Dashboard and were not changed or independently verified here.

## Publishing configuration

The publish workflow uses Chrome Web Store API v2 through `chrome-webstore-upload-cli@4.0.2` on Node.js 24. It retains the existing `CLIENT`, `SECRET`, and `TOKEN` repository secrets. The `CHROME_PUBLISHER_ID` repository variable must contain the publisher account ID from the Developer Dashboard, not the extension ID or display name. It is configured for this repository.

Pull requests check syntax and package the extension without accessing the store. Pushes to `main` upload and submit for review. The manifest version remains unchanged. Running the CLI without a subcommand requests `DEFAULT_PUBLISH`; `upload` alone would leave a draft. Existing store visibility and rollout settings remain in effect.

The package includes only the manifest, runtime scripts, images, and existing `LISENCE` file. See the [migration handoff](docs/cws-api-v2.md) or its [offline HTML version](docs/cws-api-v2.html) for evidence and release checks. API acceptance, Google review, and public availability are distinct states.
