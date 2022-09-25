import { useEffect, useState } from "react";
import LoginRegister from "./pages/loginRegister";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import PublicPosts from "./pages/public";
import Profile from "./pages/profile";

function Authorized() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicPosts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/login' element={<LoginRegister />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  const [user, setUser] = useState({})
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loggedInUser = localStorage.getItem('write-me-user');
    if (loggedInUser === null) {
      setUser({})
    } else {
      setUser(JSON.parse(loggedInUser))
    }
  }, [message])

  const updateMessage = (message) => {
    setMessage(message)
  }

  return (
    <>
      {(Object.keys(user).length === 0) ? 
        <LoginRegister 
          updateMessage={updateMessage}
        /> :
        <Authorized
          updateMessage={updateMessage}
        />  
    }
    </>
  );
}

export default App;
