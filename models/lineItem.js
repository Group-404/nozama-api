module.exports = function(sequelize, Datatypes){

  var LineItem = sequelize.define('LineItem', {

    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    quantity: {
      type: Datatypes.INTEGER,
      allowNull: false
    }

  }, {
    timestamps: true

  });

  return LineItem;
};
