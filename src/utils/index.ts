import { comparePasswords, authMiddleware, hashPassword, createJWT, verifyJWT, createEmailJWT, verifyEmailJWT, roleMiddleware} from "./auth.js";
import { passwordValidator, emailValidator, handleErrorsMiddleware } from "./validators.js";
import { CustomException } from "./customException.js";
import prisma from './db.js'


export {
    comparePasswords, 
    hashPassword,
    prisma,
    createJWT,
    verifyJWT,
    createEmailJWT,
    verifyEmailJWT,
    authMiddleware,
    passwordValidator,
    emailValidator,
    handleErrorsMiddleware,
    CustomException,
    roleMiddleware
}