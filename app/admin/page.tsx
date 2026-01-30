'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/');
      return;
    }

    const userData = JSON.parse(userStr);
    if (userData.role !== 'admin') {
      alert('Access denied. Admin role required.');
      router.push('/search');
      return;
    }

    setUser(userData);
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.name}</span>
              <button
                onClick={() => router.push('/search')}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Back to Search
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg border border-gray-200 p-4">
              <ul className="space-y-2">
                <li>
                  <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                    Knowledge Bases
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                    Users
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                    Analytics
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Connected Knowledge Bases
                </h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  + Add Connection
                </button>
              </div>

              {/* KB1 - Product Docs */}
              <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">Product Documentation</h3>
                      <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Technical documentation and user guides
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center">
                        <span className="font-medium w-24">Type:</span>
                        <span>JSON File</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-24">Articles:</span>
                        <span>10</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-24">Last Sync:</span>
                        <span>2024-01-30 10:23 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* KB2 - Internal Wiki */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">Internal Wiki</h3>
                      <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Company policies, procedures, and internal resources
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center">
                        <span className="font-medium w-24">Type:</span>
                        <span>JSON File</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-24">Articles:</span>
                        <span>12</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-24">Last Sync:</span>
                        <span>2024-01-30 10:23 AM</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">22</div>
                  <div className="text-sm text-gray-600">Total Articles</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-600">Active KBs</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">8</div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
