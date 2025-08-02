import React from 'react';
import type { Column, Task } from '../types/index.ts';
import TaskCard from './TaskCard';
import { Plus, MoreHorizontal } from 'lucide-react';

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask: (status: Column['status']) => void;
  onEditTask: (task: Task) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: Column['status']) => void;
  isDragOver?: boolean;
  draggingTaskId?: string | null;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDragStart,
  onDragOver,
  onDrop,
  isDragOver = false,
  draggingTaskId
}) => {
  const isAtLimit = column.limit && tasks.length >= column.limit;

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl p-4 min-w-80">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <h2 className="font-semibold text-gray-900">{column.title}</h2>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
            {tasks.length}
            {column.limit && `/${column.limit}`}
          </span>
        </div>
        <button className="p-1 rounded-md hover:bg-gray-200 transition-colors">
          <MoreHorizontal size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => onAddTask(column.status)}
        disabled={isAtLimit}
        className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 border-dashed mb-4 transition-all duration-200 ${
          isAtLimit
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'
        }`}
      >
        <Plus size={16} />
        <span className="text-sm font-medium">Add Task</span>
      </button>

      {/* Tasks Container */}
      <div
        className={`flex-1 space-y-3 transition-all duration-200 ${
          isDragOver ? 'bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-2' : ''
        }`}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, column.status)}
      >
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
            className="transition-transform duration-200"
          >
            <TaskCard
              task={task}
              onEdit={onEditTask}
              isDragging={draggingTaskId === task.id}
            />
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
            No tasks yet
          </div>
        )}
      </div>

      {/* Column Footer */}
      {isAtLimit && (
        <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-700 text-center">
            Column limit reached ({column.limit} tasks)
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskColumn;