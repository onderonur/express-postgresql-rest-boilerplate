export const getUsers = async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.json(user);
};
