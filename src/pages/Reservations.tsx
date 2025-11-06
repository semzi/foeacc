import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Search, Edit, Info, Trash2, X, Save } from 'lucide-react'
import Layout from '../components/Layout'

interface Reservation {
  id: number
  name: string
  email: string
  phone: string
  address: string
  accommodationType: string
  nights: number
  status: 'checked' | 'pending' | 'in room'
}

// Demo JSON data
const demoReservations: Reservation[] = [
  { id: 1, name: 'John Smith', email: 'john.smith@email.com', phone: '+1 234-567-8900', address: '123 Main St, New York, NY 10001', accommodationType: 'Deluxe Suite', nights: 3, status: 'checked' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 234-567-8901', address: '456 Oak Ave, Los Angeles, CA 90001', accommodationType: 'Standard Room', nights: 2, status: 'pending' },
  { id: 3, name: 'Michael Brown', email: 'm.brown@email.com', phone: '+1 234-567-8902', address: '789 Pine Rd, Chicago, IL 60601', accommodationType: 'Premium Suite', nights: 5, status: 'in room' },
  { id: 4, name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1 234-567-8903', address: '321 Elm St, Houston, TX 77001', accommodationType: 'Deluxe Room', nights: 4, status: 'checked' },
  { id: 5, name: 'David Wilson', email: 'd.wilson@email.com', phone: '+1 234-567-8904', address: '654 Maple Dr, Phoenix, AZ 85001', accommodationType: 'Standard Room', nights: 1, status: 'pending' },
  { id: 6, name: 'Jessica Martinez', email: 'j.martinez@email.com', phone: '+1 234-567-8905', address: '987 Cedar Ln, Philadelphia, PA 19101', accommodationType: 'Deluxe Suite', nights: 3, status: 'in room' },
  { id: 7, name: 'Christopher Lee', email: 'c.lee@email.com', phone: '+1 234-567-8906', address: '147 Birch Way, San Antonio, TX 78201', accommodationType: 'Premium Suite', nights: 6, status: 'checked' },
  { id: 8, name: 'Amanda Taylor', email: 'a.taylor@email.com', phone: '+1 234-567-8907', address: '258 Spruce St, San Diego, CA 92101', accommodationType: 'Standard Room', nights: 2, status: 'pending' },
  { id: 9, name: 'Robert Anderson', email: 'r.anderson@email.com', phone: '+1 234-567-8908', address: '369 Willow Ave, Dallas, TX 75201', accommodationType: 'Deluxe Room', nights: 4, status: 'in room' },
  { id: 10, name: 'Lisa Thomas', email: 'l.thomas@email.com', phone: '+1 234-567-8909', address: '741 Ash Blvd, San Jose, CA 95101', accommodationType: 'Premium Suite', nights: 7, status: 'checked' },
  { id: 11, name: 'James Jackson', email: 'j.jackson@email.com', phone: '+1 234-567-8910', address: '852 Hickory Ct, Austin, TX 78701', accommodationType: 'Standard Room', nights: 2, status: 'pending' },
  { id: 12, name: 'Maria White', email: 'm.white@email.com', phone: '+1 234-567-8911', address: '963 Poplar Pl, Jacksonville, FL 32201', accommodationType: 'Deluxe Suite', nights: 5, status: 'in room' },
  { id: 13, name: 'William Harris', email: 'w.harris@email.com', phone: '+1 234-567-8912', address: '159 Cherry St, Fort Worth, TX 76101', accommodationType: 'Premium Suite', nights: 3, status: 'checked' },
  { id: 14, name: 'Patricia Martin', email: 'p.martin@email.com', phone: '+1 234-567-8913', address: '357 Walnut Rd, Columbus, OH 43201', accommodationType: 'Standard Room', nights: 1, status: 'pending' },
  { id: 15, name: 'Richard Thompson', email: 'r.thompson@email.com', phone: '+1 234-567-8914', address: '468 Chestnut Ave, Charlotte, NC 28201', accommodationType: 'Deluxe Room', nights: 4, status: 'in room' },
  { id: 16, name: 'Linda Garcia', email: 'l.garcia@email.com', phone: '+1 234-567-8915', address: '579 Sycamore Dr, San Francisco, CA 94101', accommodationType: 'Premium Suite', nights: 6, status: 'checked' },
  { id: 17, name: 'Joseph Martinez', email: 'j.martinez2@email.com', phone: '+1 234-567-8916', address: '680 Magnolia Ln, Indianapolis, IN 46201', accommodationType: 'Standard Room', nights: 2, status: 'pending' },
  { id: 18, name: 'Barbara Robinson', email: 'b.robinson@email.com', phone: '+1 234-567-8917', address: '791 Dogwood St, Seattle, WA 98101', accommodationType: 'Deluxe Suite', nights: 3, status: 'in room' },
  { id: 19, name: 'Thomas Clark', email: 't.clark@email.com', phone: '+1 234-567-8918', address: '802 Redwood Blvd, Denver, CO 80201', accommodationType: 'Premium Suite', nights: 5, status: 'checked' },
  { id: 20, name: 'Elizabeth Rodriguez', email: 'e.rodriguez@email.com', phone: '+1 234-567-8919', address: '913 Cypress Way, Washington, DC 20001', accommodationType: 'Standard Room', nights: 1, status: 'pending' },
]

function Reservations() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
  const [modalType, setModalType] = useState<'edit' | 'info' | 'delete' | null>(null)
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)

  // Filter reservations based on search
  const filteredReservations = demoReservations.filter(reservation =>
    reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.phone.includes(searchTerm) ||
    reservation.accommodationType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReservations = filteredReservations.slice(startIndex, endIndex)

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      checked: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'in room': 'bg-pink-100 text-pink-700 border-pink-200',
    }
    const labels = {
      checked: 'Checked',
      pending: 'Pending',
      'in room': 'In Room',
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const handleOpenModal = (type: 'edit' | 'info' | 'delete', reservation: Reservation) => {
    setSelectedReservation(reservation)
    setModalType(type)
  }

  const handleCloseModal = () => {
    setModalType(null)
    setSelectedReservation(null)
  }

  return (
    <Layout>
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Reservations</h1>
              <p className="text-gray-600">Manage all accommodation reservations</p>
            </div>

            {/* Search and Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, or accommodation type..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value)
                      setCurrentPage(1) // Reset to first page on search
                    }}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Show:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Accommodation</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nights</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.accommodationType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{reservation.nights}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(reservation.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleOpenModal('edit', reservation)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal('info', reservation)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Info"
                        >
                          <Info className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenModal('delete', reservation)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>

          {/* Mobile Collapsible Cards */}
          <div className="lg:hidden space-y-4">
          {currentReservations.map((reservation) => {
            const isExpanded = expandedRows.has(reservation.id)
            return (
              <div key={reservation.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{reservation.name}</h3>
                        {getStatusBadge(reservation.status)}
                      </div>
                      <p className="text-sm text-gray-600">{reservation.email}</p>
                      <p className="text-sm text-gray-600">{reservation.accommodationType} • {reservation.nights} night(s)</p>
                    </div>
                    <button
                      onClick={() => toggleRow(reservation.id)}
                      className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={() => handleOpenModal('edit', reservation)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleOpenModal('info', reservation)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Info className="w-4 h-4" />
                      Info
                    </button>
                    <button
                      onClick={() => handleOpenModal('delete', reservation)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</p>
                      <p className="text-sm text-gray-900">{reservation.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Address</p>
                      <p className="text-sm text-gray-900">{reservation.address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Accommodation Type</p>
                      <p className="text-sm text-gray-900">{reservation.accommodationType}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Number of Nights</p>
                      <p className="text-sm text-gray-900">{reservation.nights}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
            <span className="font-semibold">{Math.min(endIndex, filteredReservations.length)}</span> of{' '}
            <span className="font-semibold">{filteredReservations.length}</span> reservations
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Show first page, last page, current page, and pages around current
                  return page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)
                })
                .map((page, index, array) => {
                  // Add ellipsis if needed
                  const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1
                  const showEllipsisAfter = index < array.length - 1 && array[index + 1] !== page + 1
                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsisBefore && <span className="px-2 text-gray-400">...</span>}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                      {showEllipsisAfter && <span className="px-2 text-gray-400">...</span>}
                    </div>
                  )
                })}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        </div>
      </main>

      {/* Modals */}
      {modalType && selectedReservation && (
        <>
          {/* Modal Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            {/* Edit Modal */}
            {modalType === 'edit' && (
              <div 
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Edit Reservation</h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      defaultValue={selectedReservation.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={selectedReservation.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue={selectedReservation.phone}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Type</label>
                    <select
                      defaultValue={selectedReservation.accommodationType}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option>Standard Room</option>
                      <option>Deluxe Room</option>
                      <option>Deluxe Suite</option>
                      <option>Premium Suite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Nights</label>
                    <input
                      type="number"
                      defaultValue={selectedReservation.nights}
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      defaultValue={selectedReservation.status}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="in room">In Room</option>
                      <option value="checked">Checked</option>
                    </select>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Info Modal */}
            {modalType === 'info' && (
              <div 
                className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Reservation Details</h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Name</p>
                      <p className="text-base text-gray-900">{selectedReservation.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Email</p>
                      <p className="text-base text-gray-900">{selectedReservation.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Phone</p>
                      <p className="text-base text-gray-900">{selectedReservation.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Address</p>
                      <p className="text-base text-gray-900">{selectedReservation.address}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Accommodation Type</p>
                      <p className="text-base text-gray-900">{selectedReservation.accommodationType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Number of Nights</p>
                      <p className="text-base text-gray-900">{selectedReservation.nights}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Status</p>
                      <div className="mt-1">
                        {getStatusBadge(selectedReservation.status)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex items-center justify-end">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Delete Modal */}
            {modalType === 'delete' && (
              <div 
                className="bg-white rounded-xl shadow-2xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Delete Reservation</h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">Are you sure?</p>
                      <p className="text-sm text-gray-600">This action cannot be undone.</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-1">You are about to delete reservation for:</p>
                    <p className="font-semibold text-gray-900">{selectedReservation.name}</p>
                    <p className="text-sm text-gray-600">{selectedReservation.email}</p>
                  </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle delete logic here
                      handleCloseModal()
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  )
}

export default Reservations

