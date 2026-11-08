import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password -- "your-new-password"');
  process.exit(1);
}

if (password.length < 10) {
  console.error("Use a password with at least 10 characters.");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
const escaped = hash.replaceAll("$", "\\$");
console.log("\nAdd this to website/.env.local:\n");
console.log(`ADMIN_PASSWORD_HASH=${escaped}`);
console.log("\nRemove ADMIN_PASSWORD if it is set.\n");
