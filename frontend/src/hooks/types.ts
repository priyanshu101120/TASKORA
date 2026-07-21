export interface Task {
  id: string;
  title: string;
  description: string;
  column_id: string;
  board_id: string;
  assignee: string;
  due_date: string;
}

export interface TaskResponse {
  _id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;      
  column: string;       
  board: string;       
}

export interface Column {
  id: string;
  name: string;
  column_name: string;
  board_id: string;
  order: number;
  task?: Task[]; // Formatted data ke liye
}
export interface ColumnResponse {
  _id: string;
  name: string;
  column_name: string;
  board: string;
  order: number;  
  task: Task[];
}

export interface Board {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  is_pinned: boolean;
  owner: string;
}
export interface BoardResponse {
  _id: string;
  title: string;
  is_pinned?: boolean;
  createdAt: string;
  owner: string;
}
export interface Plan {
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  features: string[];
  button: string;
  highlight?: boolean;
}
export type BoardsProps = {
  initials: string;
};

export type MyBoardStatsProps = {
  loading: boolean;
  boards: Board[];
};
export const getRelativeTime = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "Never";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
