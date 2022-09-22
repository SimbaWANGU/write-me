import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Posts from '../components/Posts';
import Blogs from '../components/Blogs';
import PostAddIcon from '@mui/icons-material/PostAdd';
import BookIcon from '@mui/icons-material/Book';
import { Modal } from '@mui/material';
import '../styles/public.scss'

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [postModal, setPostModal] = React.useState(false)
  const handleOpenPostModal = () => setPostModal(true)
  const handleClosePostModal = () => setPostModal(false)

  const [blogModal, setBlogModal] = React.useState(false)
  const handleOpenBlogModal = () => setBlogModal(true)
  const handleCloseBlogModal = () => setBlogModal(false)

  const [postText, setPostText] = React.useState('')
  const [blogText, setBlogText] = React.useState('')
  const [blogStatus, setBlogStatus] = React.useState('public')

  const handlePostSubmit = (e) => {
    e.preventDefault()
    console.log(postText)
    setPostText('')
  }

  const handleBlogSubmit = (e) => {
    e.preventDefault()
    console.log(blogText, blogStatus)
  }

  return (
    <Box sx={{ width: '70%', margin: 'auto' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ width: '30%', margin: 'auto' }}>
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Blog" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <div className='newItem'>
        <button className='add_post' onClick={handleOpenPostModal}>
          <PostAddIcon color='primary'/>
        </button>
        <button className='add_blog_post' onClick={handleOpenBlogModal}>
          <BookIcon color='primary' />
        </button>
      </div>
      <TabPanel value={value} index={0}>
        <Posts />
        <Posts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Blogs />
      </TabPanel>
      <Modal
        open={postModal}
        onClose={handleClosePostModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className='createPostandBlog' onSubmit={handlePostSubmit}>
            <label for='postText'>What's on your mind?</label>
            <input 
              type='text'
              name='postText' 
              max={200}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              required />
            <input type='submit' value='Create Post' />
          </form>
        </Box>
      </Modal>
      <Modal
        open={blogModal}
        onClose={handleCloseBlogModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form className='createPostandBlog' onSubmit={handleBlogSubmit}>
            <label for='blogText'>What's on your mind?</label>
            <input 
              type='text'
              name='blogText' 
              value={blogText}
              onChange={(e) => setBlogText(e.target.value)}
              required />
            <br />
            <div>
              <input 
                type="radio"
                name="status"
                value="private"
                onChange={(e) => setBlogStatus(e.target.value)} 
              />
              <label for="vehicle1">Private</label>
            </div>
            <div>
              <input
                type="radio"
                name="status" 
                value="public" 
                onChange={(e) => setBlogStatus(e.target.value)}
              />
              <label for="vehicle2">Public</label>
            </div> <br />
            <input type='submit' value='Create Blog Post' />
          </form>
        </Box>
      </Modal>
    </Box>
  );
}
