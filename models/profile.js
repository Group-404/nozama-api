
module.exports = function(sequelize, Datatypes){
  // Instead of mongoose.schema, we use sequelize.define.
  var Profile = sequelize.define('Profile', {
    // This is where we're defining the columns. Id is an integer, auto-increments, is the primary key, and must exist.
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    lastName: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: false

    },
    firstName: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: false
    },

    addressOne: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: false
    },
    addressTwo: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: false

    },
    city: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: false
    },
    state: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: false
    },

    country: {
      type: Datatypes.STRING,
      allowNull: false,
      unique: false,
      defaultValue: 'USA'
    },
    zipCode: {
      type: Datatypes.STRING(5),
      allowNull: false,
      unique: false
    },

    phoneNumber: {
      type: Datatypes.STRING(10)
    }

    //Shipping only in USA

  }, {
      timestamps: true

  });

  return Profile;
};
// classMethods: {
      //   associate: function(models){
      //     User.hasOne(models.Profile);
      //   }
      // }
