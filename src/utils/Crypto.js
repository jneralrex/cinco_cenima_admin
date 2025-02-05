import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_CRYPTO_KEY; 

export const encryptId = (id) => {
  return CryptoJS.AES.encrypt(id, SECRET_KEY).toString();
};

export const decryptId = (encryptedId) => {
  const bytes = CryptoJS.AES.decrypt(encryptedId, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
