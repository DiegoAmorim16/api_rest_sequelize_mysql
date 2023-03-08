//import Consulta from '../models/Consulta';
const axios = require('axios');
import Consulta from '../models/Consulta';
import Precos_Consultas from '../models/PrecoConsulta';
//import realizaConsulta from '../services/realizaConsulta';

class NovaConsultaController {
  async store(req, res) {
    try {
      const idConsulta = req.params.id;
      const { documento, tipoPessoa } = req.body;
      const precoRow = await Precos_Consultas.findOne({
        where: { consulta_id: idConsulta, usuario_id: req.userId },
      });
      const consultaInfo = await Consulta.findOne({
        where: { id: idConsulta },
      });

      const nomeConsulta = consultaInfo.nome;
      if (!precoRow) {
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
          const data = response.data;
          if (data.HEADER.INFORMACOES_RETORNO.STATUS_RETORNO.CODIGO == '1') {
            return res.json('Consulta realizada');
          } else {
            return res.status(400).json({
              descricao:
                data.HEADER.INFORMACOES_RETORNO.STATUS_RETORNO.DESCRICAO,
              dataHoraConsulta:
                data.HEADER.INFORMACOES_RETORNO.DATA_HORA_CONSULTA,

              preco: precoRow.preco,
              consulta_id: precoRow.consulta_id,
              consulta: nomeConsulta,
            });
          }
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
