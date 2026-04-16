const URL = "http://localhost:3000/student-portal/auth";
export const login = async ({ email, password }) => {
  const response = await fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  console.log(data.message);
  return data.userId;
};
