var Sequelize = require("sequelize");

module.exports = function(s) {
  if (!(s instanceof Sequelize)) {
    console.error("s must be an instance of Sequelize");
    return "s must be an instance of Sequelize";
  }

  var modelDefine = options => s.define(options.name, options.fields);

  var User = modelDefine({
    name: "user",
    fields: {
      account: { type: Sequelize.STRING(30), primaryKey: true },
      name: Sequelize.STRING(30),
      token: Sequelize.STRING,
      rolename: Sequelize.STRING(30),
      department: Sequelize.STRING(50),
      state: { type: Sequelize.BOOLEAN, defaultValue: false },
      phone: Sequelize.STRING(11)
    }
  });

  const Role = modelDefine({
    name: "role",
    fields: {
      rolename: {
        type: Sequelize.STRING(30),
        primaryKey: true
      },
      accesses: Sequelize.STRING(50)
    }
  });

  const Car = modelDefine({
    name: "car",
    fields: {
      number: {
        type: Sequelize.STRING(30),
        primaryKey: true
      },
      brand: Sequelize.STRING,
      state: { type: Sequelize.BOOLEAN, defaultValue: false },
      sites: Sequelize.INTEGER,
      department: Sequelize.STRING(50) //院所有 公务用车， 部门所有生产用车
    }
  });

  var CarDispatchForm = modelDefine({
    name: "cardispatchform",
    fields: {
      department: Sequelize.STRING(50),
      project: Sequelize.STRING,
      purpose: Sequelize.STRING,
      places: Sequelize.STRING,
      plantime1: Sequelize.DATEONLY,
      plantime2: Sequelize.DATEONLY,
      actualtime1: Sequelize.DATEONLY,
      actualtime2: Sequelize.DATEONLY,
      kilometres1: Sequelize.FLOAT(11, 3),
      kilometres2: Sequelize.FLOAT(11, 3),
      computeddis: Sequelize.FLOAT(11, 3),
      useraccount: Sequelize.STRING(30),
      driveraccount: Sequelize.STRING(30),
      senderaccount: Sequelize.STRING(30),
      receiveraccount: Sequelize.STRING(30),
      isshengwai: { type: Sequelize.BOOLEAN, defaultValue: false },
      yuanlingdao: {
        type: Sequelize.STRING(30),
        defaultValue: ""
      },
      yldagree: { type: Sequelize.BOOLEAN, defaultValue: false },
      carnumber: Sequelize.STRING(30),
      isgo: { type: Sequelize.BOOLEAN, defaultValue: false },
      isback: { type: Sequelize.BOOLEAN, defaultValue: false },
      isreceived: { type: Sequelize.BOOLEAN, defaultValue: false },
      isdmagree: { type: Sequelize.BOOLEAN, defaultValue: false }
    }
  });

  const Summary = modelDefine({
    name: "summary",
    fields: {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }, 
      data: Sequelize.TEXT
    }
  });

  User.belongsTo(Role, {
    foreignKey: "rolename",
    targetKey: "rolename"
    // constraints: false
  });

  return {
    User,
    Role,
    Car,
    CarDispatchForm,
    Summary
  };
};
