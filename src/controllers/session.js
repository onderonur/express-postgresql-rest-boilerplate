export const getSession = async (req, res) => {
  const user = await req.context.models.User.findByPk(req.context.me.id);
  return res.json(user);
};
