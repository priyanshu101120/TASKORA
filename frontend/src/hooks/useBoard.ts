"use client";
import { useParams } from "next/navigation";
import { Board, BoardResponse, Column, ColumnResponse, Task, TaskResponse } from "./types";
import { useCallback, useEffect, useState } from "react";
import { boardApi, columnApi, taskApi } from "@/lib/api";

const mapBoard = (b: BoardResponse): Board => ({
  id: b._id,
  name: b.title,
  is_pinned: b.is_pinned ?? false,
  created_at: b.createdAt,
  user_id: b.owner,
  owner: b.owner,
});

const mapColumn = (c: ColumnResponse, tasks: Task[]): Column => ({
  id: c._id,
  name: c.name,
  column_name: c.name.toLowerCase().replace(/\s+/g, "-"),
  board_id: c.board,
  order: c.order,
  task: tasks.filter((t) => t.column_id === c._id),
});

const mapTask = (t: TaskResponse): Task => ({
  id: t._id,
  title: t.title,
  description: t.description,
  assignee: t.assignee,
  due_date: t.dueDate,      
  column_id: t.column,      
  board_id: t.board,        
});

const UseBoard = () => {
  const params = useParams();
  const boardId = params?.boardId as string;

  const [columns, setColumns] = useState<Column[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [boardColumnCounts, setBoardColumnCounts] = useState<
    Record<string, number>
  >({});
  const [boardTaskCounts, setBoardTaskCounts] = useState<
    Record<string, number>
  >({});

  const fetchBoardData = useCallback(async () => {
    setLoading(true);
    try {
      if (!boardId || boardId === ":boardId") {
        const response = await boardApi.getAll();
        const boardMapped = (response.boards || []).map(mapBoard);
        setBoards(boardMapped);
        const columncounts: Record<string, number> = {};
        const taskcounts: Record<string, number> = {};
        await Promise.all(
          boardMapped.map(async (board: Board) => {
            try {
              const [columnresponse, taskresponse] = await Promise.all([
                columnApi.getByBoard(board.id),
                taskApi.getByBoard(board.id),
              ]);
              columncounts[board.id] = columnresponse.columns.length;
              taskcounts[board.id] = taskresponse.tasks.length;
            } catch {
              columncounts[board.id] = 0;
              taskcounts[board.id] = 0;
            }
          }),
        );

        setBoardColumnCounts(columncounts);
        setBoardTaskCounts(taskcounts);
      } else {
        const Boardresponse = await boardApi.getById(boardId);
        setCurrentBoard(mapBoard(Boardresponse.board));

        const [columnresponse, taskresponse] = await Promise.all([
          columnApi.getByBoard(boardId),
          taskApi.getByBoard(boardId),
        ]);

        const mappedTasks = (taskresponse.tasks || []).map(mapTask);
        const mappedColumns = columnresponse.columns
          .map((c: ColumnResponse) => {
            return mapColumn(c, mappedTasks);
          })
          .sort((a: Column, b: Column) => a.order - b.order);
        setColumns(mappedColumns);
      }
    } catch (error: unknown) {
      console.error(
        "Error:",
        error instanceof Error ? error.message : String(error),
      );
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  const addBoard = async (boardNmae: string) => {
    try {
      await boardApi.create({ title: boardNmae });
      await fetchBoardData();
    } catch (error: unknown) {
      console.error(
        "Error adding board:",
        error instanceof Error ? error.message : String(error),
      );
    }
  };

  const deleteBoard = async (id: string) => {
    try {
      await boardApi.delete(id);
      await fetchBoardData();
    } catch (error) {
      console.error(
        "error delete board",
        error instanceof Error ? error.message : String(error),
      );
    }
  };

  const updateBoard = async (id: string, newname: string) => {
    try {
      await boardApi.update(id, { title: newname });
      await fetchBoardData();
    } catch (error) {
      console.error(
        "error updating board",
        error instanceof Error ? error.message : String(error),
      );
    }
  };

  const pinBoard = async (boardId: string) => {
    try {
      await boardApi.pin(boardId, true);
      await fetchBoardData();
    } catch (error) {
      console.error(
        "error pinning board",
        error instanceof Error ? error.message : String(error),
      );
    }
  };

  const addColumn = async (columnName: string) => {
    try {
      await columnApi.create({ name: columnName, boardId });
      await fetchBoardData();
    } catch (error) {
      console.error("cannot create column", error);
    }
  };

  const deleteColumns = async (columnId: string) => {
    try {
      await columnApi.delete(columnId);
      await fetchBoardData();
    } catch (error) {
      console.error("cannot delete column", error);
    }
  };

  const updateColumn = async (columnId: string, newName: string) => {
    try {
      await columnApi.update(columnId, { name: newName });
      await fetchBoardData();
    } catch (error) {
      console.error("cannot update column", error);
    }
  };

  const addTask = async (
    columnId: string,
    title: string,
    description: string,
    assignee: string,
    dueDate: string,
  ) => {
    try {
      await taskApi.create({
        title,
        description,
        columnId,
        boardId,
        assignee,
        dueDate,
      });
      await fetchBoardData();
    } catch (error) {
      console.error("cannot add task", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await taskApi.delete(taskId);
      await fetchBoardData();
    } catch (error) {
      console.error("cannot delete task", error);
    }
  };
  useEffect(() => {
    fetchBoardData();
  }, [fetchBoardData]);

  return {
    boards,
    columns,
    currentBoard,
    loading,
    boardColumnCounts,
    boardTaskCounts,
    refresh: fetchBoardData,
    addBoard,
    addTask,
    addColumn,
    updateColumn,
    pinBoard,
    deleteBoard,
    deleteTask,
    deleteColumns,
    updateBoard,
  };
};

export default UseBoard;
