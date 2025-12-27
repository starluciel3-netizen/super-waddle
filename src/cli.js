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

  if (r.issues.length > 0) console.log("Issues:", r.issues.join(" | "));
  else console.log("✅ Sin problemas detectados");

  console.log("==============================\n");
}

function generatePassword(length = 14) {
  // Mezcla simple de caracteres (educativo)
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const nums = "0123456789";
  const sym = "!@#$%^&*()-_=+[]{};:,.?";

  const all = upper + lower + nums + sym;

  // Garantizamos al menos 1 de cada grupo
  const pick = (s) => s[Math.floor(Math.random() * s.length)];
  let pass = [pick(upper), pick(lower), pick(nums), pick(sym)];

  for (let i = pass.length; i < length; i++) pass.push(pick(all));

  // Mezclar
  pass = pass.sort(() => Math.random() - 0.5);

  return pass.join("");
}

function showMenu() {
  console.log("🛡️ Super-Waddle CLI - Password Toolkit");
  console.log("1) Analizar contraseña");
  console.log("2) Generar contraseña segura");
  console.log("3) Tips rápidos");
  console.log("4) Salir");
}

function showTips() {
  console.log("\n📌 Tips rápidos:");
  console.log("- Usa mínimo 12 caracteres.");
  console.log("- Combina MAYÚS + minús + números + símbolos.");
  console.log("- Evita nombres, fechas y palabras comunes.");
  console.log("- Usa un gestor de contraseñas y activa 2FA.\n");
}

async function optionAnalyze() {
  const password = (await ask("\nEscribe la contraseña a analizar (o 'back'): ")).trim();
  if (!password) return;
  if (password.toLowerCase() === "back") return;

  const r = analyzePassword(password);
  printResult(password, r);
}

async function optionGenerate() {
  const lenRaw = (await ask("\nLongitud deseada (12-32) o Enter=14: ")).trim();

  let len = 14;
  if (lenRaw) {
    const n = Number(lenRaw);
    if (Number.isFinite(n)) len = Math.min(32, Math.max(12, n));
  }

  const pw = generatePassword(len);
  console.log("\n✅ Contraseña generada:");
  console.log(pw);

  const r = analyzePassword(pw);
  console.log("(Análisis rápido)");
  console.log(`Secure: ${r.secure} | Score: ${r.score}\n`);
}

async function main() {
  console.clear?.();
  console.log("Bienvenido bro 😄\n");

  while (true) {
    showMenu();
    const choice = (await ask("\nElige una opción (1-4): ")).trim();

    if (choice === "1") {
      await optionAnalyze();
    } else if (choice === "2") {
      await optionGenerate();
    } else if (choice === "3") {
      showTips();
    } else if (choice === "4") {
      break;
    } else {
      console.log("\n⚠️ Opción inválida. Elige 1, 2, 3 o 4.\n");
    }
  }

  rl.close();
  console.log("\n👋 Cerrado. ¡Bien ahí bro!");
}

main().catch((err) => {
  console.error("Error:", err);
  rl.close();
});