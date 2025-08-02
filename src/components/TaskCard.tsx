import React from 'react';
import type { Task } from '../types/index.ts';
import { Calendar, User, Tag, AlertCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  isDragging?: boolean;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200'
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, isDragging = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 cursor-pointer 
        hover:shadow-md hover:border-gray-300 transition-all duration-200 
        transform hover:-translate-y-0.5 group
        ${isDragging ? 'rotate-3 scale-105 shadow-lg' : ''}
      `}
      onClick={() => onEdit(task)}
    >
      {/* Priority Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        {isOverdue && (
          <div className="flex items-center text-red-500">
            <AlertCircle size={14} />
          </div>
        )}
      </div>

      {/* Task Title */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {task.title}
      </h3>

      {/* Task Description */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
        {task.description}
      </p>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
            >
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{task.tags.length - 3} more</span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        {/* Assignee */}
        {task.assignee && (
          <div className="flex items-center space-x-2">
            <img
              src={task.assignee.avatar}
              alt={task.assignee.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-gray-600 font-medium">{task.assignee.name.split(' ')[0]}</span>
          </div>
        )}

        {/* Due Date */}
        {task.dueDate && (
          <div className={`flex items-center space-x-1 text-xs ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
            <Calendar size={12} />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;