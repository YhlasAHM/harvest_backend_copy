const cryptoJS = require('crypto-js');

// Encrypt
async function encryptText(plainText, secretKey) {
  try {
    return cryptoJS.AES.encrypt(plainText, secretKey).toString();
  }
  catch (error) {
    return `encryption: ${error.message}`;
  };
};

// Decrypt
async function decryptText(encryptedText, secretKey) {
  try {
    const bytes = cryptoJS.AES.decrypt(encryptedText, secretKey);
    const decryptedText = bytes.toString(cryptoJS.enc.Utf8);

    if (!decryptedText) {
      return 'Failed to decrypt text. Check the secret key!';
    };

    return decryptedText;

  } catch (error) {
    return `decryption: ${error.message}`;
  };
};

module.exports = {
  encryptText,
  decryptText,
};