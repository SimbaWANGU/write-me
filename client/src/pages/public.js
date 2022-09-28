import * as React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query'
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
  const [username, setUsername] = React.useState('')
  const [postText, setPostText] = React.useState('')
  const [postModal, setPostModal] = React.useState(false)
  const [blogModal, setBlogModal] = React.useState(false)
  const [blogTitle, setBlogTitle] = React.useState('')
  const [blogText, setBlogText] = React.useState('')
  const [blogStatus, setBlogStatus] = React.useState('public')

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


  const fetchBlogData = async () => {
    const res = await fetch('/blog/get', {
      method: 'get',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
    const result = await res.json()
    return result
  }

  const fetchPostData = async () => {
    const res = await fetch('/post/get', {
      method: 'get',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
    const result = await res.json()
    return result
  }

  const { 
    isLoading: blogDataLoading,
    data: blogData, 
    isError: blogDataError, 
    error: errorBlogMessage 
  } = useQuery('blogs', fetchBlogData)

  const { 
    isLoading: postDataLoading,
    data: postData, 
    isError: postDataError, 
    error: errorPostMessage 
  } = useQuery('posts', fetchPostData)

  React.useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('write-me-user'))
    setUsername(loggedInUser.username)
  }, [])

  const handleOpenPostModal = () => setPostModal(true)
  const handleClosePostModal = () => setPostModal(false)

  const handleOpenBlogModal = () => setBlogModal(true)
  const handleCloseBlogModal = () => setBlogModal(false)

  const addPost = async () => {
    await fetch('/post/create', {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: `text=${postText}&author=${username}`
    })
    .then(res => res.json())
    .then((data) => console.log(data))

    setPostText('')
    handleClosePostModal()
  }

  const addBlog = async () => {
    await fetch('/blog/create', {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: `title=${blogTitle}&text=${blogText}&author=${username}&status=${blogStatus}`
    })
    .then(res => res.json())
    .then((data) => console.log(data))

    setBlogText('')
    setBlogTitle('')
    handleCloseBlogModal()
  }

  const useAddPostData = () => {
    const queryClient = useQueryClient()
    return useMutation(addPost, {
      onSuccess: () => {
        queryClient.invalidateQueries('posts')
      },
    })
  }

  const useAddBlogData = () => {
    const queryClient = useQueryClient()
    return useMutation(addBlog, {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      }
    })
  }

  const { mutate: addPostToDb } = useAddPostData()
  const { mutate: addBlogToDb } = useAddBlogData()

  const handlePostSubmit = (e) => {
    e.preventDefault()
    const post = {postText, username}
    addPostToDb(post)
  }

  const handleBlogSubmit = (e) => {
    e.preventDefault()
    const blog = {blogTitle, blogText, blogStatus, username}
    addBlogToDb(blog)
  }

  if(blogDataError || postDataError) {
    return <h2>{errorBlogMessage.message}{errorPostMessage.message}</h2>
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
        {postDataLoading ? 
          <h2>LOading</h2> : //add loading component
          postData?.posts.map((post) => (
          <Posts
            key={post._id}
            id={post._id}
            author={post.author} 
            title={post.title}
            body={post.body}
            likes={post.likes}
            comments={post.comments}
            created_at={post.created_at}
            update_at={post.update_at}
          />
        ))}
        {}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {blogDataLoading ? 
          <h2>LOading</h2> : //add loading component
          blogData?.blogs.map((blog) => (
          <Blogs
            key={blog._id}
            id={blog._id}
            author={blog.author} 
            title={blog.title}
            body={blog.body}
            likes={blog.likes}
            comments={blog.comments}
            created_at={blog.created_at}
            update_at={blog.update_at}
          />
        ))}
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
            <label for='blogTitle'>Title</label>
            <input 
              type='text'
              name='blogTitle' 
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              required />
            <br />
            <label for='blogText'>Start Blog</label>
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

