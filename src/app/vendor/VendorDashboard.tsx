import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Star,
  Calendar,
  Package,
  Clock,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react';
import { vendorDashboardData } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function VendorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'availability' | 'orders' | 'finance'>('overview');
  const data = vendorDashboardData;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'orders', label: 'Orders', icon: Clock },
    { id: 'finance', label: 'Finance & Ratings', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-gray-900">Vendor Dashboard</h1>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-teal-600 hover:text-teal-700"
            >
              Switch to Client View
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8 p-2">
          <div className="flex gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg whitespace-nowrap transition-colors ${
                    activeTab === item.id
                      ? 'bg-teal-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {[
                {
                  label: "Today's Orders",
                  value: data.todayOrders,
                  icon: Calendar,
                  color: 'text-blue-600',
                  bg: 'bg-blue-100',
                },
                {
                  label: 'Monthly Revenue',
                  value: `$${data.monthlyRevenue}`,
                  icon: DollarSign,
                  color: 'text-green-600',
                  bg: 'bg-green-100',
                },
                {
                  label: 'Average Rating',
                  value: data.averageRating.toFixed(1),
                  icon: Star,
                  color: 'text-amber-600',
                  bg: 'bg-amber-100',
                },
                {
                  label: 'Total Bookings',
                  value: data.totalBookings,
                  icon: Users,
                  color: 'text-teal-600',
                  bg: 'bg-teal-100',
                },
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-md">
                    <div className={`w-12 h-12 rounded-xl ${kpi.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${kpi.color}`} />
                    </div>
                    <div className="text-3xl mb-1">{kpi.value}</div>
                    <div className="text-gray-600">{kpi.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
              <h3 className="mb-6">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.monthlyStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="mb-6">Recent Orders</h3>
              <div className="space-y-4">
                {data.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-teal-500 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span>{order.id}</span>
                        <StatusBadge status={order.status} size="sm" />
                      </div>
                      <div className="text-gray-600">{order.customer} • {order.service}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl text-teal-600 mb-1">${order.amount}</div>
                      <div className="text-sm text-gray-500">{order.date} • {order.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2>Manage Services</h2>
              <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                + Add Service
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Service Name</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Duration</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Exterior Wash', price: 15, duration: 30, status: 'Active' },
                    { name: 'Full Detail', price: 89, duration: 120, status: 'Active' },
                    { name: 'Interior Clean', price: 45, duration: 60, status: 'Active' },
                  ].map((service, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">{service.name}</td>
                      <td className="py-4 px-4">${service.price}</td>
                      <td className="py-4 px-4">{service.duration} min</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {service.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-teal-600 hover:text-teal-700 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="mb-6">Weekly Schedule</h2>
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3>{day}</h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked={day !== 'Sunday'} className="w-5 h-5 accent-teal-600" />
                      <span className="text-sm text-gray-600">Available</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
                      <button
                        key={time}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:border-teal-500 hover:bg-teal-50 transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl p-8 shadow-md">
            <h2 className="mb-6">All Orders</h2>
            <div className="flex gap-2 mb-6">
              {['All', 'New', 'In Progress', 'Completed'].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {data.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span>{order.id}</span>
                      <StatusBadge status={order.status} />
                    </div>
                    <div className="text-gray-600">{order.customer} • {order.service}</div>
                    <div className="text-sm text-gray-500 mt-1">{order.date} at {order.time}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl text-teal-600">${order.amount}</div>
                    <button className="mt-2 text-sm text-teal-600 hover:text-teal-700">View Details →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Finance Tab */}
        {activeTab === 'finance' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="mb-4">Revenue Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month</span>
                    <span className="text-2xl text-teal-600">${data.monthlyRevenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Month</span>
                    <span className="text-xl">$3,200</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Growth</span>
                    <span>+11.5%</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="mb-4">Rating Distribution</h3>
                <div className="space-y-2">
                  {data.ratingDistribution.map((rating) => (
                    <div key={rating.stars} className="flex items-center gap-3">
                      <span className="w-12">{rating.stars} ★</span>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${(rating.count / 124) * 100}%` }}
                        />
                      </div>
                      <span className="w-12 text-right text-sm text-gray-600">{rating.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Area */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="mb-6">Service Area</h3>
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-12 h-12 text-gray-400" />
                <span className="ml-2 text-gray-500">Map View</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-2">Service Radius</label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    defaultValue="15"
                    className="w-full accent-teal-600"
                  />
                  <div className="text-sm text-gray-600 mt-1">15 km radius</div>
                </div>
                <button className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                  Update Area
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
