import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// ─────────────────────────────────────────────
// Website design & development by Whau OÜ
// Kristi Vahter — https://whau.ee · whau@whau.ee
// ─────────────────────────────────────────────
console.log(
  "%c Website by Whau OÜ ",
  "background:#BEFF4B;color:#050505;font-size:14px;padding:6px 10px;font-weight:700;border-radius:4px"
);
console.log(
  "%cDesign & development → https://whau.ee",
  "color:#BEFF4B;font-size:12px"
);

createRoot(document.getElementById("root")!).render(<App />);
