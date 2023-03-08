import ConsultaRealizada from '../models/ConsultaRealizada';
import Consulta from '../models/Consulta';
import Usuario from '../models/User';
class ConsultaRealizadaController {
  async index(req, res) {
    try {
      const result = await ConsultaRealizada.findAll({
        include: [
          {
            model: Consulta,
            attributes: ['id', 'nome'],
          },
          {
            model: Usuario,
            attributes: ['id', 'nome', 'email'],
          },
        ],
      });
      if (!result) {
        return res.status(400).json({
          errors: ['Não encontrado!'],
        });
      }
      res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async show(req, res) {
    try {
      const consulta = await ConsultaRealizada.findByPk(req.params.id, {
        include: [
          {
            model: Consulta,
            attributes: ['id', 'nome'],
          },
          {
            model: Usuario,
            attributes: ['id', 'nome', 'email'],
          },
        ],
      });
      if (!consulta) {
        return res.status(400).json({
          errors: ['Não encontrado!'],
        });
      }
      res.json(consulta);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async store(req, res) {
    try {
      const result = await ConsultaRealizada.create(req.body);
      if (!result) {
        return res.status(400).json({
          errors: ['Erro ao criar!'],
        });
      }
      return res.json(result);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async delete(req, res) {
    try {
      const deletarConsulta = await ConsultaRealizada.findByPk(
        req.body.id_consulta,
      );

      if (!deletarConsulta) {
        return res.status(400).json({
          errors: ['Consulta não existe'],
        });
      }
      await deletarConsulta.destroy();
      return res.json({ status: 'deleted' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ConsultaRealizadaController();
