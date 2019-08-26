export const getMessages = async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.json(messages);
};

export const getMessageById = async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId
  );
  return res.json(message);
};

export const createMessage = async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id
  });

  return res.json(message);
};

export const deleteMessage = async (req, res) => {
  await req.context.models.Message.destroy({
    where: { id: req.params.messageId }
  });

  return res.json({ success: true });
};
