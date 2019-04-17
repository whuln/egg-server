// // var sqlite3 = require("sqlite3").verbose();
// var sqlite3 = require("sqlite3");
var Sequelize = require("sequelize");

var sequelize = new Sequelize("carmanage", null, null, {
  dialect: "sqlite",
  storage: __dirname + "./carmanage.db"
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

var { User, Role, Car, CarDispatchForm, Summary } = require("./model")(sequelize);

var promise_tablecreated = sequelize.sync({
  logging: console.log,
  force: false
});

exports.User = User;
exports.Role = Role;
exports.Car = Car;
exports.CarDispatchForm = CarDispatchForm;
exports.Summary = Summary;
exports.promise_tablecreated = promise_tablecreated;
exports.sequelize = sequelize;
