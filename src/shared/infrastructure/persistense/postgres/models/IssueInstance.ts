import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize.connect";

export class IssueInstance extends Model {
  public id!: string;
  public message!: string;
  public route!: string;
  public statusCode!: number;
  public timestamp!: Date;
}

IssueInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    route: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "issues",
    timestamps: false,
  }
);
