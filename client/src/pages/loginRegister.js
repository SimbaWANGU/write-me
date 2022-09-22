import React, { useState } from 'react';

function LoginRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')

  let handleSubmit = async(e) => {
    e.preventDefault()
    try {
      let res = await fetch('/auth/login', {
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        body: `username=${username}&password=${password}`
      })
        .then(res => res.json())
        .then(data => console.log(data))
      
      if (res.status === 200) {
        setUsername('')
        setPassword('')
        setMessage(res.message)
      } else {
        setMessage(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label><br />
        <input
          type="text"
          name="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}  
        /><br />
        <label>Password</label><br />
        <input 
          type="password" 
          name="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}  
        /><br />
        <input type="submit" />
        <p>{message}</p>
      </form>
    </div>
  );
}

export default LoginRegister;