/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: string;
  defined_time: string;
  started_at: string | null;
  completed_at: string | null;
  paused_in: string | null;
  list_number: number;
}

export interface GetAllTasksData {
  getAllTasks: Task[];
}
