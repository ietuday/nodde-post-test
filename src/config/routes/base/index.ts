import express = require('express');

import UserRoutes = require('../user/UserRoutes');
import PostRoutes = require('../post/PostRoutes');

var app = express();

class BaseRoutes {

    get routes() {
        app.use("/api/v1/user", new UserRoutes().routes);
        app.use("/api/v1/post", new PostRoutes().routes);
        return app;
    }
}
export = BaseRoutes;