const cron = require('node-cron');
const transporter = require('../notifier/newEmailService');
const NotificationModel = require('../models/notif.model');
const nodemailer = require('nodemailer');

cron.schedule('*/5 * * * * *', async () => {
    try {
        const notifications = await NotificationModel.find({
            status: 'UN_SENT'
        }).exec();
        let testAccount = await nodemailer.createTestAccount();
        notifications.forEach(async notification => {
            transporter(testAccount).sendMail({
                from: testAccount.user,
                to: notification.recipients,
                subject: notification.subject,
                text: notification.body
            }, async (err, data) => {
                if(err){
                    console.log('Issue in sending email');
                }
                else {
                    console.log(data);
                    const updateNotification = await NotificationModel.findOne({ _id: notification._id }).exec()
                    updateNotification.status = 'UN_SENT';
                    updateNotification.save();
                }
            });
            // console.log(info);

        });
    } catch (error) {
        console.log('Error in performing cron job');
    }
})