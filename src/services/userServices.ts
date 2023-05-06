import { prisma } from "../utils/index.js";
import { CustomException, verifyJWT } from "../utils/index.js";

export const getUser = async (token) => {
  const userData = verifyJWT(token);
  try {
    const user = await prisma.user.findUnique({
      where: { id: userData?.id },
      select: {
        id: true,
        name: true,
        surname: true,
        image: true,
        role: true,
        email: true,
      },
    });
    return user;
  } catch (error) {
    throw new CustomException("Greska na serveru", 500);
  }
};

export const updateUser = async (token, image, name, surname) => {
  const userData = verifyJWT(token);
  try {
    const user = await prisma.user.update({
      where: { id: userData?.id },
      data: { image, name, surname },
      select: {
        id: true,
      },
    });

    return user;
  } catch (error) {
    throw new CustomException("Greska na serveru", 500);
  }
};
