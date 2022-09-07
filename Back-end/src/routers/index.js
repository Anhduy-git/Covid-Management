const userManagerRouter = require('./User/user-manager');
const userRouter = require('./User/user');
const treatmentPlaceRouter = require('./TreatmentPlace/treatment-place');
const addressRouter = require('./Address/address');
const necessaryRouter = require('./Necessary/necessary');
const necessaryPackageRouter = require('./Necessary/necessary-package');
const homeRouter = require('./Home/home');


function route(app) {
    //routers
    app.use('/', homeRouter); 
    app.use('/managers', userManagerRouter); 
    app.use('/users', userRouter);
    app.use('/treatmentPlaces', treatmentPlaceRouter);
    app.use('/addresses', addressRouter);
    app.use('/necessaries', necessaryRouter);
    app.use('/necessaryPackages', necessaryPackageRouter);
}

module.exports = route;