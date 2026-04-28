import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { addProduct, editProduct } from '../../features/products/productSlice'
import toast from 'react-hot-toast'

const ProductFormModal = ({ product = null, onClose }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    stock: product?.stock || '',
  })
  const [imageFiles, setImageFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const submitData = new FormData()
    Object.keys(formData).forEach(key => submitData.append(key, formData[key]))
    imageFiles.forEach(file => submitData.append('images', file))

    try {
      if (product?._id) {
        await dispatch(editProduct({ id: product._id, formData: submitData })).unwrap()
        toast.success('Product updated')
      } else {
        await dispatch(addProduct(submitData)).unwrap()
        toast.success('Product created')
      }
      onClose()
    } catch (err) {
      toast.error(err.message || 'Operation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{product?._id ? 'Edit' : 'Add'} Product</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border rounded px-3 py-2" required />
          <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded px-3 py-2" rows="3" required />
          <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full border rounded px-3 py-2" required />
          <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border rounded px-3 py-2" required />
          <input type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full border rounded px-3 py-2" required />
          <input type="file" multiple accept="image/*" onChange={e => setImageFiles(Array.from(e.target.files))} className="w-full" />
          <div className="flex gap-2 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default ProductFormModal