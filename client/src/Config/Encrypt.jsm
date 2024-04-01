import CryptoJS from 'crypto-js';
import NodeRSA from 'node-rsa' // Assuming you're using Node.js on the client-side or bundling with a tool like Webpack

// Function to encrypt message content with AES
function encryptMessage(message, secretKey) {
  return CryptoJS.AES.encrypt(message, secretKey).toString();
}

// Function to encrypt AES secret key with RSA public key
function encryptSecretKey(secretKey, recipientPublicKey) {
  const key = new NodeRSA(recipientPublicKey,'pkcs8-public-pem');
  return key.encrypt(secretKey, 'base64');
}

// Function to send encrypted message and encrypted secret key to server
export default function Enc_Message_PublicKey(message, recipientPublicKey){
  // Generate AES secret key
  const secretKey = CryptoJS.lib.WordArray.random(16).toString();

  // Encrypt message content with AES
  const EncContent = encryptMessage(message, secretKey);

  // Encrypt AES secret key with RSA public key
  const EncSecretKey = encryptSecretKey(secretKey, recipientPublicKey);

  // Send encrypted message and encrypted secret key to server
  // Your code to send the encrypted message and secret key to server
  return { EncContent, EncSecretKey };

}

// const secretKey = CryptoJS.lib.WordArray.random(16).toString();
// console.log("secretKey :",secretKey);

// const TestEncryptMessage = ()=>{
//     const message = 'Hello, Bob!';
//     console.log(CryptoJS.AES.encrypt(message, secretKey).toString());
// }
// function TestDecryptMessage(encryptedMessage, secretKey) {
//   const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
//   console.log(bytes.toString(CryptoJS.enc.Utf8));
// }

// function decryptSecretKey(encryptedSecretKey, privateKey) {
//   const key = new NodeRSA(privateKey);
//   return key.decrypt(encryptedSecretKey, 'utf8');
// }







//Testing encryption and decryption


// TestEncryptMessage();       encrypted message                            secret key
// TestDecryptMessage("U2FsdGVkX1+c2As0AybRZUg4lyOTEr+SA71xSV4PQRw=","3d8414b166795b1e018b9792d96c083d")
//
// Function to encrypt secret key with RSA public key

const publicKey="-----BEGIN PUBLIC KEY-----MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgE4eJmL8O7Jls0M5+zymXwh598F3ma+aCpviXhWXpvdYM/laACk9i1gpy3LF9HIU3E8wJ/hM22fGJ7q0yTG8sUCieW2W8H5OR6j9LDi5SYlQ+WtIoSC5yh2OMD9+I9nNO6EYeBCs/iveqF//gHQi2I+KoAbcio3+5Xqcn5ccvewRAgMBAAE=-----END PUBLIC KEY-----"
//console.log(encryptSecretKey("3d8414b166795b1e018b9792d96c083d",publicKey)) // encrypted secret key : TdMTLbJ+jBAJvQveBR6M2hiZZgNd3Fz74k6DF2bAXkzrLJGv/kWpCYffmKnGaXKkwkui2BN6BtRia6RtllmI42Nbo+LgYiElCdSS6gMJAn6ySv06hxb2upQi7JzeZ28WnTBYaw1ulqDT1f9Bq2qArUPl+9jQE7zzvxVy93QoGS8=
const privateKey="-----BEGIN RSA PRIVATE KEY-----MIICWgIBAAKBgE4eJmL8O7Jls0M5+zymXwh598F3ma+aCpviXhWXpvdYM/laACk9i1gpy3LF9HIU3E8wJ/hM22fGJ7q0yTG8sUCieW2W8H5OR6j9LDi5SYlQ+WtIoSC5yh2OMD9+I9nNO6EYeBCs/iveqF//gHQi2I+KoAbcio3+5Xqcn5ccvewRAgMBAAECgYALZSqEVfb/VwaHT/XuKvbB7cjOV/v7OaVCiArha3XXru4l+ZL8cRXajn43B9lYquJYStYJymxW/vjcq3KN5tCUS9f/bJNLur6dsvGlz5diz4w5pjzRmke9szwHPqpsDn2Urao9vYkPY3JDjUVTes+HLdPQFLY9UDCa5+4vV2mSYQJBAJHqxYg0xo5n5F0z/KuFzMt++7Cu1wy+9gQ5K5us2aH92jRVTPpR2iGBS2hSCkFcKjFyV920Er0OG2m0WsnOT6cCQQCJDS0vAjCgGxjGHo+Rlq9El/ePofUUsWTxLP8IVpRjifTc4YxvAoU/JMAyr5JdqAtxu/xRJUMsC8Y6LGE8NB2HAkAZoHfswggVPp3W2KiJn0gmfTjLAQn3zRn8B+Zmwua+Eo1eH5UTaYi71a9etPnkHMG0SXaxE00vMukRmYFQbBGFAkAKHo3yhZ/fgoCuyDzjjBO+5dWiplu5Pmvsntzp2bK1Ms+Aq6q5257JDcafN3WAMtM9f5rexviRvQDS9MntLw/rAkB8rmK9TZY9T97Ga9VVj6KSIgS+tDDVD9SqorKMXBI0xC3uGyldZROsroJYMGYsfeCZVmVmesJvTPNUxAw7iHHx-----END RSA PRIVATE KEY-----"

//console.log(decryptSecretKey("TdMTLbJ+jBAJvQveBR6M2hiZZgNd3Fz74k6DF2bAXkzrLJGv/kWpCYffmKnGaXKkwkui2BN6BtRia6RtllmI42Nbo+LgYiElCdSS6gMJAn6ySv06hxb2upQi7JzeZ28WnTBYaw1ulqDT1f9Bq2qArUPl+9jQE7zzvxVy93QoGS8=",privateKey)) // decrypted secret key
//module.exports.Enc_Message_PublicKey=Enc_Message_PublicKey