import ConsultaRealizada from '../models/ConsultaRealizada';
import Consulta from '../models/Consulta';
import Usuario from '../models/User';
import CryptoJS from 'crypto-js';
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
      let {
        id_consulta,
        id_usuario,
        id_tipo_consulta,
        valor_consulta,
        result,
      } = consulta;

      const decryptedBytes = CryptoJS.AES.decrypt(
        result,
        process.env.TOKEN_ADMIN,
      );
      const decryptedData = JSON.parse(
        decryptedBytes.toString(CryptoJS.enc.Utf8),
      );
      res.json({
        id_consulta,
        id_usuario,
        id_tipo_consulta,
        valor_consulta,
        result: decryptedData,
      });
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
  async count(req, res) {
    try {
      const { count } = await ConsultaRealizada.findAndCountAll({
        where: {
          id_tipo_consulta: req.params.id,
        },
      });
      return res.json(count);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new ConsultaRealizadaController();
