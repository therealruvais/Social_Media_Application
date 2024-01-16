const express = require("express");
const { addMessage, getMessage } = require("../controller/messageCtrl");
const authVerify = require("../middleware/auth");

const router = express.Router();

router.post('/', authVerify, addMessage)
router.get('/:chatId',authVerify, getMessage)

module.exports = router;