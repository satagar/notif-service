const cron = require('node-cron');
const TicketNotificationModel = require('../models/ticketNotification.model')
const EmailTransporter = require('../notifier/emailService')
const nodemailer = require('nodemailer');

cron.schedule('*/30 * * * * *', async () => {
    const notifications = await TicketNotificationModel.find({
        sentStatus: "UN_SENT"

    });

    console.log(notifications.length);
    let testAccount = await nodemailer.createTestAccount();
    notifications.forEach(notification => {

        const mailData = {
            from: testAccount.user,//'crm-notification-service@gmail.com',
            to: notification.recepientEmails,
            subject: notification.subject,
            text: notification.content
        };
        console.log(mailData);
        EmailTransporter(testAccount).sendMail(mailData, async function (err, info) {
            if (err)
                console.log(err.message);
            else
                console.log(info);
            //Update the DB
            const savedNotification = await TicketNotificationModel.findOne({ _id: notification._id });
            savedNotification.sentStatus = "SENT";
            await savedNotification.save();

        });
    });
})