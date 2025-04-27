import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backendUrl } from '../App'
import axios from 'axios'

const User = () => {

  const [user, setUser] = useState([])        // <-- Fixed
  const [userLoaded, setUserLoaded] = useState(false) // <-- Fixed

  const navigate = useNavigate()

  useEffect(() => {
    if (!userLoaded) {
      const token = localStorage.getItem("token")

      axios.get(`${backendUrl}/api/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUser(res.data)
        setUserLoaded(true)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [userLoaded])

  return (
    <div className="p-5">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="py-3 px-6 border-b text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              user.length > 0 ? (
                user.map((userItem, index) => (
                  <tr className="hover:bg-gray-50"  key={userItem.id || index}>
                    <td className="py-3 px-6 border-b">{index + 1}</td>
                    <td className="py-3 px-6 border-b">{userItem.name}</td>
                    <td className="py-3 px-6 border-b">{userItem.email}</td> {/* Email first */}
                    <td className="py-3 px-6 border-b">{userItem.role}</td> {/* Then Role */}
                    <td className="py-3 px-6 border-b space-x-2">
                      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Edit</button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No Users Available</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default User
