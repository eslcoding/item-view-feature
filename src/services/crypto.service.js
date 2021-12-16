const crypto = require("crypto");

const secret = "p3s6v9y$B&E)H@McQfThWmZq4t7w!z%C"; // stam string

const iv = crypto.randomBytes(16);

/**
 * Encrypts a string
 * @param {string} text
 * @returns {string} Encrypted string
 */
const encrypt = (text) => {
  try {
    const cipher = crypto.createCipheriv("aes-256-ctr", secret, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
    // this gives you a long hash string made of two parts: 'iv : hash_content'    you need both parts to decrypt it
  } catch (err) {
    console.error("Could not encrypt text", err);
  }
};
/**
 * Decrypts string by hash
 * @param {string} hash
 * @returns {string} decrypted string
 */
const decrypt = (hash) => {
  // First we split the iv and the hash content and use them to decrypt the key
  try {
    const [iv, content] = hash.split(":");
    const decipher = crypto.createDecipheriv(
      "aes-256-ctr",
      secret,
      Buffer.from(iv, "hex")
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(content, "hex")),
      decipher.final(),
    ]);

    return decrpyted.toString();
  } catch (err) {
    return null;
  }
};

module.exports = {
  encrypt,
  decrypt,
};
