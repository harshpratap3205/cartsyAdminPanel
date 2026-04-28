import api from '../../services/api'

export const fetchAllUsers = async () => {
  const { data } = await api.get('/admin/users')
  return data
}

export const deleteUserAPI = async (id) => {
  await api.delete(`/admin/users/${id}`)
}

export const makeAdminAPI = async (id) => {
  const { data } = await api.put(`/admin/users/${id}/role`, { role: 'admin' })
  return data
}