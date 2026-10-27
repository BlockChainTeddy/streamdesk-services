# StreamDesk service directory

This public repository manages the service names and server addresses offered in StreamDesk. Only repository collaborators can publish changes; the customer feed is read-only.

## Feed

https://blockchainteddy.github.io/streamdesk-services/providers.json

GitHub Pages is configured to use GitHub Actions. The publish workflow validates providers.json and deploys only that file and a small index page. A workflow run must succeed before changes are live.

## Current services

- #1 SportsCenter
- POSB

Customers select a service and enter their own username and password. Credentials are sent directly to the selected provider and stored encrypted on their Windows account, never in this repository. Both current services use HTTP, so provider login traffic is not encrypted in transit. The public feed itself uses HTTPS.

## Manage services

Edit providers.json in GitHub and commit the change. Keep id stable when changing a display name or server. Each entry uses id, name, serverUrl, protocol (xtream), enabled, and an optional HTTPS logoUrl. Base URLs must not include usernames, passwords, query strings or fragments. Unknown fields are rejected.

Validate locally with: node validate.mjs providers.json

After deployment, the app checks the feed when the login dialog opens. It uses its last valid cache, or bundled services if the feed is unavailable. An empty valid feed hides all listings. Disabling a listing is not account revocation and does not remove already saved providers. Customers do not need GitHub accounts. Never put GitHub tokens in customer builds.

The GitHub editor is the management interface for now; a separate custom web admin panel is not deployed. No customer credentials, app UserData, personal catalogs or compiled customer builds are included in this repository.
