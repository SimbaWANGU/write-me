import React from 'react'
import '../styles/Posts.scss'
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Posts() {
  let text = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
  let commentCounter = 30
  let likes = 40
  let person = 'SimbaWANGU'
  let image = ''
  let pi = (image === '') ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : image;

  return (
    <div className='post'>
      <div className='userDetails'>
        <img src={pi} alt="profile pic" />
        <p>{person}</p>
      </div>
      {text}
      <div className='post_icons'>
        {commentCounter} <CommentIcon className='icon' color='primary' />
        {likes}<FavoriteIcon className='icon' color='error' />
      </div>
    </div>
  )
}

export default Posts