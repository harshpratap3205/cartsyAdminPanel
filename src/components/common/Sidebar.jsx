import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'

const Sidebar = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/users', label: 'Users', icon: Users },
  ]

  return (
    <aside className="w-72 bg-white shadow-xl h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Admin Panel
        </h2>
      </div>
      <nav className="flex-1 mt-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 relative ${
                isActive
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r"
                />
              )}
            </Link>
          )
        })}
      </nav>
      <div className="p-6 border-t">
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-2 text-red-600 hover:text-red-800 transition w-full"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar