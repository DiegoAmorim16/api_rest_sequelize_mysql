import Consulta from "../models/Consulta";
import Precos_Consultas from "../models/PrecoConsulta";

class PrecoConsultasController {
    async index(req, res) {
        const result = await Precos_Consultas.findAll({
            include: [
                {
                    model: Consulta,
                    attributes: ['nome'],
                }
            ]
        });
        if (!result) {
            return res.status(400).json({
              errors: ['Não encontrado!'],
            });
          }
        res.json(result);
    }
    async show( req, res ){
        try {
            const result = await Precos_Consultas.findAll({ where: { usuario_id: req.params.id } }, {
                include: [
                    {
                        model: Consulta,
                        attributes: ['id', 'nome'],
                    }
                ]
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
    async store(req, res){
        try {
            const result = await Precos_Consultas.create(req.body);
            if (!result) {
                return res.status(400).json({
                  errors: ['Não encontrado!'],
                });
              }
            return res.json(result)
        } catch (e) {
            console.log(e)
            return res.json(null)
        }
    }
  }
  
  export default new PrecoConsultasController();
  