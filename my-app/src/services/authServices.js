const URL = "student-portal/auth";

export const login = async ({ email, password }) => {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data.user;
};

export const logout = async () => {
  const response = await fetch(`${URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "logout failed");
  }
  return data.message;
};
export const register = async (data) => {
  const response = await fetch(`${URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || "register failed");
  }
  return responseData.user;
};
