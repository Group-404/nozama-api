module.exports = function(sequelize, Datatypes){

  var Order = sequelize.define('Order', {

    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }

  }, {
    timestamps: true

  });

  return Order;
};
