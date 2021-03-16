// 解密方法
const CryptoJS = require('crypto-js')
function DecryptByDESModeCBC() {
    this.decryptByDESModeCBC = function (data) {
        const keyHex = CryptoJS.enc.Utf8.parse(
            'test-vue'
        );
        const decrypted = CryptoJS.DES.decrypt(
            {
                ciphertext: CryptoJS.enc.Hex.parse(data),
            },
            keyHex,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }
        );
        const result_value = decrypted.toString(CryptoJS.enc.Utf8);
        return result_value;
    }

}
exports.DecryptByDESModeCBC = DecryptByDESModeCBC