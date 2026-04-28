import { motion, AnimatePresence } from 'framer-motion'
import { X, Package, MapPin, CreditCard, Calendar, IndianRupee } from 'lucide-react'

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null

  const formatDate = (date) => new Date(date).toLocaleString()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Order Details
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order ID & Status */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-mono font-semibold text-gray-800">{order._id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                  order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'}`}>
                {order.status}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Package size={18} /> Customer Information
            </h3>
            <p><span className="text-gray-600">Name:</span> {order.user?.name || 'Guest'}</p>
            <p><span className="text-gray-600">Email:</span> {order.user?.email || 'N/A'}</p>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <MapPin size={18} /> Shipping Address
            </h3>
            <p>{order.shippingAddress?.street}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}</p>
            <p>{order.shippingAddress?.country}</p>
          </div>

          {/* Payment Details */}
      // Inside the modal, replace the Payment Information block with this:

<div className="bg-gray-50 rounded-xl p-4">
  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
    <CreditCard size={18} /> Payment Information
  </h3>
  <div className="space-y-1">
    <p><span className="text-gray-600">Method:</span> {order.paymentMethod}</p>
    <p>
      <span className="text-gray-600">Payment Status:</span>
      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
        ${order.paymentResult?.status === 'paid' ? 'bg-green-100 text-green-800' :
          order.paidAt ? 'bg-green-100 text-green-800' :
          order.paymentResult?.status === 'failed' ? 'bg-red-100 text-red-800' :
          order.paymentResult?.status === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'}`}>
        {order.paymentResult?.status === 'paid' ? 'Paid' :
         order.paidAt ? 'Paid' :
         order.paymentResult?.status === 'failed' ? 'Failed' :
         order.paymentResult?.status === 'cancelled' ? 'Cancelled' :
         'Pending'}
      </span>
    </p>
    <p><span className="text-gray-600">Transaction ID:</span> {order.paymentResult?.id || 'N/A'}</p>
    <p><span className="text-gray-600">Paid On:</span> {order.paidAt ? new Date(order.paidAt).toLocaleString() : 'Not paid'}</p>
  </div>
</div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Package size={18} /> Items
            </h3>
            <div className="border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3">Product</th>
                    <th className="text-left p-3">Quantity</th>
                    <th className="text-left p-3">Price</th>
                    <th className="text-left p-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item, idx) => (
                    <tr key={idx} className="border-b last:border-0">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3">₹{item.price}</td>
                      <td className="p-3 font-semibold">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50 font-bold">
                  <tr>
                    <td colSpan="3" className="text-right p-3">Total Amount:</td>
                    <td className="p-3 text-blue-600">₹{order.totalAmount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Dates */}
          <div className="text-xs text-gray-500 border-t pt-4 flex justify-between">
            <span>Order placed: {formatDate(order.createdAt)}</span>
            {order.deliveredAt && <span>Delivered: {formatDate(order.deliveredAt)}</span>}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default OrderDetailsModal