import api from '../../services/api'

export const loginUser = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export const logoutUser = async (refreshToken) => {
  await api.post('/auth/logout', { refreshToken })
}