'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //定义首次进入网站的路由
  router.get('/', controller.home.index);

  // router.get('/login',controller.home.login);
  router.post('/login', controller.user.login);
  router.post('/getuserinfo', controller.user.getUserinfo);


  // //user actions
  router.post('/getusers', controller.user.findUsers);
  router.post('/getoneuser', controller.user.findOne);
  router.post('/adduser', controller.user.addUser);
  router.post('/updateuser', controller.user.updateUser);
  router.post('/deleteuser', controller.user.deleteUser);

  // //car actions
  router.post('/getcars', controller.car.findcars);
  router.post('/getonecar', controller.car.findOne);
  router.post('/addcar', controller.car.addCar);
  router.post('/updatecar', controller.car.updateCar);
  router.post('/deletecar', controller.car.deleteCar);

  //car use form actions
  router.post('/getucfs_user', controller.caruseform.userGetCaruseform);
  router.post('/adducfs_user', controller.caruseform.userAddCaruseform);
  router.post('/getucfs_dm', controller.caruseform.dmGetCaruseform);
  router.post('/upsert_ucf', controller.caruseform.upsertCaruseform);
  router.post('/getucfs_admin', controller.caruseform.adminGetCaruseform);
  router.post('/getucfs_driver', controller.caruseform.driverGetCaruseform);

  //summary actions
  router.post('/getsummary', controller.summary.getSummary);


  //vue内部路由，当找不到路由时，默认去首页.
  router.get('/*', controller.home.index);
};
