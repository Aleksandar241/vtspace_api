import nodemailer  from 'nodemailer';
import {prisma, hashPassword, comparePasswords, createJWT, verifyEmailJWT, createEmailJWT, CustomException} from '../utils/index.js';



export const emailSignup = async ({email, password}) => {



  try {
      const jwt = await createUser({email, password});

      const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'vtspace@outlook.com',
          pass: 'softversko2023'
        }
      });
      
      const url = `${process.env.API}/api/confirmation/${jwt}`;

      const mailOptions = {
        from: 'vtspace@outlook.com',
        to: email,
        subject: 'Registracija',
        html: `<a href=${url}>Potvrdi registraciju</a>`
      };
    
      await transporter.sendMail(mailOptions);
      return {message: 'Verifikacioni mejl je poslat.'}
    } catch (error) {
        throw new CustomException(error?.message ?? 'Verifikacioni mejl ne moze biti poslat.', error?.status ?? 500)
    }
}


export const createUser = async ({email, password}) => {
    const hash = await hashPassword(password);

    
    const user = await prisma.user.findUnique({
        where: { email},
      });

    
    if(!user) {
      const userResponse = await prisma.user.create({
        data: {
          email: email,
          password: hash,
          status: 'PENDING',
        },
      });

      const token = createEmailJWT(userResponse);
    
      return token;

    }

    if(user.status === 'ACTIVE') {
       throw new CustomException('Vec postoji korisnik sa ovim emailom', 400)
    }

    if(user.status === 'PENDING') {
      const token = createEmailJWT(user);
      return token;
   }
}

export const confirmUser = async (token) => {
    const data = verifyEmailJWT(token);

      
    if(!data.email) {
      throw new CustomException('Korisnik nije autorizovan', 401)
    }  

    const user = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if(user.status === 'ACTIVE'){
        throw new CustomException('Korisnik je vec potvrdio registraciju', 400)
      }
  
    const updatedUser = await prisma.user.update({
        where: {
          email: data.email 
        },
        data: {
          status: 'ACTIVE', 
        },
        select: { 
          id: true,
          email: true,
          status: true,
          role: true,
        }
      });
    
    return updatedUser;
}


export const login = async ({email, password}) => {

    const user = await prisma.user.findUnique({
        where: { email },
      });
      
      if (!user) {
        throw new CustomException('Korisinik ne postoji', 404);
      }
    
    const isValid = await comparePasswords(password, user.password);
    
    if (!isValid) {
      throw new CustomException('Password nije dobar', 400);
    }
    
    const token = createJWT(user);

    return token;
}
