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

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const userExisting = await User.findByPk(req.userId);

    if (email !== userExisting.email) {
      const userEmailExists = await User.findOne({ where: { email } });
      if (userEmailExists) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
    }

    if (oldPassword && !(await userExisting.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, name } = await User.update(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
