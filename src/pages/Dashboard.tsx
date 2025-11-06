import { Plus, ArrowUpRight } from 'lucide-react'
import Layout from '../components/Layout'

function Dashboard() {
  return (
    <Layout>
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="mb-4 lg:mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Welcome, Wings Suite!</h1>
            <p className="text-sm lg:text-base text-gray-600">Manage Feast Of Esther 2026 accommodation bookings and reservations efficiently.</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-4 lg:p-6 text-white">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div>
                  <p className="text-pink-100 text-xs lg:text-sm mb-1">Total Accommodation</p>
                  <p className="text-2xl lg:text-3xl font-bold">48</p>
                </div>
                <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 opacity-80 flex-shrink-0" />
              </div>
              <p className="text-xs text-pink-100">8 rooms available</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-900 text-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div>
                  <p className="text-gray-100 text-xs lg:text-sm mb-1">Total Reservations</p>
                  <p className="text-2xl lg:text-3xl font-bold">156</p>
                </div>
                <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-100 flex-shrink-0" />
              </div>
              <p className="text-xs text-gray-100">12 new this week</p>
            </div>
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div>
                  <p className="text-gray-500 text-xs lg:text-sm mb-1">Slot Left</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">24</p>
                </div>
                <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 flex-shrink-0" />
              </div>
              <p className="text-xs text-gray-500">Available this month</p>
            </div>
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div>
                  <p className="text-gray-500 text-xs lg:text-sm mb-1">Occupied</p>
                  <p className="text-2xl lg:text-3xl font-bold text-gray-900">40</p>
                </div>
                <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 flex-shrink-0" />
              </div>
              <p className="text-xs text-gray-500">Currently booked</p>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 lg:mb-6">
            {/* Demography - Days & Booking */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200 lg:col-span-2">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Demography - Days & Booking</h3>
              <div className="flex items-end justify-between h-48 lg:h-64 gap-2 lg:gap-3 overflow-x-auto pb-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                  const bookingCounts = [45, 62, 58, 71, 89, 95, 78]
                  const maxBooking = 100
                  const height = (bookingCounts[idx] / maxBooking) * 100
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center">
                      <div className="relative w-full flex items-end justify-center mb-2">
                        <div className="w-full rounded-t-lg bg-gradient-to-t from-pink-600 to-pink-400" style={{ height: `${height}%` }}>
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap">
                            {bookingCounts[idx]}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{day}</span>
                    </div>
                  )
                })}
              </div>
              <div className="mt-3 lg:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs lg:text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-gray-600">Bookings per day</span>
                </div>
                <span className="text-gray-500">Last 7 days</span>
              </div>
            </div>

            {/* Recent Reservations */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">Recent Reservations</h3>
                <button className="p-1.5 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors">
                  <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              </div>
              <div className="space-y-2 lg:space-y-3">
                {[
                  { guest: 'John Smith', room: 'Room 101', checkIn: 'Nov 26, 2024', status: 'Confirmed' },
                  { guest: 'Sarah Johnson', room: 'Room 205', checkIn: 'Nov 28, 2024', status: 'Pending' },
                  { guest: 'Michael Brown', room: 'Room 312', checkIn: 'Nov 30, 2024', status: 'Confirmed' },
                  { guest: 'Emily Davis', room: 'Room 108', checkIn: 'Dec 2, 2024', status: 'Confirmed' },
                  { guest: 'David Wilson', room: 'Room 301', checkIn: 'Dec 5, 2024', status: 'Pending' },
                ].map((reservation, idx) => (
                  <div key={idx} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{reservation.guest}</p>
                        <p className="text-xs text-gray-500">{reservation.room}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        reservation.status === 'Confirmed' 
                          ? 'bg-pink-100 text-pink-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {reservation.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Check-in: {reservation.checkIn}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Third Row - Recent Reservations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Recent Reservations - Detailed */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200 lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 lg:mb-4">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900">Recent Reservations</h3>
                <button className="text-xs lg:text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1">
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4" />
                  New Reservation
                </button>
              </div>
              <div className="space-y-2 lg:space-y-3">
                {[
                  { 
                    guest: 'John Smith', 
                    email: 'john.smith@email.com',
                    room: 'Room 101 - Deluxe Suite', 
                    checkIn: 'Nov 26, 2024', 
                    checkOut: 'Nov 30, 2024',
                    guests: 2,
                    status: 'Confirmed',
                    color: 'bg-pink-500'
                  },
                  { 
                    guest: 'Sarah Johnson', 
                    email: 'sarah.j@email.com',
                    room: 'Room 205 - Standard', 
                    checkIn: 'Nov 28, 2024', 
                    checkOut: 'Dec 2, 2024',
                    guests: 1,
                    status: 'Pending',
                    color: 'bg-pink-400'
                  },
                  { 
                    guest: 'Michael Brown', 
                    email: 'm.brown@email.com',
                    room: 'Room 312 - Premium', 
                    checkIn: 'Nov 30, 2024', 
                    checkOut: 'Dec 5, 2024',
                    guests: 3,
                    status: 'Confirmed',
                    color: 'bg-pink-500'
                  },
                  { 
                    guest: 'Emily Davis', 
                    email: 'emily.d@email.com',
                    room: 'Room 108 - Deluxe', 
                    checkIn: 'Dec 2, 2024', 
                    checkOut: 'Dec 6, 2024',
                    guests: 2,
                    status: 'Confirmed',
                    color: 'bg-pink-500'
                  },
                ].map((reservation, idx) => (
                  <div key={idx} className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full ${reservation.color} flex items-center justify-center text-white font-semibold text-xs lg:text-sm flex-shrink-0`}>
                      {reservation.guest.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{reservation.guest}</p>
                          <p className="text-xs text-gray-500 truncate">{reservation.email}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          reservation.status === 'Confirmed' 
                            ? 'bg-pink-100 text-pink-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {reservation.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-1 truncate">{reservation.room}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-500">
                        <span>Check-in: {reservation.checkIn}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>Check-out: {reservation.checkOut}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{reservation.guests} guest(s)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:gap-4">
                <div className="p-3 lg:p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">156</p>
                  <p className="text-xs lg:text-sm text-gray-600">Total Reservations</p>
                </div>
                <div className="p-3 lg:p-4 bg-gray-50 rounded-lg">
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">48</p>
                  <p className="text-xs lg:text-sm text-gray-600">Total Rooms</p>
                </div>
                <div className="p-3 lg:p-4 bg-gray-50 rounded-lg">
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">83%</p>
                  <p className="text-xs lg:text-sm text-gray-600">Occupancy Rate</p>
                </div>
                <div className="p-3 lg:p-4 bg-gray-50 rounded-lg">
                  <p className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">24</p>
                  <p className="text-xs lg:text-sm text-gray-600">Available Slots</p>
                </div>
              </div>
            </div>
          </div>
        </main>
    </Layout>
  )
}

export default Dashboard

