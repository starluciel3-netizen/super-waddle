import readline from "node:readline";
import { analyzePassword } from "./basics/password.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function printResult(password, r) {
  console.log("\n==============================");
  console.log(`Password: ${password}`);
  console.log(`Secure: ${r.secure} | Score: ${r.score}`);

  if (r.issues.length > 0) {
    console.log("Issues:", r.issues.join(" | "));
  } else {
    console.log("✅ Sin problemas detectados");
  }
  console.log("==============================\n");
}

async function main() {
  console.log("🛡️ Super-Waddle CLI - Password Analyzer");
  console.log('Escribe una contraseña para analizar. Escribe "exit" para salir.\n');

  while (true) {
    const input = await ask("Password> ");

    const password = input.trim();

    if (!password) {
      console.log("⚠️ Escribe algo (o 'exit').\n");
      continue;
    }

    if (password.toLowerCase() === "exit") {
      break;
    }

    const r = analyzePassword(password);
    printResult(password, r);
  }

  rl.close();
  console.log("👋 Cerrado. ¡Bien ahí bro!");
}

main().catch((err) => {
  console.error("Error:", err);
  rl.close();
});