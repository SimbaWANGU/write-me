import React from 'react';

function LoginRegister(props) {
  return (
    <div>
      <form action='http://localhost:5500/auth/login' method='post'>
        <label for="username">Username</label><br />
        <input type="text" name="username" /><br />
        <label for="password">Password</label><br />
        <input type="password" name="password" /><br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default LoginRegister;