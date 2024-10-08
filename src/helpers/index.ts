import crypto from "crypto";
import "dotenv/config";
const SECRET = process.env.SECRET;
console.log(SECRET);

// this is the hashing process

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
