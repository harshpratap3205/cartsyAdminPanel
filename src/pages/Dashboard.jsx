import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react'
import { getProducts, selectAllProducts } from '../features/products/productSlice'
import { getOrders, selectAllOrders } from '../features/orders/orderSlice'
import { getUsers, selectAllUsers } from '../features/users/userSlice'
import Loader from '../components/common/Loader'

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between"
  >
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-full bg-${color}-100`}>
      <Icon className={`text-${color}-600`} size={24} />
    </div>
  </motion.div>
)

const Dashboard = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const orders = useSelector(selectAllOrders)
  const users = useSelector(selectAllUsers)
  const loading = useSelector(state => state.products.isLoading || state.orders.isLoading || state.users.isLoading)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getOrders())
    dispatch(getUsers())
  }, [dispatch])

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)

  if (loading) return <Loader fullPage />

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your store overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Products" value={products.length} icon={Package} color="blue" />
        <StatCard title="Total Orders" value={orders.length} icon={ShoppingCart} color="green" />
        <StatCard title="Total Users" value={users.length} icon={Users} color="purple" />
        <StatCard title="Revenue" value={`₹${totalRevenue.toLocaleString('en-IN')}`} icon={DollarSign} color="orange" />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2">Order ID</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order._id} className="border-b">
                  <td className="py-2">{order._id.slice(-6)}</td>
                  <td>{order.user?.name || 'Guest'}</td>
                  <td>₹{order.totalAmount}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard