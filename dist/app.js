"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const infoController = require("./controllers/infoController");
const bodyParser = require("body-parser");
const app = express();
app.set("port", 3000);
app.use(bodyParser.json());
app.get("/infos", infoController.allInfo);
app.get("/info/:id", infoController.getInfo);
app.get("/info/time-range/:id", infoController.findRange);
app.get("/info/pm1/:id", infoController.getInfoPm1);
app.get("/info/pm2.5/:id", infoController.getInfoPm25);
app.get("/info/pm10/:id", infoController.getInfoPm10);
app.post("/info/:id", infoController.updateInfo);
app.put("/info", infoController.addInfo);
app.put("/upload", infoController.fullUpload);
app.delete("/info/:id", infoController.deleteInfo);
/*starts the server, there is also a call back which will print the url on which
the application is running. it will print this message on terminal*/
app.listen(app.get("port"), () => {
    console.log("APP is running on http://localhost:%d", app.get("port"));
});
//# sourceMappingURL=app.js.map