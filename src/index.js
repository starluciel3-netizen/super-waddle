import { analyzePassword } from "./basics/password.js";

export function start() {
  console.log("🚀 Super-Waddle ha iniciado correctamente");

  const samples = [
    "1234",
    "Karen2025",
    "S3gur1dad!2025",
    "SuperWaddle#C1sco"
  ];

  for (const p of samples) {
    const r = analyzePassword(p);

    console.log("\nPassword:", p);
    console.log(`Secure: ${r.secure} | Score: ${r.score}`);

    if (r.issues.length > 0) {
      console.log("Issues:", r.issues.join(" | "));
    } else {
      console.log("✅ Sin problemas detectados");
    }
  }
}

start();