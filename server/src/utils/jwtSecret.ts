import dotenv from "dotenv"

dotenv.config();

export const JWT_SECRET = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET env variable");
  }
  return secret;
})();