import { supabase } from "@/supabase/supabase";
import { User } from "@supabase/supabase-js/dist/index.cjs";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log("Error fetching user:", error.message);
      }
      if (isMounted) {
        setUser(data.user);
      }
    };
    fetchUser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user) {
      throw new Error(error?.message);
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    if (error || !data.user) {
      throw new Error(error?.message);
    }
  };
  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    setUser(null);
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/boards`, // login ke baad yahan jayega
      },
    });
    if (error) console.log("Google Sign-In Error:", error.message);
  };
  return {
    user,
    login,
    signUp,
    logout,
    loginWithGoogle,
  };
};

export default useAuth;
