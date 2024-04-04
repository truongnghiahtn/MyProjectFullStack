class UserController {
    getAllUser=(req,res,next)=>{
        res.status(200).json({
            status:"ok"
        })
    }
}
module.exports = new UserController();
