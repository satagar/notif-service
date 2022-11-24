const NotificationModel = require('../models/notif.model');

exports.postNotification = async (req, res) => {
    const notificationObject = {
        subject: req.body.subject,
        body: req.body.content,
        recipients: req.body.recepientEmails,
        requestor: req.body.requester,
        ticketId: req.body.ticketId
    }

    try {
        const notificationResult = await NotificationModel.create(notificationObject);
        
        res.status(201).send({
            requestId: notificationResult.ticketId,
            status: "Request accepted"
        })
    } catch (error) {
        res.status(500).send({
            message: 'Error in postNotification'
        })
    }
}

exports.getNotification = async (req, res) => {
    try {
        const notificationResult = await NotificationModel.findOne({
            requestId: req.params.id
        }).exec();

        res.status(200).send({
            status: notificationResult.status
        })
    } catch (error) {
        res.status(500).send({
            message: 'Error in getNotification'
        })
    }
}