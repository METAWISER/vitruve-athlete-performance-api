import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(`${process.env.POSTGRES_URI}`);

export default sequelize;