export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
}

export async function loginAdmin({
  username,
  password,
}: LoginPayload): Promise<LoginResponse> {
  try {
    const params = new URLSearchParams({
      username,
      password,
    });

    const res = await fetch(
      `https://blade-commerce.onrender.com/api/auth/login?${params.toString()}`,
      {
        method: "POST",
        headers: {
          Accept: "*/*",
        },
      }
    );

    if (!res.ok) {
      return { success: false, message: "Login failed" };
    }

    const data = await res.json();

    if (data === true) {
      return { success: true };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  } catch {
    return { success: false, message: "Network error on login" };
  }
}
