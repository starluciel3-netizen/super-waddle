export function analyzePassword(password) {
  const issues = [];

  if (typeof password !== "string") {
    return { secure: false, score: 0, issues: ["La contraseña debe ser texto"] };
  }

  if (password.length < 8) issues.push("Muy corta (mínimo 8)");
  if (!/[A-Z]/.test(password)) issues.push("Falta mayúscula");
  if (!/[a-z]/.test(password)) issues.push("Falta minúscula");
  if (!/[0-9]/.test(password)) issues.push("Falta número");
  if (!/[^A-Za-z0-9]/.test(password)) issues.push("Falta símbolo");

  // score simple 0..100
  let score = 0;
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[a-z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 15;
  if (/[^A-Za-z0-9]/.test(password)) score += 15;

  if (score > 100) score = 100;

  return {
    secure: issues.length === 0,
    score,
    issues
  };
}