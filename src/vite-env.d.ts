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
  redefined_time: string;
  started_at: string | null;
  finish_in: string | null;
  completed_at: string | null;
  remaining_time: string | null;
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

export interface DeleteTaskResponse {
  deleteTask: Task;
}

export interface ReorderTaskResponse {
  reorderTasks: Task[];
}

export interface Stats {
  completed: number;
  todo: number;
  inProgress: number;
  focusedTime: string | number;
}

export interface UpdateTaskInput {
  id: number;
  name?: string;
  description?: string;
  status?: "todo" | "in_progress" | "paused" | "continuing" | "completed";
  defined_time?: string;
  redefined_time?: string;
  remaining_time?: string | null;
  started_at?: number | null;
  finish_in?: number | null;
  completed_at?: number | null;
  paused_in?: number | null;
  list_number?: number;
}

export interface CreateTaskInput {
  name: string;
  description: string;
  defined_time: string;
  redefined_time: string;
}

export interface NewOrderInput {
  id: number;
  list_number: number;
}

export interface TaskCategories {
  short: number;
  medium: number;
  long: number;
}

export interface DayCount {
  date: string;
  count: number;
}

export interface WeekStats {
  weekStart: string;
  days: DayCount[];
}

export interface TaskStats {
  shortestTask: Task;
  longestTask: Task;
  averageCompletionTime: number;
  taskCategories: TaskCategories;
  tasksCompletedByWeek: WeekStats[];
}

export interface TasksStatsResponse {
  getStats: TaskStats;
}
