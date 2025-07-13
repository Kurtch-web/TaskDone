import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/Task';

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTask: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const load = async () => {
      const json = await AsyncStorage.getItem('@tasks');
      if (json) setTasks(JSON.parse(json));
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => setTasks(prev => [...prev, task]);
  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));
  const toggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };
  const editTask = (updated: Task) =>
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleComplete, editTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
