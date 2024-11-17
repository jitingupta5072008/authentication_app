import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('https://codingwithjitin.onrender.com/api/auth/profile', {
          headers: { x_auth_token: token },
        });
        setUser(res.data.user)
      } catch (err) {
        alert(err.response.data.message);
      }
    }
    fetchUser()
  }, [])
  const logout = () => {
    localStorage.clear();
    navigate('/login')
}
  return (
    <>
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        {user ? (
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h2 className="text-center text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{user.username}</h2>
              <p className=" text-center mt-2 text-lg/8 text-gray-600"> {user.email} </p>
              <div className="text-center mt-4">

                <Link to={'/login'} onClick={logout}  className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Logout</Link>
              </div>

            </div>
          </main>
        ) : (<p>Loading..</p>)}
      </div>
    </>
  )
}

export default Dashboard