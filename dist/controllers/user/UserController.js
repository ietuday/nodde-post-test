"use strict";
const UserBusiness = require("../../app/business/user/UserBusiness");
const utility_1 = require("../_helper/utility");
class UserController {
    /**
     * @description Api for creating new user
     * @param request
     * @param response
     */
    create(request, response) {
        try {
            const user = request.body;
            const userBusiness = new UserBusiness();
            userBusiness.create(user, (error, result) => {
                if (error) {
                    console.log(error);
                    response.status(500).send(utility_1.default.generateResponse(404, error, false, null));
                }
                if (result) {
                    response.status(200).send(utility_1.default.generateResponse(200, `Created Successfully`, true, result));
                }
            });
        }
        catch (error) {
            console.log(error);
            response.send({ "Exception": error });
        }
    }
    /*
    * @description Api authenticating user at the time of login
    * @param request
    * @param response
    */
    login(request, response) {
        try {
            const { email, password } = request.body;
            let userBusiness = new UserBusiness();
            userBusiness.login(email, password, (error, result) => {
                error
                    ?
                        response.status(404).send(utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.status(200).send(utility_1.default.generateResponse(200, 'Login Sucessfully', true, result));
            });
        }
        catch (error) {
            response.send({ "Exception": error });
        }
    }
    /**
     * @description For loging out from user session
     * @param request
     * @param response
     */
    logout(request, response) {
        try {
            let _id = request.user._id;
            let userBusiness = new UserBusiness();
            userBusiness.logout(_id, (error, result) => {
                error
                    ?
                        response.send(utility_1.default.generateResponse(404, error, false, null))
                    :
                        response.send(utility_1.default.generateResponse(200, 'Loging out Sucessfully', true, null));
            });
        }
        catch (error) {
            response.send({ "Exception": error });
        }
    }
    /**
     * @api $BASE_URL/api/v1/allUsers
     * @description Api for getting all users
     * @param request
     * @param response
     */
    retrieve(request, response) {
        try {
            const user = request.user;
            const userBusiness = new UserBusiness();
            userBusiness.retrieve((error, result) => {
                error ? response.status(404).send(utility_1.default.generateResponse(404, error, false, null)) : response.send(utility_1.default.generateResponse(200, 'All users', true, result));
            });
        }
        catch (e) {
            response.send({ "exception": e });
        }
    }
    /**
     *
     * @param request
     * @param response
     */
    delete(request, response) {
        response.send({
            url: request.url,
            data: {
                name: "rahul",
                msg: "from DELETE call"
            }
        });
    }
    /**
     *
     * @param request
     * @param response
     */
    findById(request, response) { }
    update(request, response) { }
    changePassword(request, response) {
        try {
            const { email, oldPassword, newPassword } = request.body;
            const userBusiness = new UserBusiness();
            userBusiness.changePassword(email, oldPassword, newPassword, (error, result) => {
                if (error)
                    response.status(500).send(utility_1.default.generateResponse(500, error, false, null));
                response.status(200).send(utility_1.default.generateResponse(200, `change password`, true, result));
            });
        }
        catch (error) {
            response.status(500).send(utility_1.default.generateResponse(500, error, false, null));
        }
    }
}
module.exports = UserController;
//# sourceMappingURL=UserController.js.map