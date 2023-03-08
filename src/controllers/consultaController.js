import Consulta from '../models/Consulta';
class ConsultaController {
  async index(req, res) {
    const result = await Consulta.findAll();
    if (!result) return;
    res.json(result);
  }
  async store(req, res) {
    try {
      const result = await Consulta.create(req.body);
      return res.json(result);
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  }
}

export default new ConsultaController();
