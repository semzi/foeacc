import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard,
  Bed,
  Calendar,
  FileText,
  AlertCircle,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Mail,
  Menu,
  X
} from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    navigate('/login')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-gray-200 flex items-center justify-between">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-8 lg:h-10 w-auto object-contain"
          />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 space-y-2 overflow-y-auto">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 hidden lg:block">Menu</h3>
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive('/dashboard')
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
              <span className={isActive('/dashboard') ? 'font-medium' : ''}>Dashboard</span>
            </Link>
            <Link 
              to="/accommodation" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive('/accommodation')
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bed className="w-5 h-5 flex-shrink-0" />
              <span className={isActive('/accommodation') ? 'font-medium' : ''}>Accommodation</span>
            </Link>
            <Link 
              to="/reservations" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive('/reservations')
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-5 h-5 flex-shrink-0" />
              <span className={isActive('/reservations') ? 'font-medium' : ''}>Reservations</span>
            </Link>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <FileText className="w-5 h-5 flex-shrink-0" />
              <span>Reports</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Complaints</span>
            </a>
          </div>

          <div className="space-y-1 mt-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 hidden lg:block">General</h3>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 flex-shrink-0" />
              <span>Settings</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              <span>Help</span>
            </a>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reservation"
                className="w-full pl-10 pr-16 py-2 lg:py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm lg:text-base"
              />
              <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded hidden lg:block">⌘F</kbd>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Mail className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-semibold text-sm lg:text-base">
                WS
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900"> Wings Suite</p>
                <p className="text-xs text-gray-500 hidden lg:block">wingsuite@mail.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        {children}
      </div>
    </div>
  )
}

export default Layout

