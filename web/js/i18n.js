// UI strings. Every string shown in the web interface lives here; static markup is filled in
// through data-i18n attributes and dynamic text calls t().

const STRINGS = {
  "app.title": "WI//DIAG — RF Space",
  "boot.connecting": "connecting to engine…",
  "boot.renderer": "initializing WebGL renderer…",
  "boot.radios": "{n} radios",
  "status.offline": "engine offline — reconnecting",
  "status.demo": "DEMO",
  "status.live": "LIVE",
  "status.connected": "connected",
  "badge.stale": "outside last scan",
  "ins.bssidHidden": "BSSID hidden",
  "ins.ssidHiddenOs": "SSID hidden by the OS",
  "ins.hiddenNet": "hidden network (SSID not broadcast)",
  "ins.range": "likely range",
  "ins.model": "model",
  "row.signal": "Signal",
  "row.noise": "noise",
  "row.notReported": "not reported",
  "row.channel": "Channel",
  "row.spectrum": "Spectrum",
  "row.peak": "peak",
  "row.maxRate": "Max rate",
  "row.azimuth": "Azimuth",
  "row.estimated": "estimated",
  "row.confidence": "confidence",
  "row.hidden": "hidden",
  "row.local": "local",
  "row.vendor": "Vendor",
  "row.seen": "Seen",
  "row.ago": "{v} ago",
  "row.samples": "{n} samples",
  "rssi.excellent": "excellent",
  "rssi.good": "good",
  "rssi.fair": "fair",
  "rssi.weak": "weak",
  "rssi.critical": "critical",
  "net.bestChannels": "best channels:",
  "interf.cochannel": "{n} co-channel",
  "interf.partial": "{n} partial",
  "dock.bestChannel": "best channel",
  "dock.load": "load",
  "toast.envModel": "Propagation model: {v}",
  "toast.reportBusy": "Generating {k} report…",
  "toast.reportSaved": "Report saved: {v}",
  "toast.reportUnavailable": "Report unavailable: {v}",
  "toast.failed": "Failed: {v}",
  "scene.you": "YOU",
  "latency.avg": "avg",
  "latency.min": "min",
  "latency.jitter": "jit",
  "latency.loss": "loss",
  "cam.title": "Camera (1·2·3)",
  "cam.orbit": "Orbit",
  "cam.radar": "Radar",
  "cam.ground": "Ground",
  "env.title": "Propagation model",
  "env.open": "Open space",
  "env.residential": "Residential",
  "env.office": "Office",
  "env.dense": "Dense building",
  "layers.title": "Layers",
  "layers.field": "RF field",
  "layers.beams": "Signal beams",
  "layers.rain": "Digital rain",
  "layers.rotate": "Auto-rotate",
  "labels.title": "Labels",
  "labels.auto": "Auto",
  "labels.all": "All",
  "labels.off": "Off",
  "export.title": "Export",
  "export.png": "Scene capture (PNG)",
  "export.csv": "Networks (CSV)",
  "export.json": "Full snapshot (JSON)",
  "export.pdf": "PDF report",
  "export.word": "DOCX report",
  "export.excel": "XLSX spreadsheet",
  "cinema.title": "Cinema mode (H)",
  "common.close": "Close",
  "networks.title": "Networks",
  "networks.collapse": "Collapse (N)",
  "networks.search": "Search  /",
  "networks.sort": "Sort",
  "networks.tab": "NETWORKS",
  "bands.all": "All",
  "sort.signal": "Signal",
  "sort.distance": "Distance",
  "sort.channel": "Channel",
  "sort.name": "Name",
  "ins.close": "Close (Esc)",
  "ins.distance": "Estimated distance",
  "ins.interference": "Interference",
  "ins.focus": "Center camera",
  "dock.spectrum": "Spectrum",
  "dock.latency": "Latency",
  "dock.events": "Events",
  "dock.collapse": "Collapse (D)",
  "dock.tab": "SPECTRUM · LATENCY · EVENTS",
  "hint.cinema": "cinema",
  "hint.camera": "camera",
  "hint.networks": "networks",
  "hint.field": "RF field",
};

export const locale = "en-US";

/** Looks up a key; `{name}` placeholders are filled from `vars`. Falls back to the key itself. */
export function t(key, vars) {
  const text = STRINGS[key] ?? key;
  return vars ? text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? "") : text;
}

/** Applies the strings to the static markup marked with data-i18n attributes. */
export function applyStatic() {
  document.documentElement.lang = locale;
  document.title = t("app.title");
  for (const el of document.querySelectorAll("[data-i18n]")) el.textContent = t(el.dataset.i18n);
  for (const el of document.querySelectorAll("[data-i18n-title]")) el.title = t(el.dataset.i18nTitle);
  for (const el of document.querySelectorAll("[data-i18n-placeholder]")) el.placeholder = t(el.dataset.i18nPlaceholder);
}

applyStatic();
