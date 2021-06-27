"use strict";
const express = require("express");
const UserRoutes = require("../user/UserRoutes");
const PostRoutes = require("../post/PostRoutes");
var app = express();
class BaseRoutes {
    get routes() {
        app.use("/api/v1/user", new UserRoutes().routes);
        app.use("/api/v1/post", new PostRoutes().routes);
        return app;
    }
}
module.exports = BaseRoutes;
//# sourceMappingURL=index.js.map