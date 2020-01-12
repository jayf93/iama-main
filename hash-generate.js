const crypto = require('crypto');

let key = crypto.randomBytes(10).toString('hex');

console.log("KEY HAS BEEN GENERATED:", key)
