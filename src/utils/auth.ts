import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";


export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
  };
  
export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
};

export const createEmailJWT = (user, expiresIn = '1d') => {
    const token = jwt.sign(
      {email: user.email },
      process.env.JWT_EMAIL_SECRET, {
        expiresIn
      }
    );
    return token;
};

export const verifyEmailJWT = (token) => jwt.verify(token, process.env.JWT_EMAIL_SECRET);

export const createJWT = (user, expiresIn = '1d') => {
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET, {
        expiresIn: '1y'
      }
    );
    return token;
};

export const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);


export const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    res.status(401);
    res.send("Korisnik nije autorizovan");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
    return;
  } catch (e) {
    res.status(401);
    res.send("Korisnik nije autorizovan");
    return;
  }
};

