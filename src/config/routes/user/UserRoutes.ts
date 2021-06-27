import express = require('express');

import UserController = require('../../../controllers/user/UserController');
import ValidateUser = require('../../middlewares/ValidateUser');

var router = express.Router();

class UserRoutes {
    private _UserController: UserController;

    constructor() {
        this._UserController = new UserController();
    }

    get routes() {
        var controller = this._UserController;

        router.post("/register", controller.create);
        router.post("/login", controller.login);
        router.get("/users", controller.retrieve);
        router.get("/auth/logout", ValidateUser.auth, controller.logout);
        router.post('/auth/change-password', controller.changePassword)



        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;