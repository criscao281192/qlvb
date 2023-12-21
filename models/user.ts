import Sequelize from "sequelize";
import { sequelize as dbConfig } from "../db/config";

const UserLogin = dbConfig.define("user_login", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    fullname: {
        type: Sequelize.STRING,
    },
    don_vi: {
        type: Sequelize.STRING,
    },
    phan_quyen: {
        type: Sequelize.STRING,
    }
});
UserLogin.sync();
export { UserLogin };
