"use client";
import { useState } from "react";
import { Board, Column, Task } from "./types";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `You are TaskoraAI, a smart productivity assistant built into Taskora — a kanban-style task management app.

You can help users:
1. Suggest tasks for their boards based on their goal
2. Generate task descriptions
3. Summarize their board progress
4. Answer general productivity questions

Always be concise, friendly, and actionable. Format lists with bullet points.
When suggesting tasks, always give 3-5 specific, actionable tasks.`;

const useAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  const sendMessage = async (userMessage: string): Promise<string> => {
    setLoading(true);
    setError(null);

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(newMessages);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages,
          ],
        }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      
     const aiReply: string =
  typeof data.output === "string"
    ? data.output
    : data.output?.[0]?.choices?.[0]?.message?.content ||
      data.output?.[0]?.message?.content ||
      JSON.stringify(data.output) ||
      "Sorry, I couldn't understand the response.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: aiReply },
      ]);

      return aiReply;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Sorry, I couldn't understand the response.";
      setError(msg);
      return msg;
    } finally {
      setLoading(false);
    }
  };

  
  const suggestTasks = async (boardName: string, columns: Column[]) => {
    const columnNames = columns.map((c) => c.column_name).join(", ");
    const prompt = `My board is called "${boardName}" with columns: ${columnNames}. 
Suggest 5 specific tasks I should add to this board. For each task give:
- Task title (short)
- Which column it belongs to
- Brief description (1 line)`;
    return sendMessage(prompt);
  };

  
  const generateTaskDescription = async (taskTitle: string) => {
    const prompt = `Generate a clear, actionable description for this task: "${taskTitle}"
Keep it under 2 sentences. Be specific and practical.`;
    return sendMessage(prompt);
  };

 
  const summarizeBoard = async (board: Board, columns: Column[]) => {
    const taskDetails = columns
      .map((col) => {
        const tasks = col.task || [];
        return `${col.column_name}: ${tasks.length} tasks (${tasks.map((t: Task) => t.title).join(", ") || "empty"})`;
      })
      .join("\n");

    const prompt = `Summarize the progress of my board "${board.name}":
${taskDetails}

Give me:
1. Overall progress assessment
2. Which column needs attention
3. One actionable suggestion`;
    return sendMessage(prompt);
  };

  
  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    suggestTasks,
    generateTaskDescription,
    summarizeBoard,
    clearChat,
  };
};

export default useAI;