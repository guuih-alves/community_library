import userServices from "../service/user.services.js";
import {loginService} from '../service/auth.service.js'

//No controller testa onde nao ha erro na aplicação

async function createuserController(req, res) {
    const newUser = req.body;

    try {
        const token = await userServices.createUserService(newUser);
        res.status(201).send({token})
    } catch (e){
        return res.status(400).send(e.message);
    }
}

async function loginuserController(req, res) {
    const { email, password} = req.body;

    try {
        const token = await loginService(email, password);
        res.status(201).send({token})
    } catch (e){
        return res.status(400).send(e.message);
    }
}

async function findAllUserController(req, res) {
    try{
        const users = await userServices.findAllUsersService();
        res.send({ users});
    } catch (e){
        return res.status(404).send(e.message)
    }
}

async function findUserByYdController(req, res) {
    const {id} = req.params;

    try{
        const user = await userServices.findUserByIdService(id);
        res.send({ user});
    }catch(e){
        return res.status(404).send(e.message)
    }
}

async function updateUserController(req, res) {
    const { id} = req.params;
    const newUser = req.body;

    try{
        const user = await userServices.updateUserService(newUser, id);
        res.send({user});
    }catch(e){
        return res.status(404).send(e.message)
    }
}

async function deleteUserController(req, res) {
    const { id} = req.params;

    try{
        const message = await userServices.deleteUserservice(id);
        res.send({message});
    }catch(e){
        return res.status(404).send(e.message)
    }
}

export default{
    createuserController,
    findAllUserController,
    findUserByYdController,
    updateUserController,
    deleteUserController,
    loginuserController
}