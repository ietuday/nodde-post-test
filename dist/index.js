"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require('dotenv').config();
const Middlewares = require("./config/middlewares/base/");
const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;
app.set("port", port);
app.use(Middlewares.configuration);
app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
});
//# sourceMappingURL=index.js.map