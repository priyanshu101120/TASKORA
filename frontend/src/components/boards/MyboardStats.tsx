import React from "react";
import { Skeleton } from "../ui/skeleton";
import { MyBoardStatsProps } from "@/hooks/types";

const MyboardStats = ({ loading, boards }: MyBoardStatsProps) => {
  return (
    <div className="mb-6 md:mb-8">
      {loading ? (
        <>
          <Skeleton className="h-3 w-40 rounded bg-white/5 mb-2" />
          <Skeleton className="h-9 w-52 rounded-lg bg-white/10 mb-2" />
          <Skeleton className="h-3 w-32 rounded bg-white/5" />
        </>
      ) : (
        <>
          <div className="text-[10px] tracking-[0.12em] uppercase text-[#c8f0a0]/40 mb-1.5">
            workspace · your boards
          </div>
          <h2
            className="text-2xl md:text-4xl font-bold text-[#e8f5e0] leading-tight tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            My{" "}
            <span
              className="text-[#c8f0a0] not-italic"
              style={{ fontStyle: "italic" }}
            >
              Boards
            </span>
          </h2>
          <p className="text-xs text-white/30 mt-1.5">
            {boards.length} active {boards.length === 1 ? "board" : "boards"}
          </p>
        </>
      )}
    </div>
  );
};

export default MyboardStats;
