import User from '../models/User';

class UserController {
  // Index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      
      return res.json(null);
    }
  }
}

export default new UserController();
