const nodemailer = require('nodemailer');

function helper(testAccount){
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
        secure: false
    });
    return transporter;
}


module.exports = helper;