import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import '../styles/Navbar.scss';

function Navbar() {
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
        <PersonIcon color="primary" />
      </div>
    </header>
  )
}

export default Navbar