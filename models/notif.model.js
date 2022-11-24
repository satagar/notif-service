const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    requestor: {
        type: String,
        required: true
    },
    ticketId: {
        type: String,
        required: true
    },
    recipients: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    },
    status: {
        type: String,
        required: true,
        default: 'UN_SENT'
    }
})

module.exports = mongoose.model('Notification', notificationSchema);