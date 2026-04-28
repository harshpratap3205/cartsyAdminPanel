import api from '../../services/api'

export const fetchProducts = async () => {
  const { data } = await api.get('/products?limit=100')
  return data.products
}

export const createProduct = async (formData) => {
  const { data } = await api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const updateProduct = async ({ id, formData }) => {
  const { data } = await api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

export const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`)
}