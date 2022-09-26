import React from 'react'
import '../styles/Blogs.scss'
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Blogs(props) {
  let image = ''
  let pi = (image === '') ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : image;
  
  return (
    <div className='blog_post'>
      <div className='userDetails'>
        <img src={pi} alt="profile pic" />
        <h3>{props.title}</h3>
        <p>#{props.author}</p>
      </div>
      {props.body}
      <div className='blog_icons'>
        {props.comments.length} <CommentIcon className='icon' color='primary' />
        {props.comments.length}<FavoriteIcon className='icon' color='error' />
      </div>
    </div>
  )
}

export default Blogs