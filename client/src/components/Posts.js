import React from 'react'
import '../styles/Posts.scss'
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Posts(props) {
  let image = ''
  let pi = (image === '') ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : image;

  return (
    <div className='post'>
      <div className='userDetails'>
        <img src={pi} alt="profile pic" />
        <p>#{props.author}</p>
      </div>
        {props.body}
      <div className='post_icons'>
        {props.comments.length} <CommentIcon className='icon' color='primary' />
        {props.likes.length}<FavoriteIcon className='icon' color='error' />
      </div>
    </div>
  )
}

export default Posts