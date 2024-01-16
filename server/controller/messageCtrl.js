const Message = require('../model/messageModel')


const addMessage = async (req,res) => {
    const { chatId, senderId, text } = req.body
    const message = new Message({
      chatId,
      senderId,
      text,
    });
    await message.save()
    res.json(message)
}

const getMessage = async (req,res) => {
    const { chatId } = req.params;
  const result = await Message.find({ chatId })
  res.json(result)
}



module.exports = {addMessage,getMessage}