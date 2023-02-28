import Sequelize, { Model } from 'sequelize';


export default class Consulta extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        unique: {
          msg: 'Já existe uma consulta com este nome!',
        },
        
      },
    }, {
      sequelize,
      tableName: 'consultas',
    });

    return this;
  }


}
