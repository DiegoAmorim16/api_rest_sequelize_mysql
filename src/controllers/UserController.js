import User from '../models/User';

class UserController {
  // Index
  async index(req, res) {
    try {
      const users = await User.findByPk(req.userId);
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async create(req, res) {
    try {
      const novoUser = await User.create(req.body);
      if (!novoUser) {
        res.json({ error: 'Erro ao criar usuario' });
      }
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        res.json({ error: 'Usuario não encontrado!' });
      }
      const { id, nome, email, tipo, created_at, updated_at } = user;
      return res.json({ id, nome, email, tipo, created_at, updated_at });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const deleteUser = await User.findByPk(req.params.id);

      if (!deleteUser) {
        return res.status(400).json({
          errors: ['Usuario não existe'],
        });
      }
      await deleteUser.destroy();
      return res.json({ status: 'deleted' });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
