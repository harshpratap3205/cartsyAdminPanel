import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { getProducts, selectAllProducts, removeProduct } from '../features/products/productSlice'
import ProductFormModal from '../components/modals/ProductFormModal'
import Loader from '../components/common/Loader'
import toast from 'react-hot-toast'

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const loading = useSelector(state => state.products.isLoading)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await dispatch(removeProduct(id))
      toast.success('Product deleted')
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => { setEditingProduct(null); setIsModalOpen(true) }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <motion.div
            key={product._id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img src={product.images?.[0]} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xl font-bold text-blue-600">₹{product.price}</span>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingProduct(product); setIsModalOpen(true) }} className="text-blue-600"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-600"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && <ProductFormModal product={editingProduct} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}

export default Products