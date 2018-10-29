"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return (another !== undefined
            && another.email === this.email
            && another.password === this.password);
    };
    return User;
}());
exports.User = User;
exports.users = {
    "falreis@gmail.com": new User('falreis@gmail.com', 'Felipe', '123456'),
    "felipe@gmail.com": new User('felipe@gmail.com', 'Felipe2', '123456')
};
