import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      senha: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password_virtual: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha precisa ter entre 6 e 50 caracteres',
          },
        },
      },
    }, {
      tableName: 'usuario',
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password_virtual) {
        user.senha = await bcryptjs.hash(user.password_virtual, 8);
      }
    });

    return this;
  }

  passwordIsValid(password_virtual) {
    return bcryptjs.compare(password_virtual, this.senha);
  }
}