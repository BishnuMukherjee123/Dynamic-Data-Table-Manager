
import type { User, Column } from '../types/index';

export const INITIAL_USERS: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', age: 28, role: 'Developer', department: 'Engineering', location: 'New York' },
  { id: 2, name: 'Bob Smith', email: 'bob.s@example.com', age: 34, role: 'Project Manager', department: 'Management', location: 'London' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', age: 22, role: 'Designer', department: 'Creative', location: 'Paris' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', age: 31, role: 'HR Specialist', department: 'Human Resources', location: 'Tokyo' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan.h@example.com', age: 45, role: 'CEO', department: 'Executive', location: 'New York' },
  { id: 6, name: 'Fiona Glenanne', email: 'fiona.g@example.com', age: 30, role: 'QA Engineer', department: 'Engineering', location: 'Berlin' },
  { id: 7, name: 'George Costanza', email: 'george.c@example.com', age: 41, role: 'Sales Rep', department: 'Sales', location: 'Chicago' },
  { id: 8, name: 'Hannah Montana', email: 'hannah.m@example.com', age: 25, role: 'Marketing', department: 'Marketing', location: 'Los Angeles' },
  { id: 9, name: 'Ian Malcolm', email: 'ian.m@example.com', age: 52, role: 'Consultant', department: 'Strategy', location: 'Austin' },
  { id: 10, name: 'Jane Doe', email: 'jane.d@example.com', age: 29, role: 'Data Analyst', department: 'Analytics', location: 'San Francisco' },
  { id: 11, name: 'Kramer', email: 'kramer@example.com', age: 48, role: 'Intern', department: 'Various', location: 'New York' },
  { id: 12, name: 'Liz Lemon', email: 'liz.l@example.com', age: 38, role: 'Lead Writer', department: 'Creative', location: 'New York' },
];

export const INITIAL_COLUMNS: Column[] = [
  { key: 'name', label: 'Name', visible: true, sortable: true },
  { key: 'email', label: 'Email', visible: true, sortable: true },
  { key: 'age', label: 'Age', visible: true, sortable: true },
  { key: 'role', label: 'Role', visible: true, sortable: true },
  { key: 'department', label: 'Department', visible: false, sortable: true },
  { key: 'location', label: 'Location', visible: false, sortable: true },
];
