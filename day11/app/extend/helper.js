const crypto = require('crypto');
module.exports={
    hex(pwd){      
        const secret = 'abcdefg';
        const hash = crypto.createHmac('sha256', secret)
                        .update(pwd)
                        .digest('hex');
                        return hash;
    }
}