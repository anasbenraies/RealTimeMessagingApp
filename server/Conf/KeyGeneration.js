const crypto = require('crypto');

function generateKeyPair() {
    // Generate RSA key pair
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048, // The size of the RSA key, typically 2048 bits or higher for security
    publicKeyEncoding: {
      type: 'pkcs1', // Format of the public key, 'pkcs1' or 'spki'
      format: 'pem'  // Output format of the public key, 'pem' or 'der'
    },
    privateKeyEncoding: {
      type: 'pkcs1', // Format of the private key, 'pkcs1' or 'sec1'
      format: 'pem', // Output format of the private key, 'pem' or 'der'
      cipher: 'aes-256-cbc', // Encryption algorithm for the private key, optional
      passphrase: 'top-secret' // Passphrase for encrypting the private key, optional
    }
  });

    return { publicKey, privateKey };
}

const { publicKey, privateKey } = generateKeyPair();

console.log('Public Key:',publicKey);
console.log('Private Key:',privateKey);

