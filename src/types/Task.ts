export type Priority = 'Low' | 'Medium' | 'High';
export type TaskType = 'Single' | 'Series';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  category: string;
  type: TaskType;
  completed: boolean;
  subtasks?: SubTask[];
}
