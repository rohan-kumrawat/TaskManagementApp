import { useState } from 'react';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard.tsx';
import TaskModal from './components/TaskModal';
import type { Task } from './types/index.ts';
import { initialTasks, teamMembers, columns } from './data/mockData';

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Task['status']>('todo');

  const handleAddTask = (status?: Task['status']) => {
    setSelectedStatus(status || 'todo');
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // Edit existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      ));
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title || '',
        description: taskData.description || '',
        status: selectedStatus,
        priority: taskData.priority || 'medium',
        assignee: taskData.assignee,
        dueDate: taskData.dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: taskData.tags || []
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleMoveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        onAddTask={() => handleAddTask()}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        teamMembers={teamMembers}
      />
      
      <TaskBoard
        tasks={tasks}
        columns={columns}
        onAddTask={handleAddTask}
        onEditTask={handleEditTask}
        onMoveTask={handleMoveTask}
        searchQuery={searchQuery}
      />

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        task={editingTask}
        teamMembers={teamMembers}
      />
    </div>
  );
}

export default App;