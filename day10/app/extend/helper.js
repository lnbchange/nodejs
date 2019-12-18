const crypto = require('crypto');
let moment=require('moment');
module.exports = {
    hex(pwd) {
        const secret = 'relic';
        const hash = crypto.createHmac('sha256', secret)
            .update(pwd)
            .digest('hex');
        return hash
    },
    timer(){
        return moment().format('YYYY-MM-DD');
    }
}

