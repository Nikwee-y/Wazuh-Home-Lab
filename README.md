# Wazuh SOC Home Lab

A privacy-sanitized, static GitHub Pages website documenting a Wazuh-centered home Security Operations Center (SOC) lab.

## Publish this website

The homepage is `index.html` at the repository root. To avoid the GitHub Actions Pages errors from the previous setup, this version intentionally uses **Deploy from a branch**, not a Pages workflow.

1. Push the repository contents to branch `main`.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Choose branch `main` and folder `/(root)`, then save.
5. Wait for GitHub Pages to publish. The actual URL appears in Pages settings.

There is intentionally no `.github/workflows/pages.yml`. Do not select GitHub Actions as the Pages source for this version.

## Known lab baseline

- Host OS: Arch Linux.
- Wazuh components: Manager, Indexer, Dashboard.
- Deployment: Docker containers/images, recorded as Wazuh `4.14.8`.
- Private access: Tailscale/private VPN overlay was used; actual addresses are omitted.
- **Last known operational note:** earlier records indicated Docker and `docker.socket` had been disabled and Wazuh containers were stopped. The current state has not been rechecked. The animated website flow is an educational simulation, not live telemetry.
- Exact Compose files, firewall configuration, agent inventory, and current connectivity are not verified here.

## Site pages

- `index.html` — landing page with auto-playing, fictional data-flow simulation
- `docs/architecture.html` — component roles, logical architecture, trust boundaries
- `docs/data-flow.html` — event lifecycle from endpoint to analyst
- `docs/deployment.html` — baseline and safe recovery checks
- `docs/endpoint-onboarding.html` — Linux/Windows agent onboarding
- `docs/validation.html` — interactive readiness checklist
- `docs/troubleshooting.html` — common diagnostics
- `docs/roadmap.html` — future TheHive, Kibana, automation, AI, MISP, Sysmon, Zeek, Suricata
- `docs/privacy.html` — publication safety

## Future work

TheHive, Elastic/Kibana, response automation, AI-assisted triage, MISP, Sysmon, Zeek, and Suricata are **planned ideas**, not active integrations. Mark a feature active only after it is installed, connected, tested, and documented.

## Privacy

Real IPs, VPN addresses, usernames, hostnames, credentials, tokens, personal paths, raw logs, and private configs are intentionally excluded. Review all files and Git history before making the repository public.

## Official references

- [Wazuh documentation](https://documentation.wazuh.com/)
- [Wazuh Docker deployment](https://documentation.wazuh.com/current/deployment-options/docker/index.html)
- [Wazuh agent enrollment](https://documentation.wazuh.com/current/user-manual/agent/agent-enrollment/index.html)
- [GitHub Pages documentation](https://docs.github.com/en/pages)

Educational use for authorized defensive monitoring only. Not a production deployment guide.
