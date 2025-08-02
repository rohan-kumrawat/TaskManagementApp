import React, { useState, useMemo } from 'react';
import type { Task, Column } from '../types/index.ts';
import TaskColumn from './TaskColumn';

interface TaskBoardProps {
  tasks: Task[];
  columns: Column[];
  onAddTask: (status: Column['status']) => void;
  onEditTask: (task: Task) => void;
  onMoveTask: (taskId: string, newStatus: Task['status']) => void;
  searchQuery: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  columns,
  onAddTask,
  onEditTask,
  onMoveTask,
  searchQuery
}) => {
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;
    
    const query = searchQuery.toLowerCase();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.tags.some(tag => tag.toLowerCase().includes(query)) ||
      task.assignee?.name.toLowerCase().includes(query)
    );
  }, [tasks, searchQuery]);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
    setDraggingTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only clear if we're leaving the entire column area
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    onMoveTask(taskId, status);
    setDragOverColumn(null);
    setDraggingTaskId(null);
  };

  return (
    <div className="flex-1 p-6 overflow-x-auto">
      <div className="flex space-x-6 min-w-fit h-full">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(task => task.status === column.status);
          
          return (
            <div
              key={column.id}
              onDragEnter={(e) => handleDragEnter(e, column.id)}
              onDragLeave={handleDragLeave}
              className="flex-shrink-0"
            >
              <TaskColumn
                column={column}
                tasks={columnTasks}
                onAddTask={onAddTask}
                onEditTask={onEditTask}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragOver={dragOverColumn === column.id}
                draggingTaskId={draggingTaskId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;