import type { Task, TeamMember, Column } from '../types/index.ts';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'Frontend Developer',
    color: '#3B82F6'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'UI/UX Designer',
    color: '#8B5CF6'
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'Backend Developer',
    color: '#14B8A6'
  },
  {
    id: '4',
    name: 'Emma Davis',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'Product Manager',
    color: '#F59E0B'
  }
];

export const columns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    status: 'todo',
    color: '#6B7280'
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    status: 'in-progress',
    color: '#3B82F6',
    limit: 3
  },
  {
    id: 'done',
    title: 'Done',
    status: 'done',
    color: '#10B981'
  }
];

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design Landing Page',
    description: 'Create wireframes and mockups for the new landing page with modern design principles',
    status: 'in-progress',
    priority: 'high',
    assignee: teamMembers[1],
    dueDate: '2025-01-15',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-12T14:30:00Z',
    tags: ['design', 'ui/ux', 'priority']
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up user authentication system with JWT tokens and secure password handling',
    status: 'todo',
    priority: 'high',
    assignee: teamMembers[2],
    dueDate: '2025-01-18',
    createdAt: '2025-01-11T09:15:00Z',
    updatedAt: '2025-01-11T09:15:00Z',
    tags: ['backend', 'security', 'api']
  },
  {
    id: '3',
    title: 'Mobile Responsive Design',
    description: 'Optimize the application for mobile devices and tablets with responsive breakpoints',
    status: 'todo',
    priority: 'medium',
    assignee: teamMembers[0],
    dueDate: '2025-01-20',
    createdAt: '2025-01-09T16:45:00Z',
    updatedAt: '2025-01-09T16:45:00Z',
    tags: ['frontend', 'responsive', 'css']
  },
  {
    id: '4',
    title: 'User Dashboard Analytics',
    description: 'Create comprehensive analytics dashboard with charts and performance metrics',
    status: 'done',
    priority: 'medium',
    assignee: teamMembers[0],
    createdAt: '2025-01-05T11:20:00Z',
    updatedAt: '2025-01-12T17:00:00Z',
    tags: ['frontend', 'analytics', 'charts']
  },
  {
    id: '5',
    title: 'API Integration Testing',
    description: 'Comprehensive testing of all API endpoints with automated test suites',
    status: 'in-progress',
    priority: 'medium',
    assignee: teamMembers[2],
    dueDate: '2025-01-16',
    createdAt: '2025-01-08T13:10:00Z',
    updatedAt: '2025-01-12T10:45:00Z',
    tags: ['testing', 'api', 'backend']
  },
  {
    id: '6',
    title: 'Product Roadmap Review',
    description: 'Quarterly review of product roadmap and feature prioritization with stakeholders',
    status: 'todo',
    priority: 'low',
    assignee: teamMembers[3],
    dueDate: '2025-01-25',
    createdAt: '2025-01-12T08:30:00Z',
    updatedAt: '2025-01-12T08:30:00Z',
    tags: ['planning', 'strategy', 'meeting']
  }
];