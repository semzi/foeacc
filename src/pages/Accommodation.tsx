import { useState } from 'react'
import { Plus, Search, Bed, CheckCircle, Clock, Package } from 'lucide-react'
import Layout from '../components/Layout'

interface AccommodationType {
  id: number
  name: string
  totalAvailable: number
  booked: number
  pending: number
  price: number
}

// Demo data
const accommodationTypes: AccommodationType[] = [
  { id: 1, name: 'Standard Room', totalAvailable: 20, booked: 12, pending: 3, price: 150 },
  { id: 2, name: 'Deluxe Room', totalAvailable: 15, booked: 8, pending: 2, price: 220 },
  { id: 3, name: 'Deluxe Suite', totalAvailable: 10, booked: 6, pending: 1, price: 350 },
  { id: 4, name: 'Premium Suite', totalAvailable: 8, booked: 5, pending: 2, price: 450 },
  { id: 5, name: 'Executive Suite', totalAvailable: 5, booked: 3, pending: 1, price: 550 },
  { id: 6, name: 'Presidential Suite', totalAvailable: 2, booked: 1, pending: 0, price: 800 },
]

function Accommodation() {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter accommodation types based on search
  const filteredAccommodations = accommodationTypes.filter(accommodation =>
    accommodation.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getAvailableCount = (accommodation: AccommodationType) => {
    return accommodation.totalAvailable - accommodation.booked - accommodation.pending
  }

  const getOccupancyRate = (accommodation: AccommodationType) => {
    return Math.round((accommodation.booked / accommodation.totalAvailable) * 100)
  }

  return (
    <Layout>
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Accommodation</h1>
              <p className="text-gray-600">Manage accommodation types and availability</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Accommodation Type
            </button>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search accommodation type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Accommodation Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Available</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Booked</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Pending</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Available</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Occupancy Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price/Night</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAccommodations.map((accommodation) => {
                    const available = getAvailableCount(accommodation)
                    const occupancyRate = getOccupancyRate(accommodation)
                    return (
                      <tr key={accommodation.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                              <Bed className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{accommodation.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900 font-medium">{accommodation.totalAvailable}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-900 font-medium">{accommodation.booked}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-gray-900 font-medium">{accommodation.pending}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${
                            available > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {available}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all"
                                style={{ width: `${occupancyRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 min-w-[3rem]">{occupancyRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-gray-900">${accommodation.price}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredAccommodations.map((accommodation) => {
              const available = getAvailableCount(accommodation)
              const occupancyRate = getOccupancyRate(accommodation)
              return (
                <div key={accommodation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                        <Bed className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{accommodation.name}</h3>
                        <p className="text-sm text-gray-600">${accommodation.price}/night</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="w-4 h-4 text-gray-400" />
                        <p className="text-xs font-semibold text-gray-500 uppercase">Total Available</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{accommodation.totalAvailable}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <p className="text-xs font-semibold text-gray-500 uppercase">Booked</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{accommodation.booked}</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <p className="text-xs font-semibold text-gray-500 uppercase">Pending</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{accommodation.pending}</p>
                    </div>
                    <div className={`rounded-lg p-3 ${available > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <Package className={`w-4 h-4 ${available > 0 ? 'text-green-500' : 'text-red-500'}`} />
                        <p className="text-xs font-semibold text-gray-500 uppercase">Available</p>
                      </div>
                      <p className={`text-2xl font-bold ${available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {available}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Occupancy Rate</span>
                      <span className="text-sm font-semibold text-gray-900">{occupancyRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-b from-purple-200 to-purple-900 h-2 rounded-full transition-all"
                        style={{ width: `${occupancyRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Summary Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-pink-100 text-sm">Total Accommodations</p>
                <Package className="w-5 h-5 opacity-80" />
              </div>
              <p className="text-3xl font-bold">
                {accommodationTypes.reduce((sum, acc) => sum + acc.totalAvailable, 0)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 text-sm">Total Booked</p>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {accommodationTypes.reduce((sum, acc) => sum + acc.booked, 0)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 text-sm">Total Pending</p>
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {accommodationTypes.reduce((sum, acc) => sum + acc.pending, 0)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 text-sm">Total Available</p>
                <Package className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-green-600">
                {accommodationTypes.reduce((sum, acc) => sum + getAvailableCount(acc), 0)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Accommodation

