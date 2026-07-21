import { BoardsProps } from "@/hooks/types";
import useAuth from "@/hooks/useAuth";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const BoardNav = ({ initials }: BoardsProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/6 bg-[#080d0b]/70 backdrop-blur-xl">
      <h1
        className="text-lg md:text-xl font-bold text-[#c8f0a0] tracking-tight"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Taskora
      </h1>
      <div className="flex items-center gap-3">
        <Button className="flex gap-2 hover:cursor-pointer transition-colors"  size="sm" onClick={() => router.push("/taskoraai")}>
          <Sparkles className="text-[#c8f0a0] " size={24} />{" "}
          <h1
            className="text-lg md:text-xl  font-bold text-[#c8f0a0] tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Taskora AI
          </h1>
        </Button>
        <div className="w-8 h-8 rounded-full bg-[#c8f0a0]/10 border border-[#c8f0a0]/20 flex items-center justify-center text-[10px] font-medium text-[#c8f0a0]">
          {initials}
        </div>
        <button
          onClick={handleLogout}
          className="text-[11px] text-white/40 border border-white/10 px-3 py-1.5 rounded-md bg-white/4 hover:bg-white/8 hover:text-white/70 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default BoardNav;
