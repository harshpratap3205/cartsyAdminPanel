import api from '../../services/api'

export const fetchAllOrders = async () => {
  const { data } = await api.get('/admin/orders')
  return data
}

export const updateOrderStatusAPI = async ({ id, status }) => {
  const { data } = await api.put(`/orders/${id}/status`, { status })
  return data
}