import Sequelize, { Model } from 'sequelize';

export default class Precos_Consultas extends Model {
  static init(sequelize) {
    super.init(
      {
        usuario_id: {
          type: Sequelize.INTEGER,
          validate: {
            isInt: {
              msg: 'ID usuario precisa ser um inteiro!',
            },
          },
        },
        consulta_id: {
          type: Sequelize.INTEGER,
          validate: {
            isInt: {
              msg: 'ID da consulta precisa ser um inteiro!',
            },
          },
          references: {
            model: 'consultas',
            key: 'id',
          },
        },
        preco: {
          type: Sequelize.DECIMAL,
          validate: {
            notEmpty: {
              msg: 'Preco não pode estar vazio!',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'precos_consultas',
      },
    );

    return this;
  }
  static associate(models) {
    this.belongsTo(models.Consulta, { foreignKey: 'consulta_id' });
  }
}
