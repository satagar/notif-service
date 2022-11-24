const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController')
const newNotifController = require('../controllers/notif.controller');

router.get('/test2', (req, res) => {
    res.status(200).send({
        message: 'Root handler triggered'
    });
});

router.post("/notifiServ/api/v1/notifications", newNotifController.postNotification);
router.get("/notifiServ/api/v1/notifications/:id", newNotifController.getNotification);

module.exports = router;