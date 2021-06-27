"use strict";
const express = require("express");
const PostController = require("../../../controllers/post/PostController");
const ValidateUser = require("../../middlewares/ValidateUser");
var router = express.Router();
class PostRoutes {
    constructor() {
        this._PostController = new PostController();
    }
    get routes() {
        var controller = this._PostController;
        router.post("/create", ValidateUser.auth, controller.create);
        router.get("/posts", ValidateUser.auth, controller.retrieve);
        router.get("/:id", controller.findById);
        router.delete("/:id", ValidateUser.auth, controller.delete);
        return router;
    }
}
Object.seal(PostRoutes);
module.exports = PostRoutes;
//# sourceMappingURL=PostRoutes.js.map