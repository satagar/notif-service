const nodemailer = require('nodemailer');

module.exports = (testAccount) => {
    const transporter = nodemailer.createTransport({
        port: 587,
        host: "smtp.ethereal.email",
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
        secure: false
    })

    return transporter;

}
