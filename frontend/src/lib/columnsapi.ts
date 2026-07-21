"use client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Board, Column, Task } from "./types";
import { boardApi, columnApi, taskApi } from "@/lib/api";

const mapBoard = (b: any): Board => ({
  id: b._id,
  name: b.title,
  is_pinned: b.is_pinned ?? false,
  created_at: b.createdAt,
  user_id: b.owner,
});

const mapTask = (t: any): Task => ({
  id: t._id,
  title: t.title,
  description: t.description,
  assignee: t.assignee,
  due_date: t.dueDate,
  column_id: t.column,
  board_id: t.board,
});

const mapColumn = (c: any, tasks: Task[]): Column => ({
  id: c._id,
  name: c.name,
  column_name: c.name.toLowerCase().replace(/\s+/g, "-"),
  board_id: c.board,
  order: c.order,
  task: tasks.filter((t) => t.column_id === c._id),
});

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
    setLoading(true);
    try {
      if (!boardId || boardId === ":boardId") {
        // Boards LIST page
        const res = await boardApi.getAll();
        const mapped = (res.boards || []).map(mapBoard);
        setBoards(mapped);

        // har board ke columns/tasks count fetch karo (parallel)
        const colCounts: Record<string, number> = {};
        const taskCounts: Record<string, number> = {};

        await Promise.all(
          mapped.map(async (b: Board) => {
            try {
              const [colsRes, tasksRes] = await Promise.all([
                columnApi.getByBoard(b.id),
                taskApi.getByBoard(b.id),
              ]);
              colCounts[b.id] = (colsRes.columns || []).length;
              taskCounts[b.id] = (tasksRes.tasks || []).length;
            } catch {
              colCounts[b.id] = 0;
              taskCounts[b.id] = 0;
            }
          })
        );

        setBoardColumnCounts(colCounts);
        setBoardTaskCounts(taskCounts);
      } else {
        // Single BOARD detail page
        const boardRes = await boardApi.getById(boardId);
        setCurrentBoard(mapBoard(boardRes.board));

        const [colsRes, tasksRes] = await Promise.all([
          columnApi.getByBoard(boardId),
          taskApi.getByBoard(boardId),
        ]);

        const mappedTasks = (tasksRes.tasks || []).map(mapTask);
        const mappedColumns = (colsRes.columns || [])
          .map((c: any) => mapColumn(c, mappedTasks))
          .sort((a: Column, b: Column) => a.order - b.order);

        setColumns(mappedColumns);
      }
    } catch (error: unknown) {
      console.error("Error:", error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  // ---------- BOARD actions ----------
  const addBoard = async (boardName: string) => {
    try {
      await boardApi.create({ title: boardName });
      await fetchBoardData();
    } catch (error: any) {
      console.error("Error adding board:", error);
      alert("Failed to add board. Please try again. " + error.message);
    }
  };

  const updateBoard = async (id: string, newName: string) => {
    try {
      await boardApi.update(id, { title: newName });
      await fetchBoardData();
    } catch (error: any) {
      console.error("Error updating board:", error);
      alert("Failed to update board. Please try again. " + error.message);
    }
  };

  const deleteBoard = async (id: string) => {
    try {
      await boardApi.delete(id);
      await fetchBoardData();
    } catch (error: any) {
      console.error("Error deleting board:", error);
      alert("Failed to delete board. Please try again. " + error.message);
    }
  };

  const pinBoard = async (id: string, pinned: boolean) => {
    try {
      await boardApi.pin(id, pinned);
      await fetchBoardData();
    } catch (error: any) {
      console.error("Error pinning board:", error);
      alert("Failed to pin board. Please try again. " + error.message);
    }
  };

  // ---------- COLUMN actions ----------
  const addColumn = async (columnName: string) => {
    try {
      await columnApi.create({ name: columnName, boardId });
      await fetchBoardData();
    } catch (error: any) {
      console.error("Error adding column:", error);
      alert("Failed to add column. Please try again. " + error.message);
    }
  };

  const updateColumn = async (columnId: string, newName: string) => {
    try {
      await columnApi.update(columnId, { name: newName });
      await fetchBoardData();
    } catch (error: any) {
      console.error("Error updating column:", error);
      alert("Failed to update column. Please try again. " + error.message);
    }
  };

  const deleteColumns = async (columnId: string) => {
    try {
      await columnApi.delete(columnId);
      await fetchBoardData();
    } catch (error: any) {
      console.error("Error deleting column:", error);
      alert("Failed to delete column. Please try again. " + error.message);
    }
  };

  // ---------- TASK actions ----------
  const addTask = async (
    columnId: string,
    title: string,
    description: string,
    assignee: string,
    dueDate: string
  ) => {
    try {
      await taskApi.create({
        title,
        description,
        assignee,
        dueDate,
        columnId,
        boardId,
      });
      await fetchBoardData();
    } catch (error: any) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Please try again. " + error.message);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await taskApi.delete(taskId);
      await fetchBoardData();
    } catch (error: any) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again. " + error.message);
    }
  };

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
