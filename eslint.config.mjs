import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

// Sahi format mein rules ko update karen
eslintConfig[0].rules = {
  "@typescript-eslint/no-unused-vars": "off", // Unused vars rule ko off karna
  "@typescript-eslint/no-explicit-any": "off" // `any` type rule ko off karna
};

export default eslintConfig;
