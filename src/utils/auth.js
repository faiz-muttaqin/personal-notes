
// src/utils/auth.js
const API_URL = 'https://notes-api.dicoding.dev/v1';
// Set cookie with expiration in hours
export function setCookie(name, value, hours) {
  const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Get cookie by name
export function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Delete cookie
export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Login function
export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok && data.status === 'success') {
    setCookie('accessToken', data.data.accessToken, 1); // 1 hour
    return { success: true, token: data.data.accessToken };
  } else {
    return { success: false, message: data.message };
  }
}

// Logout function
export function logout() {
  deleteCookie('accessToken');
}

// Global API fetcher with Bearer token from cookie
// export async function apiFetch(url, options = {}) {
//   const token = getCookie('accessToken');
//   let { method = 'GET', headers = {}, body, ...rest } = options;
//   headers = {
//     ...headers,
//     ...(token ? { Authorization: `Bearer ${token}` } : {})
//   };
//   // Auto-serialize body if it's an object and not FormData
//   if (body && typeof body === 'object' && !(body instanceof FormData)) {
//     headers['Content-Type'] = 'application/json';
//     body = JSON.stringify(body);
//   }
//   return fetch(`${API_URL}${url}`, {
//     method,
//     headers,
//     body,
//     ...rest
//   });
// }
export async function apiFetch(url, options = {}) {
  const token = getCookie('accessToken');
  let { method = 'GET', headers = {}, body, ...rest } = options;
  headers = {
    ...headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  
  // Auto-serialize body if it's an object and not FormData
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  
  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    body,
    ...rest
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json(); // Parse JSON response
}
// Register function
export async function register({ name, email, password }) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  if (res.ok && data.status === 'success') {
    return { success: true, data: data.data, message: data.message };
  } else {
    return { success: false, message: data.message };
  }
}

// Get current user's information
export async function getCurrentUser() {
    try {
        const result = await apiFetch('/users/me');
        return { success: true, data: result.data };
    } catch (error) {
        return { success: false, message: error.message || 'Failed to get user information' };
    }
}