// Simple API helper for the frontend
const API_BASE_URL = "http://localhost:4000";

function getToken() {
  return localStorage.getItem("auth_token") || "";
}

function setToken(token) {
  if (token) localStorage.setItem("auth_token", token);
}

function clearToken() {
  localStorage.removeItem("auth_token");
}

function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    const message = typeof data === "string" ? data : data?.message || "Request failed";
    throw new Error(message);
  }
  return data;
}

function requireAuth(redirectTo = "login.html") {
  if (!getToken()) {
    window.location.href = redirectTo;
  }
}

window.API = { apiFetch, getToken, setToken, clearToken, authHeader, requireAuth };


