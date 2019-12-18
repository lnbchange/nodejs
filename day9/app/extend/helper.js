const crypto = require('crypto');
module.exports = {
    hem(hemPwd) {
        const secret = 'lnb';
        const hash = crypto.createHmac('sha256', secret)
            .update(hemPwd)
            .digest('hex');
        return hash;
    }
}