"use client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Board, Column, Task } from "./types";
import { supabase } from "@/supabase/supabase";

const UseBoard = () => {
  const params = useParams();
  const boardId = params?.boardId as string;
  const [columns, setColumns] = useState<Column[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [boardColumnCounts, setBoardColumnCounts] = useState<Record<string, number>>({});
  const [boardTaskCounts, setBoardTaskCounts] = useState<Record<string, number>>({});

  const fetchBoardData = useCallback(async () => {
    if (!boardId || boardId === ":boardId") {
      const { data: authData } = await supabase.auth.getUser();
      if (authData.user) {
        const { data } = await supabase
          .from("boards")
          .select("*")
          .eq("user_id", authData.user.id)
          .order("id", { ascending: true });
        setBoards((data as Board[]) || []);
         const { data: allColumns } = await supabase
          .from("columns")
          .select("id, board_id")
          .in("board_id", (data || []).map((b: Board) => b.id));
 
        // ✅ Har board ke liye task count fetch karo
        const { data: allTasks } = await supabase
          .from("task")
          .select("id, board_id")
          .in("board_id", (data || []).map((b: Board) => b.id));
 
        // Board ID se column count map banao
        const colCounts: Record<string, number> = {};
        const taskCounts: Record<string, number> = {};
 
        (allColumns || []).forEach((col: { id: string; board_id: string }) => {
          colCounts[col.board_id] = (colCounts[col.board_id] || 0) + 1;
        });
 
        (allTasks || []).forEach((task: { id: string; board_id: string }) => {
          taskCounts[task.board_id] = (taskCounts[task.board_id] || 0) + 1;
        });
 
        setBoardColumnCounts(colCounts);
        setBoardTaskCounts(taskCounts);
      }
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data: cols } = await supabase
        .from("columns")
        .select("*, task(*)")
        .eq("board_id", boardId)
        .order("order", { ascending: true });

      const { data: boardData } = await supabase
        .from("boards")
        .select("*")
        .eq("id", boardId)
        .single();
      setCurrentBoard(boardData as Board);

      const { data: task } = await supabase
        .from("task")
        .select("*")
        .eq("board_id", boardId);

      const formatedData: Column[] = (cols || []).map((col) => ({
        ...col,
        task: (task as Task[]).filter((t) => t.column_id === col.id),
      }));
      setColumns(formatedData);
    } catch (error: unknown) {
      console.error(
        "Error:",
        error instanceof Error ? error.message : String(error),
      );
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  const addTask = async (
    columnId: string,
    title: string,
    description: string,
    assignee: string,
    dueDate: string,
  ) => {
    const { error } = await supabase.from("task").insert([
      {
        title,
        description,
        assignee,
        due_date: dueDate,
        column_id: columnId,
        board_id: boardId,
      },
    ]);
    if (error) {
      console.error("Error adding task:", error.message);
    } else {
      await fetchBoardData();
    }
  };
  const addColumn = async (columnName: string) => {
    const { error } = await supabase.from("columns").insert([
      {
        name: columnName,
        column_name: columnName.toLowerCase().replace(/\s+/g, "-"),
        board_id: boardId,
        order: columns.length + 1,
      },
    ]);
    if (error) {
      console.error("Error adding column:", error.message);
    } else {
      await fetchBoardData();
    }
  };
  const deleteTask = async (taskId: string) => {
    const { error } = await supabase.from("task").delete().eq("id", taskId);
    if (error) {
      console.error("Error deleting task:", error.message);
    } else {
      await fetchBoardData();
    }
  };

  const deleteColumns = async (columnId: string) => {
    const { error } = await supabase
      .from("columns")
      .delete()
      .eq("id", columnId);
    if (!error) fetchBoardData();
  };

  const updateBoard = async (boardId: string, newName: string) => {
    const { error } = await supabase
      .from("boards")
      .update({ name: newName })
      .eq("id", boardId);
    if (!error) {
      fetchBoardData();
    } else {
      console.error("Error updating board:", error);
      alert("Failed to update board. Please try again." + error.message);
    }
  };

  const addBoard = async (boardName: string) => {
    const { data: authData } = await supabase.auth.getUser();
    const userID = authData?.user?.id;
    console.log("User ID:", userID);
    if (!userID) {
      alert("User not authenticated. Please log in again.");
      return;
    }
    const { error } = await supabase.from("boards").insert([
      {
        name: boardName,
        user_id: userID,
      },
    ]);
    if (!error) {
      fetchBoardData();
    } else {
      console.error("Error adding board:", error);
      alert("Failed to add board. Please try again." + error.message);
    }
  };
  const deleteBoard = async (boardId: string) => {
    const { error } = await supabase.from("boards").delete().eq("id", boardId);
    if (error) {
      console.error("Error deleting board:", error);
      alert("Failed to delete board. Please try again." + error.message);
    } else {
      fetchBoardData();
    }
  };

  const pinBoard = async (boardId: string, pinned: boolean) => {
  const { error } = await supabase
    .from("boards")
    .update({ is_pinned: pinned })
    .eq("id", boardId);
  if (!error) fetchBoardData();
};

const updateColumn = async (columnId: string, newName: string) => {
    const { error } = await supabase.from('columns').update({ name: newName, column_name: newName }).eq('id', columnId)
    if (!error) {
      fetchBoardData()
    } else {
      console.error('Error updating column:', error)
      alert('Failed to update column. Please try again.' + error.message)
    }
  }

  useEffect(() => {
    fetchBoardData();
  }, [fetchBoardData]);
  return {
    addTask,
    deleteTask,
    columns,
    pinBoard,
    boards,
    updateColumn,
    loading,
    currentBoard,
    refresh: fetchBoardData,
    deleteColumns,
    deleteBoard,
    addColumn,
    addBoard,
    updateBoard,
    boardColumnCounts,
    boardTaskCounts,
  };
};
export default UseBoard;
