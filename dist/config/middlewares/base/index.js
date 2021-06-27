"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MethodOverride = require("../MethodOverride");
const BaseRoutes = require("../../routes/base");
class MiddlewaresBase {
    static get configuration() {
        var app = express();
        //  app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(cors());
        app.use(MethodOverride.configuration());
        app.use(new BaseRoutes().routes);
        return app;
    }
}
Object.seal(MiddlewaresBase);
module.exports = MiddlewaresBase;
//# sourceMappingURL=index.js.map