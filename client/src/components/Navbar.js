import React from 'react'
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import '../styles/Navbar.scss';

function Navbar({updateMessage}) {
  const navigate = useNavigate()

  const logout = async() => {
    await fetch('/auth/logout', {
      method: 'get',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
    .then(res => res.json())
    .then((data) => {
      localStorage.removeItem('write-me-user')
      updateMessage(data.message)
    })
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbarTitle navbarItem">Write Me</div>
      <div className="navbarItem">
        <a href="/">Posts</a>
      </div>
      <div className="navbarItem marginSeparator">
        <a href="/profile">Profile</a>
      </div>
      <div className="navbarItem iconPerson">
        <LogoutIcon color="primary" onClick={handleLogout} />
      </div>
    </header>
  )
}

export default Navbar