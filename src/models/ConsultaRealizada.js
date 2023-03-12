import Sequelize, { Model } from 'sequelize';

export default class ConsultaRealizada extends Model {
  static init(sequelize) {
    super.init(
      {
        id_consulta: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_usuario: {
          type: Sequelize.INTEGER,
          references: {
            model: 'usuario',
            key: 'id',
          },
        },
        id_tipo_consulta: {
          type: Sequelize.INTEGER,
          references: {
            model: 'consultas',
            key: 'id',
          },
          validate: {
            isInt: {
              msg: 'Campo ID consulta precisa ser um inteiro!',
            },
          },
        },
        valor_consulta: {
          type: Sequelize.DECIMAL,
          validate: {
            notEmpty: {
              msg: 'Valor da consulta não pode estar vazio!',
            },
          },
        },
        result: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        tableName: 'consulta_realizada',
      },
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Consulta, { foreignKey: 'id_tipo_consulta' });
    this.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
  }
}
