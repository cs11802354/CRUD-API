var device = "";
var pm_value = 0;
for (let key in info) {
    let value = info[key];
    if (key == "device") {
        device = value;
    }
    if (key == "p1") {
        pm_value = value;
    }
}
var final = device + ", p1_value = " + pm_value;
res.send(final);
//# sourceMappingURL=tempCodeRunnerFile.js.map