const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(data) {
  return prisma.user.create({
    data,
  });
}


async function getUser(data) {
  return prisma.user.findFirst({
    where: { email: data.userEmail },
  });
}

async function updateProfile(data) {
  try {
    const updatedUser = await prisma.user.update({
      where: { email: data.userEmail },
      data: { profileImage: data.imageUrl },
    });
    console.log('Profile updated:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.error('Failed to update profile:', error);
    throw error; // Re-throw the error to be handled or logged by the caller
  }
}
module.exports = { createUser, getUser, updateProfile };
