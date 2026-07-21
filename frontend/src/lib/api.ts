import { LoginData, RegisterData } from "@/hooks/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "API request failed");
  }
  return data;
}

export const authapi = {
  register: (payload: RegisterData) =>
    apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  login: (payload: LoginData) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),

  getUserProfile: () =>
    apiRequest("/auth/profile", {
      method: "GET",
    }),
};

export const boardApi = {
  getAll: () => apiRequest("/boards", { method: "GET" }),
  getById: (id: string) => apiRequest(`/boards/${id}`, { method: "GET" }),
  create: (payload: { title: string; description?: string }) =>
    apiRequest("/boards", { method: "POST", body: JSON.stringify(payload) }),
  update: (id: string, payload: { title?: string; description?: string }) =>
    apiRequest(`/boards/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  pin: (id: string, is_pinned: boolean) =>
    apiRequest(`/boards/${id}/pin`, { method: "PATCH", body: JSON.stringify({ is_pinned }) }),
  delete: (id: string) => apiRequest(`/boards/${id}`, { method: "DELETE" }),
};

export const columnApi = {
  create: (payload: { name: string; boardId: string }) =>
    apiRequest("/columns", { method: "POST", body: JSON.stringify(payload) }),

  getByBoard: (boardId: string) =>
    apiRequest(`/columns/board/${boardId}`, { method: "GET" }),

  update: (id: string, payload: { name?: string }) =>
    apiRequest(`/columns/${id}`, { method: "PUT", body: JSON.stringify(payload) }),

  delete: (id: string) => apiRequest(`/columns/${id}`, { method: "DELETE" }),
};

export const taskApi = {
  create: (payload: {
    title: string;
    description?: string;
    assignee?: string;
    dueDate?: string;
    columnId: string;
    boardId: string;
  }) => apiRequest("/tasks", { method: "POST", body: JSON.stringify(payload) }),

  getByBoard: (boardId: string) =>
    apiRequest(`/tasks/board/${boardId}`, { method: "GET" }),

  update: (id: string, payload: Partial<{
    title: string;
    description: string;
    assignee: string;
    dueDate: string;
    columnId: string;
  }>) => apiRequest(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(payload) }),

  delete: (id: string) => apiRequest(`/tasks/${id}`, { method: "DELETE" }),
};
