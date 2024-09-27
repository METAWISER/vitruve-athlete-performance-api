import { DataTypes, Model } from "sequelize";
import sequelize from "../../shared/infrastructure/persistense/postgres/sequelize.connect";

export class AthleteInstance extends Model {
  public id!: string;
  public name!: string;
  public age!: number;
  public email!: string;
  public password!: string;
  public team!: string;
}

AthleteInstance.init(
  {
    uid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "athletes",
    timestamps: true,
  }
);
