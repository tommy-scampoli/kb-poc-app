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

              {/* KB1 - PUD Customer Service */}
              <div className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">PUD Customer Service KB</h3>
                      <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Customer service FAQs and account management
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
                        <span>2026-01-31 10:30 AM</span>
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

              {/* KB2 - PUD Policies */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">PUD Policies & Technical</h3>
                      <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Safety protocols and technical procedures
                    </p>
                    <div className="text-sm text-gray-500 space-y-1">
                      <div className="flex items-center">
                        <span className="font-medium w-24">Type:</span>
                        <span>JSON File</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-24">Articles:</span>
                        <span>15</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium w-24">Last Sync:</span>
                        <span>2026-01-31 10:30 AM</span>
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

              {/* Enhanced Stats with Search Metrics */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Analytics</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">27</div>
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

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-900">342</div>
                    <div className="text-sm text-blue-700">Searches This Month</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-900">8.2s</div>
                    <div className="text-sm text-green-700">Avg Search Time</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-900">89%</div>
                    <div className="text-sm text-purple-700">Search Success Rate</div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Most Searched Topics This Week</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">power outage</div>
                        <div className="text-xs text-gray-500">Outages & Safety</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">47</div>
                        <div className="text-xs text-gray-500">searches</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">billing payment</div>
                        <div className="text-xs text-gray-500">Billing & Payments</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">34</div>
                        <div className="text-xs text-gray-500">searches</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">advanced meter</div>
                        <div className="text-xs text-gray-500">Advanced Metering</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">28</div>
                        <div className="text-xs text-gray-500">searches</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">disconnect moratorium</div>
                        <div className="text-xs text-gray-500">Payment Assistance</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">21</div>
                        <div className="text-xs text-gray-500">searches</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">high bill</div>
                        <div className="text-xs text-gray-500">Energy Management</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">19</div>
                        <div className="text-xs text-gray-500">searches</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}