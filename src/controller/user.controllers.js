import userServices from "../service/user.services.js";

async function createuserController(req, res) {
    const newUser = req.body;

    try {
        const user = userServices.createUserService(newUser);
        res.status(201).send({user})
    } catch (err){
        return res.status(400).send(err.message);
    }
}

export default{
    createuserController
}