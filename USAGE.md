# Usage guide

A practical walkthrough of WI//DIAG: install it, run it, read what it shows and act on it. The [README](README.md) has the overview and the internals.

## 1. Requirements

| What | Why |
| --- | --- |
| [Node.js](https://nodejs.org) with npm | Installs the project. Bun, the runtime the engine uses, is installed locally by `npm install`. |
| A Wi-Fi adapter | Not needed for demo mode. |
| macOS: Xcode Command Line Tools (`xcode-select --install`) | Compiles the scanner helper on first run. |
| Linux: NetworkManager (`nmcli`) and `iw` | The scan source. |
| Windows: nothing extra | Uses the built-in `netsh wlan`. |
| Python 3 (optional) | Only for PDF, DOCX and XLSX reports. |

## 2. Install

```bash
git clone https://github.com/ahmedsyed-s/Wi-diagnostics.git
cd Wi-diagnostics
npm install
```

On macOS, run this once and accept the Location request. Without it, macOS hides network names and addresses:

```bash
npm run authorize
```

## 3. Try it without hardware

Demo mode generates a synthetic neighborhood, so you can learn the interface on any machine:

```bash
npm run demo         # terminal dashboard
npm run web:demo     # 3D view in the browser
```

## 4. Run it for real

| Command | What you get |
| --- | --- |
| `npm run cli` | Full-screen terminal dashboard: radar, link, network table, spectrum, events |
| `npm run web` | 3D view at http://127.0.0.1:3333, opened in your browser |
| `npm run scan` | One scan printed as a table, then exit |
| `npm run scan -- --json` | One scan as JSON, for scripts |
| `npm run electron` | The 3D view in a desktop window |
| `npm run build` | Builds a desktop installer for your system into `dist/` |

Options go after `--` when you use npm:

```bash
npm run cli -- --env office --interval 5
npm run web -- --port 4000 --no-open
```

| Option | Meaning |
| --- | --- |
| `--demo` | Synthetic environment, no hardware |
| `--web` | With the dashboard, also start the 3D view |
| `--port <n>` | HTTP port for the 3D view (default 3333) |
| `--no-open` | Don't open the browser |
| `--env <model>` | `open`, `residential`, `office` or `dense` (default `residential`) |
| `--interval <s>` | Seconds between scans (default 2) |
| `--iface <name>` | Wi-Fi interface to use (Linux/Windows) |
| `--syslog [port]` | Listen for your router's syslog over UDP (default 1514) |

Run `npm link` once if you want the short `wi` command on your PATH (`wi`, `wi web`, `wi scan`).

## 5. Reading the terminal dashboard

- **Radar:** each dot is a network, placed at its estimated distance from you. Color is the band. The distance is reliable to within the range shown; the direction is an estimate.
- **Link:** the network you are connected to, with signal, noise, speed, latency to the router and to the internet, a quality score out of 100 and a one-line verdict.
- **Networks:** every radio in range with band, channel, width, signal, distance, security grade and vendor.
- **Spectrum:** who occupies which channels, and the best channel for the selected band.
- **Events:** new and lost networks, roaming, channel changes, signal drops, latency spikes.

Keys:

| Key | Action |
| --- | --- |
| `↑` `↓` or `j` `k` | Select a network |
| `PgUp` `PgDn`, `g` `G` | Jump 10, go to start or end |
| `Enter` or space | Open or close details |
| `f` | Filter by band |
| `s` | Change sort order |
| `b` | Switch the spectrum band |
| `e` | Change the environment model |
| `w` | Open the 3D view |
| `m` | Toggle the digital rain |
| `p` | Pause |
| `q` | Quit |

## 6. Using the 3D view

Click a node, a row in the list or a curve in the spectrum to open the inspector for that network.

| Key | Action |
| --- | --- |
| `1` `2` `3` | Camera: orbit, radar (top-down), ground |
| `H` | Cinema mode (hide all panels) |
| `F` | RF field (predicted coverage on the floor) |
| `R`, `B`, `L` | Rain, beams, labels |
| `N`, `D` | Collapse the network list, the bottom panel |
| `/` | Search |
| `↑` `↓` | Move between networks |
| `Enter` | Center the selected network |
| `Esc` | Clear the selection |
| space | Auto-rotate |

The top bar has the camera switch, the environment model, the layers menu and the export menu.

## 7. Common tasks

**Pick the best channel for your router.** Open the spectrum panel, choose your band and read "best channel". The link verdict also tells you when your current channel is congested and which one to move to. Change the channel in your router's admin page, then watch the interference score drop.

**Find out why your Wi-Fi is slow.** Read the link verdict. It distinguishes a weak signal, a congested channel, packet loss, high jitter and an internet outage where the local network is fine.

**Check coverage around the house.** Run the dashboard on a laptop, walk to each room and watch the signal on the link panel. Around −67 dBm or better is good; below −75 dBm is weak.

**Spot insecure networks.** The security grade runs from A to F. Open networks and WEP score lowest.

**Get distances closer to reality.** Pick the environment model that matches your surroundings with `e` or `--env`. More walls means a higher loss exponent and shorter estimated distances.

**Track router outages.** Point your router's remote syslog at this computer's IP on UDP port 1514 and start with `--syslog`. WAN drops and recoveries then appear in the events.

## 8. Exporting

The export menu in the 3D view saves a PNG of the scene, a CSV of the networks or a full JSON snapshot. For PDF, DOCX and XLSX reports, install the Python dependencies first:

```bash
pip install -r python/requirements.txt
```

Reports are written to the `reports/` folder.

## 9. Troubleshooting

| Symptom | Fix |
| --- | --- |
| Networks show as hidden on macOS | Run `npm run authorize`, or enable WiScan under System Settings → Privacy & Security → Location Services. |
| "Limited mode" notice on macOS | Install the Command Line Tools: `xcode-select --install`. |
| "nmcli not found" on Linux | Install and start NetworkManager. |
| The app says DEMO when you expected live data | No scan source was found on this system; check the notice at the top for the reason. |
| "Terminal too small" | Enlarge the terminal to at least 96×28. |
| Port 3333 already in use | Start with `--port <n>`. |
| No vendor names | Run `npm run oui:update` to download the IEEE vendor database. |
| "Python not found" when exporting a report | Install Python 3 and the report dependencies, or use the CSV/JSON export. |
| Desktop installer blocked | macOS: System Settings → Privacy & Security → "Open Anyway". Windows: "More info" → "Run anyway". |

## 10. Privacy

Everything runs on your machine and the 3D server only listens on `127.0.0.1`. The only traffic it sends is the ping to your gateway and to `1.1.1.1`, the font download from Google Fonts, and the vendor database when you ask for it.
