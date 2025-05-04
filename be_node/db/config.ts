import Sequelize from 'sequelize';

// Option 3: Passing parameters separately (other dialects)
export const sequelize = new Sequelize.Sequelize(
  "qlvb",
  "qlvb",
  "123456789",
  {
    host: "localhost",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
    logging: false,
  }
);