import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Shield, UserX, UserCog } from 'lucide-react'
import { getUsers, deleteUser, makeAdmin, selectAllUsers } from '../features/users/userSlice'
import Loader from '../components/common/Loader'
import toast from 'react-hot-toast'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const loading = useSelector(state => state.users.isLoading)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      await dispatch(deleteUser(id))
      toast.success('User deleted')
    }
  }

  const handleMakeAdmin = async (id) => {
    await dispatch(makeAdmin(id))
    toast.success('User is now admin')
  }

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Joined</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <motion.tr key={user._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {user.role !== 'admin' && (
                        <button onClick={() => handleMakeAdmin(user._id)} className="text-blue-600 hover:text-blue-800" title="Make Admin">
                          <UserCog size={18} />
                        </button>
                      )}
                      <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:text-red-800" title="Delete User">
                        <UserX size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Users