import { body, validationResult } from "express-validator";

export const emailValidator =  body('email')
.isEmail()
.withMessage('Unesite ispravnu e-mail adresu');

export const passwordValidator = body('password')
.isLength({ min: 8 })
.withMessage('Lozinka mora sadržavati najmanje 8 znakova')



export const handleErrorsMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
        return;
    }
    next();
  };