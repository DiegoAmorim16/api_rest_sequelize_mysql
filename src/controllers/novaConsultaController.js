//import Consulta from '../models/Consulta';
const axios = require('axios');
import Precos_Consultas from '../models/PrecoConsulta';
import realizaConsulta from '../services/realizaConsulta';

class NovaConsultaController {
  async store(req, res) {
    try {
      const idConsulta = req.params.id;
      const { documento, tipoPessoa } = req.body;
      const preco = await Precos_Consultas.findOne({
        where: { consulta_id: idConsulta, usuario_id: req.userId },
      });
      if (!preco) {
        return res.status(400).json({
          errors: ['Consulta não liberada!'],
        });
      }
      let data = JSON.stringify({
        CodigoProduto: '54',
        Versao: '20180521',
        ChaveAcesso: process.env.TOKEN_ADMIN,
        Info: { Solicitante: '' },
        Parametros: {
          TipoPessoa: tipoPessoa,
          CPFCNPJ: documento,
          CMC7: '',
          ValorCheque: '',
          DataVencimento: '',
          DataNascimento: '',
          DDD: '',
          Telefone: '',
          Cep: '',
          UF: '',
          Cidade: '',
          Endereco: '',
          EnderecoNumero: '',
          ComplementoEndereco: '',
          Bairro: '',
          NomeCompleto: '',
          NomeMae: '',
          NomePai: '',
          Nacionalidade: '',
          SituacaoDOC_Receita: '',
          Foto: '',
          Idade: '',
          NumeroBeneficioInss: '',
          Email: '',
          Sexo: '',
          SomSemelhante: '',
          Obito: '',
          Placa: '',
          Chassi: '',
          Cambio: '',
          Renavam: '',
          NumeroMotor: '',
          NumeroCarroceria: '',
          NumeroEixoTraseiro: '',
          NumeroEixoAuxiliar: '',
          Kilometragem: '',
          CRLV: '',
          CNH: '',
          CNH_Categoria: '',
          CNH_Data_Primeira_Habilitacao: '',
          CNH_Data_Validade: '',
          CNH_Data_Ultima_Emissao: '',
          RG: '',
          RG_Orgao_Expedidor: '',
          RG_UF_Expedidor: '',
        },
        Features: { Solicitacoes: [] },
      });
      const config = {
        method: 'post',
        url: 'https://api.certocheck.com.br/json/service.aspx',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          return res.json(response.data);
        })
        .catch(function (error) {
          console.log(error);
          return res.json('error');
        });
    } catch (e) {
      console.log(e);
      return res.json(null);
    }
  }
}

export default new NovaConsultaController();
