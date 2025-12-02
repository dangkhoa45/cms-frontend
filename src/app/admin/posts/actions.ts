"use server";

import { cookies } from "next/headers";
import { backendApi, BackendApiError } from "@/libs/api";

function getCookieHeader(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  const serialized = cookieStore.toString();
  return serialized.length ? serialized : undefined;
}

function formatActionError(error: unknown, fallback: string) {
  if (error instanceof BackendApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export async function createPostAction(data: any) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = getCookieHeader(cookieStore);

    const response = await backendApi.admin.posts.create(data, cookieHeader);

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: formatActionError(error, "Failed to create post"),
    };
  }
}

export async function updatePostAction(id: string, data: any) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = getCookieHeader(cookieStore);

    const response = await backendApi.admin.posts.update(
      id,
      data,
      cookieHeader
    );

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: formatActionError(error, "Failed to update post"),
    };
  }
}

export async function deletePostAction(id: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = getCookieHeader(cookieStore);

    await backendApi.admin.posts.remove(id, cookieHeader);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: formatActionError(error, "Failed to delete post"),
    };
  }
}
