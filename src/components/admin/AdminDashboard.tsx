import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Users, BookOpen, TrendingUp, Settings, LogOut, Shield } from 'lucide-react';
import { UserRole } from '../../types';
import { useNavigate } from 'react-router-dom';

type TabType = 'overview' | 'users' | 'courses' | 'settings';

export function AdminDashboard() {
  const { currentUser, getAllUsers, courses, updateUserRole, logout } = useApp();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) return null;

  const allUsers = getAllUsers();
  const totalStudents = allUsers.filter(u => u.role === 'learner').length;
  const totalInstructors = allUsers.filter(u => u.role === 'instructor').length;
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(c => c.published).length;

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: TrendingUp },
    { id: 'users' as TabType, label: 'User Management', icon: Users },
    { id: 'courses' as TabType, label: 'Course Management', icon: BookOpen },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F1F2F4]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-[#6E5B6A]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6E5B6A] rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-[#202732]" style={{ fontFamily: 'Caveat, cursive', fontWeight: 600 }}>
                  Learn Sphere Admin
                </h1>
                <p className="text-sm text-[#9AACB6]">Full System Access</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-[#202732]">{currentUser.name}</p>
                <p className="text-sm text-[#9AACB6]">{currentUser.email}</p>
              </div>
              {currentUser.avatar && (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full" />
              )}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-[#F1F2F4] rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-[#9AACB6]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                    isActive
                      ? 'border-[#6E5B6A] text-[#6E5B6A]'
                      : 'border-transparent text-[#9AACB6] hover:text-[#202732]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <OverviewTab
            totalStudents={totalStudents}
            totalInstructors={totalInstructors}
            totalCourses={totalCourses}
            publishedCourses={publishedCourses}
          />
        )}
        {activeTab === 'users' && <UsersTab users={allUsers} onUpdateRole={updateUserRole} />}
        {activeTab === 'courses' && <CoursesTab courses={courses} />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
}

function OverviewTab({ 
  totalStudents, 
  totalInstructors, 
  totalCourses, 
  publishedCourses 
}: {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  publishedCourses: number;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#202732]">Platform Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Students" value={totalStudents} color="bg-blue-500" />
        <StatCard label="Total Instructors" value={totalInstructors} color="bg-purple-500" />
        <StatCard label="Total Courses" value={totalCourses} color="bg-[#6E5B6A]" />
        <StatCard label="Published Courses" value={publishedCourses} color="bg-green-500" />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-[#202732] mb-4">Recent Activity</h3>
        <p className="text-[#9AACB6]">Activity feed would be displayed here showing recent enrollments, course publications, user registrations, etc.</p>
      </div>
    </div>
  );
}

function UsersTab({ users, onUpdateRole }: { users: any[]; onUpdateRole: (userId: string, role: UserRole) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#202732]">User Management</h2>
        <div className="text-sm text-[#9AACB6]">Total Users: {users.length}</div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F1F2F4]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#202732]">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#202732]">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#202732]">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#202732]">Points</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[#202732]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-[#F1F2F4] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {user.avatar && (
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                    )}
                    <span className="font-medium text-[#202732]">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#9AACB6]">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) => onUpdateRole(user.id, e.target.value as UserRole)}
                    className="px-3 py-1 bg-[#F1F2F4] rounded-lg text-[#202732] capitalize focus:outline-none focus:ring-2 focus:ring-[#6E5B6A]"
                  >
                    <option value="learner">Learner</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-[#9AACB6]">{user.points}</td>
                <td className="px-6 py-4">
                  <button className="text-sm text-[#6E5B6A] hover:text-[#5a4a56] transition-colors">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CoursesTab({ courses }: { courses: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#202732]">Course Management</h2>
        <div className="text-sm text-[#9AACB6]">Total Courses: {courses.length}</div>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            className="bg-white rounded-2xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex gap-6">
              <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-[#202732] mb-1">{course.title}</h3>
                    <p className="text-sm text-[#9AACB6]">By {course.instructorName}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    course.published
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {course.published ? 'Published' : 'Draft'}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-[#9AACB6]">
                  <span>{course.category}</span>
                  <span>•</span>
                  <span className="capitalize">{course.level}</span>
                  <span>•</span>
                  <span>{course.studentsCount} students</span>
                  <span>•</span>
                  <span>{course.lessons.length} lessons</span>
                  <span>•</span>
                  <span>${course.price}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#202732]">Platform Settings</h2>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-[#202732] mb-4">General Settings</h3>
        <p className="text-[#9AACB6] mb-4">Configure platform-wide settings, payment methods, email templates, etc.</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#F1F2F4] rounded-lg">
            <div>
              <p className="font-medium text-[#202732]">User Registration</p>
              <p className="text-sm text-[#9AACB6]">Allow new users to register</p>
            </div>
            <button className="px-4 py-2 bg-[#6E5B6A] text-white rounded-lg">Enabled</button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[#F1F2F4] rounded-lg">
            <div>
              <p className="font-medium text-[#202732]">Course Approval</p>
              <p className="text-sm text-[#9AACB6]">Require admin approval for new courses</p>
            </div>
            <button className="px-4 py-2 bg-[#F1F2F4] text-[#202732] rounded-lg">Disabled</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-[#202732] mb-4">Reporting</h3>
        <p className="text-[#9AACB6] mb-4">Access detailed reports and analytics</p>
        <button className="px-6 py-3 bg-[#6E5B6A] text-white rounded-lg hover:bg-[#5a4a56] transition-colors">
          Generate Report
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
        <TrendingUp className="w-6 h-6 text-white" />
      </div>
      <p className="text-sm text-[#9AACB6] mb-2">{label}</p>
      <p className="text-3xl font-bold text-[#202732]">{value}</p>
    </motion.div>
  );
}
