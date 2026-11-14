# How to contribute

Thanks for your interest in WI//DIAG! These rules keep the project organized and the history safe.

## Workflow

1. Fork the repo and create a branch from `main`: `feat/…`, `fix/…` or `docs/…`.
2. Keep the PR small and focused on one thing.
3. Open the PR against `main`, saying what changes and how to test it.
4. `main` only accepts code through PRs. Every PR needs the approval of a code owner (@felipe-dpmedeiros or @EnzoHessel) and a passing build. Nobody pushes directly, or force pushes, to `main`.

## Before opening the PR

```bash
npm install
npm run typecheck
npm run demo         # terminal, with the fictitious environment
npm run web:demo     # 3D browser, with the fictitious environment
```

GitHub Actions runs the typecheck and builds the desktop app for macOS, Windows and Linux on every PR.

## Network data

Do not publish real Wi-Fi data (SSIDs, BSSIDs, IPs or MACs) in issues, PRs, logs or screenshots. Use demo mode, which generates a fictitious environment.

## Security

Vulnerabilities go through a private report, never a public issue: see [SECURITY.md](SECURITY.md).

## License

By submitting a PR, you agree that your contribution is distributed under [Apache-2.0](LICENSE), like the rest of the project.
