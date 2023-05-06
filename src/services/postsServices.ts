import { prisma } from "../utils/index.js";
import { CustomException, verifyJWT } from "../utils/index.js";

export const getAllPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        belongsTo: {
          select: {
            id: true,
            name: true,
            surname: true,
            image: true,
            role: true,
          },
        },
      },
    });

    
    return posts;
  } catch (error) {
    throw new CustomException("Greska na serveru", 500);
  }
};

export const getPostById = async (id) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        belongsTo: {
          select: {
            id: true,
            name: true,
            surname: true,
            image: true,
            role: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    throw new CustomException("Greska na serveru", 500);
  }
};

export const deletePostById = async (id) => {
  try {
    const post = await prisma.post.delete({
      where: { id: id },
      select: {
        id: true,
      },
    });
    return post?.id;
  } catch (error) {
    throw new CustomException("Greska na serveru", 500);
  }
};

export const createPost = async (token, title, description) => {
  const user = verifyJWT(token);

  if (!user.id) {
    throw new CustomException("User nema prava da objavi post", 403);
  }
  try {
    const postId = prisma.post.create({
      data: {
        belongsToId: user.id,
        title: title,
        description: description,
      },
      select: {
        id: true,
      },
    });
    return postId;
  } catch (error) {
    throw new CustomException("Greska na serveru", 500);
  }
};

export const updatePostById = async (id, title, description, belongsToId) => {
  try {
    const postId = await prisma.post.update({
      where: { id: id },
      data: { title, description, belongsToId },
      select: {
        id: true,
      },
    });

    return postId;
  } catch (error) {
    throw new CustomException("Greska na serveru", 500);
  }
};
