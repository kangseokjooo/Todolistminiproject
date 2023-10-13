const { DataTypes } = require("sequelize");

const TodoModel = (sequelize) => {
  return sequelize.define("todo", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull:false,

    },
    done:{
        type:DataTypes.TINYINT
    }
  });
};

module.exports = TodoModel;
