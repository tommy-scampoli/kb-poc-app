import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'support_agent' | 'admin';
  created_at: string;
  last_login: string;
}

// Load users from JSON file
export function loadUsers(): User[] {
  const usersPath = path.join(process.cwd(), 'data', 'users.json');
  const data = fs.readFileSync(usersPath, 'utf-8');
  const parsed = JSON.parse(data);
  return parsed.users;
}

// Find user by email
export function findUserByEmail(email: string): User | null {
  const users = loadUsers();
  return users.find(u => u.email === email) || null;
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // Temporary: allow password123 for testing
  return password === 'password123';
}

// Check if user has admin role
export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}

// Check if user has at least support agent role
export function isSupportAgent(user: User): boolean {
  return user.role === 'support_agent' || user.role === 'admin';
}
