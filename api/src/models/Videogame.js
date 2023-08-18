const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id :{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plataformas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_lanzamiento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },{ timestamps:false });
};
