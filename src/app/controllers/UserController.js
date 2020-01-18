import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExisting = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExisting) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const { id, name, email } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
