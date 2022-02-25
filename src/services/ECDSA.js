import browserCrypto from "crypto-browserify";

const ALGO = "aes-256-gcm";

//ref original https://gist.github.com/rjz/15baffeab434b8125ca4d783f4116d81

class ECDSA {
  constructor(crypto) {
    this.crypto = crypto;
  }

  encrypt(str, key64) {
    const key = Buffer.from(key64, "base64");
    const iv_bytes = this.crypto.randomBytes(16);
    const iv = Buffer.from(iv_bytes, "utf8");

    const cipher = this.crypto.createCipheriv(ALGO, key, iv);

    let enc_b64 = cipher.update(str, "utf8", "base64");

    enc_b64 += cipher.final("base64");

    const enc_bytes = Buffer.from(enc_b64, "base64");
    const authTagBytes = cipher.getAuthTag();
    //concat iv, enc_bytes, authTag
    const resultBuffer = Buffer.concat([iv, enc_bytes, authTagBytes]);
    const resultB64 = resultBuffer.toString("base64");

    return resultB64;
  }

  decrypt(enc_b64, key64) {
    const key = Buffer.from(key64, "base64");
    let enc_buffer = Buffer.from(enc_b64, "base64");
    const iv = enc_buffer.slice(0, 16);
    const authTag = enc_buffer.slice(enc_buffer.length - 16, enc_buffer.length);

    enc_buffer = enc_buffer.slice(
      iv.length,
      enc_buffer.length - authTag.length
    );

    const enc = enc_buffer.toString("base64");

    const decipher = this.crypto.createDecipheriv(ALGO, key, iv);

    decipher.setAuthTag(authTag);

    let str = decipher.update(enc, "base64", "utf8");

    str += decipher.final("utf8");

    return str;
  }

  createSharedKey(prKey, pKey64) {
    const set1 = this.crypto.createECDH("secp256k1");
    set1.setPrivateKey(Buffer.from(prKey, "base64"));
    /* convert other party's public key to encryption public key : ref php code */
    const pBuffer = Buffer.from(pKey64, "base64");
    const pHex = "04" + pBuffer.toString("hex");

    const ret = set1.computeSecret(pHex, "hex", "base64");

    return ret;
  }

  generateKeyPair() {
    const set1 = this.crypto.createECDH("secp256k1");
    set1.generateKeys();

    let prKey = set1.getPrivateKey().toString("base64");

    let pKey = Buffer.from(
      set1.getPublicKey().toString("hex").substr(2),
      "hex"
    ).toString("base64");

    return [prKey, pKey];
  }
}

export default new ECDSA(browserCrypto);
