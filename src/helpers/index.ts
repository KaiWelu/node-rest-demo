import crypto from "crypto";
const SECRET = "NODE-REST-API";

// this is not safe because i don't understand everything, also the SECRET shouldnt be here
// but it's fine for demo purposes

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};
