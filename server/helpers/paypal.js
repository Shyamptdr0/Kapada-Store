const paypal = require("paypal-rest-sdk")

paypal.configure({
    mode : 'sandbox',
    client_id : "AcMNhyHlpb6HCP0XOXcYrcUoA7hFtXsc93gXRX1Uj70y0hTyF5DXqvL7548JViUIC_lpz4A1tgLbN59W" ,
    client_secret : "EDnNRt8SNMBTzZMBRIqLQYzeqmKVDcQpoZ_SyEVw8LswCdnB_8I7MOkEcP91Q7adow3ourqz6cN4XA5r" ,
})

module.exports = paypal;