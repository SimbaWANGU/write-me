import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../styles/loginRegister.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function LoginRegister({updateMessage}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async(e) => {
    e.preventDefault()
    await fetch('/auth/login', {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: `username=${username}&password=${password}`
    })
    .then(res => res.json())
    .then((data) => {
      localStorage.setItem('write-me-user', JSON.stringify(data))
      updateMessage(data.message)
    })
  }

  const handleRegisterSubmit = async(e) => {
    e.preventDefault()
    await fetch('/auth/register', {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: `username=${username}&password=${password}`
    })
    .then(res => res.json())
    .then((data) => {
      localStorage.setItem('write-me-user', JSON.stringify(data))
      updateMessage(data.message)
    })
  }

  return (
    <Box sx={{ width: '70%', margin: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ width: '30%', margin: 'auto' }}>
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className='container'>
          <h3>Have an account?</h3>
          <form onSubmit={handleLoginSubmit} className="loginForm">
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
            <input type="submit" value="Login" />
          </form>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='container'>
          <h3>Create Account</h3>
          <form onSubmit={handleRegisterSubmit} className="loginForm">
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
            <input type="submit" value='Register' />
          </form>
        </div>
      </TabPanel>
    </Box>
  );
}

export default LoginRegister;