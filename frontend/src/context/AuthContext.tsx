"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<{ email: string }>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

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
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/auth/profile")
      .then((res) => setUser(res.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(res.user);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const res = await apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    return { email: res.email };
  };

  const verifyOtp = async (email: string, otp: string) => {
    const res = await apiRequest("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    });
    setUser(res.user);
  };

  const resendOtp = async (email: string) => {
    await apiRequest("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  };

  const logout = async () => {
    await apiRequest("/auth/logout", { method: "POST" });
    setUser(null);
  };

  const loginWithGoogle = () => {
    alert("Google login coming soon!");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signUp, verifyOtp, resendOtp, logout, loginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthh() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthh must be used within AuthProvider");
  return context;
}