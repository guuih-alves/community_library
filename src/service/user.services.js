import userRepositories from '../repositories/user.repositories.js';
import userRepository from '../repositories/user.repositories.js'
import bcrypt from 'bcrypt'
import { generateJWT} from './auth.service.js'

async function createUserService(newUser){
    
    const foundUser = await userRepository.findUserByEmailRepository(newUser.email);
    if(foundUser) throw new Error('User already exists')

    const passHash = await bcrypt.hash(newUser.password, 10);
    const user = await userRepository.createUserRepository({...newUser, password: passHash,});  // criptografia para password
    if(!user) throw new Error('Error creating user');
    const token = generateJWT(user.id)
    return token;

}
async function findAllUsersService() {
    const users =  await userRepository.findAllUserRepository()
    return users;
    
}

async function findUserByIdService(id) {
    const user = await userRepository.findUserByIdRepository(id)
    if(!user) throw new Error ("User not found")
    return user;
}

async function updateUserService(newUser, userID) {
    const user = await userRepository.findUserByIdRepository(userID);
    if (!user) throw new Error('User not found');
    if(newUser.password){
        newUser.password = await bcrypt.hash(newUser.password, 10)
    }
    
    const userUpdated = userRepository.updateUserRepository(userID, newUser)
    return userUpdated;
}

async function deleteUserservice(userId) {
    const user= await userRepository.findUserByIdRepository(userId);
    if (!user) throw new Error ('User not found');
    const {message} = await userRepositories.deleteUserRepository(userId);
    return message;
}

export default {
    createUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
    deleteUserservice
}