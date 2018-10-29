"use strict";
exports.__esModule = true;
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api.config");
exports.handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbuser = users_1.users[user.email];
        var token = jwt.sign({
            sub: dbuser.email,
            iss: 'meat-api'
        }, api_config_1.apiConfig.secret);
        resp.json({ name: dbuser.name, email: dbuser.email, accessToken: token });
    }
    else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};
function isValid(user) {
    if (!user)
        return false;
    else {
        var dbuser = users_1.users[user.email];
        return (dbuser !== undefined && dbuser.matches(user));
    }
}
