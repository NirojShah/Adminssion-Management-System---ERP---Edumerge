export const getUser = () => {
  const user = localStorage.getItem("user");
  console.log(user)
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};