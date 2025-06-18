export async function fetchComToken(url, options = {}) {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.replace("login");
    throw new Error("Token não encontrado");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, { ...options, headers });
}
