import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye } from 'lucide-react'
import { getOrders, updateOrderStatus, selectAllOrders } from '../features/orders/orderSlice'
import Loader from '../components/common/Loader'
import OrderDetailsModal from '../components/modals/OrderDetailsModal'

const Orders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectAllOrders)
  const loading = useSelector(state => state.orders.isLoading)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const handleStatusChange = (id, status) => {
    dispatch(updateOrderStatus({ id, status }))
  }

  const orderStatusColors = {
    Pending: 'yellow',
    Processing: 'blue',
    Shipped: 'purple',
    Delivered: 'green',
    Cancelled: 'red',
  }

  const paymentStatusColors = {
    paid: 'green',
    created: 'blue',
    failed: 'red',
    cancelled: 'red',
  }

  const getPaymentStatus = (order) => {
    if (order.paymentResult?.status === 'paid') return 'Paid'
    if (order.paidAt) return 'Paid'
    if (order.paymentResult?.status === 'failed') return 'Failed'
    if (order.paymentResult?.status === 'cancelled') return 'Cancelled'
    return 'Pending'
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">Order ID</th>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Date</th>
                <th className="text-left p-4">Total</th>
                <th className="text-left p-4">Payment Status</th>
                <th className="text-left p-4">Order Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const paymentStatus = getPaymentStatus(order)
                const paymentColor = paymentStatusColors[paymentStatus.toLowerCase()] || 'gray'
                return (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="p-4 font-mono text-sm">{order._id.slice(-8)}</td>
                    <td className="p-4">{order.user?.name || 'Guest'}</td>
                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-semibold">₹{order.totalAmount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${paymentColor}-100 text-${paymentColor}-800`}>
                        {paymentStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${orderStatusColors[order.status]}-100 text-${orderStatusColors[order.status]}-800`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option>Pending</option>
                          <option>Processing</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Orders