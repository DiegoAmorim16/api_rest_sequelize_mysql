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
  async show(req,res){
    try {
      const user = await User.findByPk(req.params.id);
      if(!user){
        res.json({error: "Usuario não encontrado!"})
      }
      return res.json(user);
    } catch (e) {
      console.log(e)
      return res.json({error: "Usuario não encontrado!"});
    }
  }
}

export default new UserController();
