"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title) return;

  const post = await prisma.post.create({
    data: {
      title,
      content,
    },
  });

  revalidatePath("/");
  return post;
}

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPostById(id: string) {
  if (!id) return null;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!id || !title) return;

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    revalidatePath("/");
    return updatedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deletePostById(id: string) {
  if (!id) return;

  try {
    const deletedPost = await prisma.post.delete({
      where: { id },
    });

    revalidatePath("/");
    return deletedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
}