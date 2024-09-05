/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  status: "todo" | "in_progress" | "paused" | "continuing" | "completed";
  defined_time: string;
  started_at: string | null;
  completed_at: string | null;
  paused_in: string | null;
  list_number: number;
}

export interface GetAllTasksDataResponse {
  getAllTasks: Task[];
}

export interface UpdateTaskResponse {
  updateTask: Task;
}

export interface CreateTaskResponse {
  createTask: Task;
}

export interface ReorderTaskResponse {
  reorderTasks: Task[];
}

export interface Stats {
  completed: number;
  todo: number;
  inProgress: number;
  focusedTime: FocusedTime;
}

export interface FocusedTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface UpdateTaskInput {
  id: number;
  name?: string;
  description?: string;
  status?: "todo" | "in_progress" | "paused" | "continuing" | "completed";
  defined_time?: string;
  started_at?: number;
  completed_at?: string | null;
  paused_in?: number | null;
  list_number?: number;
}

export interface CreateTaskInput {
  name: string;
  description: string;
  defined_time: string;
}

export interface NewOrderInput {
  id: number;
  list_number: number;
}
