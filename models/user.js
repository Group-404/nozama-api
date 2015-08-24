module.exports = function(sequelize, Datatypes){
  // Instead of mongoose.schema, we use sequelize.define.
  var User = sequelize.define('User', {
    // This is where we're defining the columns. Id is an integer, auto-increments, is the primary key, and must exist.
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
