# StreamDesk service directory

This private repository is the owner-managed list of services offered in StreamDesk's customer service selector.

## Customer flow

Select a named service, enter a username and password, and connect directly to that service's Xtream API. Customer credentials belong on the customer's device and must never be committed here.

## Manage services

Open providers.json in GitHub, choose Edit, change the list, and commit your changes. GitHub controls who can edit this repository. Validation runs on changes when GitHub Actions is available.

The list starts empty. providers.example.json is a disabled, fictional example and is not the customer feed.

Each service has:
- id: a unique stable lowercase identifier. Keep it unchanged when renaming a service or changing its host.
- name: the customer-facing service name.
- serverUrl: the provider's base HTTP(S) URL, optionally including a port. No usernames, passwords, query strings or playlist URLs.
- protocol: xtream.
- enabled: true to offer the service; false to hide it for new logins.
- logoUrl: optional HTTPS image URL without credentials or query parameters.

Disabling a listing is not a revocation mechanism for accounts or app versions that already cached it.

## Validate locally

With Node.js installed: node validate.mjs providers.json

The production file must contain schemaVersion: 1 and a services array. Unknown fields are rejected to help prevent accidentally including credentials.

## Hosting status

This repository is private. Its contents are NOT yet a public customer feed, and GitHub authentication tokens must never be embedded in customer builds.

GitHub's authenticated editor is the initial management interface. A custom hosted admin panel is not deployed.

Before customer distribution, choose either:
1. A public read-only catalog endpoint containing only approved service names, base URLs and branding, with private editing retained here; or
2. An authenticated backend if service-directory access must be restricted.

GitHub Pages is static hosting, not an authenticated API. A private source repository does not by itself make a Pages site private. Pages availability for private repositories depends on the account plan.

No provider URLs, customer credentials, app UserData, compiled builds or personal catalogs have been uploaded. The current Windows app is not yet wired to a hosted feed; that integration follows selection of the endpoint and initial service entries.
