import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/User';
import Precos_Consultas from '../models/PrecoConsulta';
import Consulta from '../models/Consulta';
import ConsultaRealizada from '../models/ConsultaRealizada';

const models = [User, Precos_Consultas, Consulta, ConsultaRealizada];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
