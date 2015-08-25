module.exports = function(sequelize, Datatypes){

  var User = sequelize.define('User', {

    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    email: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: true,
      validates: {
        isEmail: true
      }
    },

    password: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: false
    }
  }, {
    timestamps: true

      // classMethods: {
      //   associate: function(models){
      //     User.hasOne(models.Profile);
      //   }
      // }
  });

  return User;
};
