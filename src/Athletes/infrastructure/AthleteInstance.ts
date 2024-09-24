import { DataTypes, Model } from "sequelize";
import  sequelize from "../../shared/infrastructure/persistense/postgres/sequelize.connect";
// Definición del modelo para Athlete
export class AthleteInstance extends Model {
  public id!: string;
  public name!: string;
  public age!: number;
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
