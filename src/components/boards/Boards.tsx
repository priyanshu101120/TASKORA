"use client";
import useAuth from "@/hooks/useAuth";
import UseBoard from "@/hooks/useBoard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { TiPinOutline } from "react-icons/ti";
import BoardsSkeletonLodder from "./BoardsSkeletonLodder";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Trash2Icon, Plus, Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getRelativeTime } from "@/hooks/types";
import BoardNav from "./BoardNav";
import MyboardStats from "./MyboardStats";

const Boards = () => {
  const { user } = useAuth();
  const {
    loading,
    boards,
    addBoard,
    updateBoard,
    deleteBoard,
    pinBoard,
    boardColumnCounts,
    boardTaskCounts,
  } = UseBoard();
  console.log("Boards component - boardColumnCounts:", boardColumnCounts);
  console.log("Boards component - boardTaskCounts:", boardTaskCounts);
  const [deletingBoardId, setDeletingBoardId] = useState<string | null>(null);
  const [editingBoard, setEditingBoard] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [newBoardName, setNewBoardName] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const sortedBoards = [...boards].sort(
    (a, b) => Number(b.is_pinned) - Number(a.is_pinned),
  );

  const handleAddBoard = async () => {
    if (newBoardName.trim()) {
      await addBoard(newBoardName.trim());
      setNewBoardName("");
      setIsAdding(false);
    }
  };

  const getSpan = (i: number) => {
    const patterns = [
      "md:col-span-1 md:row-span-1",
      "md:col-span-2 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1",
    ];
    return patterns[i % patterns.length];
  };

  const dotColors = [
    "bg-[#95d5b2]",
    "bg-[#74c8a4]",
    "bg-[#7ec8e3]",
    "bg-[#d4aaff]",
  ];

  const initials =
    user?.user_metadata?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    user?.email?.slice(0, 2).toUpperCase() ||
    "??";

  return (
    <div className="relative min-h-screen bg-[#080d0b] overflow-hidden font-[Inter,sans-serif]">
      <div
        className="pointer-events-none fixed inset-0 z-1 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="pointer-events-none fixed -top-20 -right-16 w-105 h-105 z-0"
        style={{
          background: "radial-gradient(circle, #1a3d2b 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed -bottom-24 -left-20 w-95 h-95 z-0"
        style={{
          background: "radial-gradient(circle, #0f2d1c 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed top-[40%] left-[35%] w-70 h-70 z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(180,230,160,0.04) 0%, transparent 65%)",
        }}
      />

      <BoardNav initials={initials} />

      <main className="relative z-2 px-6 md:px-8 py-6 md:py-8">
        <MyboardStats loading={loading} boards={boards} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[minmax(170px,auto)] gap-3 md:gap-4">
          {loading ? (
            Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={getSpan(i)}>
                <BoardsSkeletonLodder />
              </div>
            ))
          ) : (
            <>
              {sortedBoards.map((board, i) => {
                const dot = dotColors[i % dotColors.length];

                return (
                  <Link
                    key={board.id}
                    href={`/boards/${board.id}`}
                    className={`group ${getSpan(i)}`}
                  >
                    <Card
                      className="relative h-full overflow-hidden rounded-2xl border border-white/8 backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-[1.015] hover:-translate-y-0.5 hover:border-[#c8f0a0]/20 bg-transparent"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                        boxShadow:
                          "0 1px 0 inset rgba(255,255,255,0.04), 0 8px 24px -8px rgba(0,0,0,0.4)",
                      }}
                    >
                      <div
                        className="absolute top-0 left-[10%] right-[10%] h-px"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                        }}
                      />

                      <CardContent className="p- pb-0">
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${dot} mt-1`}
                          />
                          {board.is_pinned && (
                            <span className="text-[9px] text-[#c8f0a0]/60 border border-[#c8f0a0]/20 px-1.5 py-0.5 rounded-full">
                              pinned
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <button
                              aria-label="Edit board"
                              className="p-1 rounded hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setEditingBoard({
                                  id: board.id,
                                  name: board.name,
                                });
                              }}
                            >
                              <Pencil
                                className="text-white/50 hover:text-white"
                                size={14}
                              />
                            </button>

                            <button
                              aria-label="Delete board"
                              className="p-1 rounded hover:bg-red-500/15 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDeletingBoardId(board.id);
                              }}
                            >
                              <Trash2Icon
                                className="text-white/50 hover:text-red-400"
                                size={14}
                              />
                            </button>
                            <button
                              aria-label="Pin board"
                              className="p-1 rounded hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                pinBoard(board.id, !board.is_pinned);
                              }}
                            >
                              <TiPinOutline className="text-white/50 hover:text-[#c8f0a0]" />
                            </button>
                          </div>
                        </div>

                        <h3
                          className="text-lg md:text-xl font-bold text-[#e8f5e0] leading-tight tracking-tight mb-1"
                          style={{ fontFamily: "'Fraunces', serif" }}
                        >
                          {board.name || "Untitled Board"}
                        </h3>
                        <p className="text-[11px] text-white/30">
                          Click to view board →
                        </p>
                      </CardContent>

                      <CardFooter className="absolute bottom-0 left-5 right-5 pb-4 pt-2.5 flex items-center justify-between border-t border-white/6 px-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/40">
                            {boardTaskCounts[board.id] || 0} tasks
                          </span>
                          <span className="text-white/15">·</span>
                          <span className="text-[10px] text-white/40">
                            {boardColumnCounts[board.id] || 0} columns
                          </span>
                        </div>
                        <span className="text-[10px] text-white/30">
                          <span className="text-[10px] text-white/30">
                            {getRelativeTime(board.created_at)}
                          </span>
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}

              <div
                className={`group transition-all ${
                  isAdding
                    ? "sm:col-span-2 md:col-span-2 md:row-span-1"
                    : "md:col-span-1 md:row-span-1"
                }`}
              >
                <div
                  className={`relative h-full min-h-42.5 rounded-2xl border cursor-pointer transition-all flex flex-col items-center justify-center gap-2 px-4 py-4
                    ${
                      isAdding
                        ? "border-[#c8f0a0]/25 bg-[#c8f0a0]/4"
                        : "border-white/6 bg-black/25 hover:bg-[#c8f0a0]/4 hover:border-[#c8f0a0]/15"
                    }`}
                  style={{
                    boxShadow:
                      "inset 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                  onClick={() => !isAdding && setIsAdding(true)}
                >
                  {isAdding ? (
                    <div
                      className="flex flex-col gap-3 w-full max-w-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-[#c8f0a0] text-xs font-semibold text-center tracking-wide uppercase">
                        Name your board
                      </p>
                      <Input
                        autoFocus
                        placeholder="e.g. Sprint Planning..."
                        value={newBoardName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setNewBoardName(e.target.value)
                        }
                        onKeyDown={(
                          e: React.KeyboardEvent<HTMLInputElement>,
                        ) => {
                          if (e.key === "Enter") handleAddBoard();
                          if (e.key === "Escape") {
                            setIsAdding(false);
                            setNewBoardName("");
                          }
                        }}
                        className="bg-white/6 border-[#c8f0a0]/30 text-white placeholder:text-white/30 focus-visible:ring-[#c8f0a0]/40 focus-visible:border-[#c8f0a0] text-sm h-9"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddBoard}
                          className="flex-1 bg-[#c8f0a0] text-[#080d0b] hover:bg-[#b8e580] font-bold text-xs h-8"
                        >
                          Add Board
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setIsAdding(false);
                            setNewBoardName("");
                          }}
                          className="flex-1 text-white/50 hover:text-white hover:bg-white/10 text-xs h-8"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 select-none">
                      <div className="w-8 h-8 rounded-lg border border-dashed border-white/15 flex items-center justify-center group-hover:border-[#c8f0a0]/40 transition-colors">
                        <Plus className="w-4 h-4 text-white/25 group-hover:text-[#c8f0a0]/60 transition-colors" />
                      </div>
                      <p className="text-xs text-white/25 group-hover:text-white/50 transition-colors">
                        Add your board
                      </p>
                      <p className="text-[10px] text-white/12">
                        Click to create
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {!loading && boards.length === 0 && !isAdding && (
          <div className="mt-16 flex flex-col items-center text-center">
            <h2
              className="text-white text-2xl md:text-4xl font-bold mb-3 tracking-tight"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              No boards <span style={{ fontStyle: "italic" }}>yet</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base max-w-sm">
              Click the dotted card above to create your first board!
            </p>
          </div>
        )}
        <AlertDialog
          open={!!deletingBoardId}
          onOpenChange={(open) => !open && setDeletingBoardId(null)}
        >
          <AlertDialogContent
            className="bg-[#0d1a12] border border-white/10 text-white shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(26,61,43,0.95) 0%, rgba(8,13,11,0.98) 100%)",
              boxShadow:
                "0 0 0 1px rgba(200,240,160,0.08), 0 24px 48px -12px rgba(0,0,0,0.8)",
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#e8f5e0]">
                Delete board?
                <Trash2Icon
                  className="inline ml-2 mb-1 text-red-600"
                  size={16}
                />
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/50">
                This will permanently delete this board. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600/80 hover:bg-red-600 border border-red-500/30 text-white"
                onClick={() => {
                  if (deletingBoardId) deleteBoard(deletingBoardId);
                  setDeletingBoardId(null);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={!!editingBoard}
          onOpenChange={(open) => !open && setEditingBoard(null)}
        >
          <AlertDialogContent
            className="bg-[#0d1a12] border border-white/10 text-white shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(26,61,43,0.95) 0%, rgba(8,13,11,0.98) 100%)",
              boxShadow:
                "0 0 0 1px rgba(200,240,160,0.08), 0 24px 48px -12px rgba(0,0,0,0.8)",
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#e8f5e0]">
                Rename board
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/50">
                Enter a new name for this board.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <Input
              autoFocus
              value={editingBoard?.name ?? ""}
              onChange={(e) =>
                setEditingBoard((prev) =>
                  prev ? { ...prev, name: e.target.value } : null,
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (editingBoard?.name.trim()) {
                    updateBoard(editingBoard.id, editingBoard.name.trim());
                    setEditingBoard(null);
                  }
                }
                if (e.key === "Escape") setEditingBoard(null);
              }}
              className="bg-white/6 border-[#c8f0a0]/30 text-white placeholder:text-white/30 focus-visible:ring-[#c8f0a0]/40 focus-visible:border-[#c8f0a0] text-sm h-9"
            />

            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-[#c8f0a0] text-[#080d0b] hover:bg-[#b8e580] font-bold"
                onClick={() => {
                  if (editingBoard?.name.trim()) {
                    updateBoard(editingBoard.id, editingBoard.name.trim());
                    setEditingBoard(null);
                  }
                }}
              >
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default Boards;
