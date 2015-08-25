module.exports = function(sequelize, Datatypes){

  var Product = sequelize.define('Product', {

    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    category: {
      type: Datatypes.STRING,
      allowNull: false,
    },

    name: {
      type: Datatypes.STRING,
      allowNull: false
    },

    description: {
      type: Datatypes.STRING,
      allowNull: true
    },

    price: {
      type: Datatypes.INTEGER,
      allowNull: false
    },

    msrp: {
      type: Datatypes.INTEGER,
      allowNull: true
    },

    thumbnailURL: {
      type: Datatypes.STRING,
      allowNull: true
    },

    imageURL: {
      type: Datatypes.STRING,
      allowNull: true
    }

  }, {
    timestamps: true

  });

  return Product;
};
