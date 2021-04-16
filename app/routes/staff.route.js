const {staffCont,logout} = require('../controllers');
const {signupHelpers} = require('../middlewares')
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    
    
    app.post("/api/staff/signup",[signupHelpers.checkStaffEmail],[staffCont.signUp]);
    
    app.post("/api/staff/signin",[staffCont.signIn]);
    
    app.post("/api/staff/update-profile",[signupHelpers.checkLogin],[signupHelpers.checkStaffEmail],[staffCont.updateProfile]);
    
    app.post("/api/staff/create-available-slot",[signupHelpers.checkLogin],[staffCont.createAvailability]);
    
    app.get("/get-profile",[signupHelpers.checkLogin],[staffCont.getProfileData])

}