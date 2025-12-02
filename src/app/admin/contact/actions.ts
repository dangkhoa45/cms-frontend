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

export async function createContactSettingAction(data: any) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = getCookieHeader(cookieStore);

    const response = await backendApi.admin.contactSettings.create(
      data,
      cookieHeader
    );

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: formatActionError(error, "Failed to create contact setting"),
    };
  }
}

export async function updateContactSettingAction(id: string, data: any) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = getCookieHeader(cookieStore);

    const response = await backendApi.admin.contactSettings.update(
      id,
      data,
      cookieHeader
    );

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: formatActionError(error, "Failed to update contact setting"),
    };
  }
}

export async function deleteContactSettingAction(id: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = getCookieHeader(cookieStore);

    await backendApi.admin.contactSettings.remove(id, cookieHeader);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: formatActionError(error, "Failed to delete contact setting"),
    };
  }
}

export async function updateContactMessageAction(id: string, data: any) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = getCookieHeader(cookieStore);

    const response = await backendApi.admin.contactMessages.update(
      id,
      data,
      cookieHeader
    );

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: formatActionError(error, "Failed to update contact message"),
    };
  }
}

export async function deleteContactMessageAction(id: string) {
  try {
    const cookieStore = await cookies();
    const cookieHeader = getCookieHeader(cookieStore);

    await backendApi.admin.contactMessages.remove(id, cookieHeader);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: formatActionError(error, "Failed to delete contact message"),
    };
  }
}
