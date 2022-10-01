import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import '../styles/Blogs.scss'
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Blogs(props) {
  const [username, setUsername] = useState('')
  let image = ''
  let pi = (image === '') ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : image;

  React.useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('write-me-user'))
    setUsername(loggedInUser.username)
  }, [])

  const getLikes = async () => {
    const res = await fetch(`/blog/${props.id}/likes`, {
      method: 'get',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
    const result = await res.json()
    return result
  }

  const getComments = async () => {
    const res = await fetch(`/blog/${props.id}/comments`, {
      method: 'get',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
    const result = await res.json()
    return result
  }

  const likePost = async () => {
    await fetch('/blog/like', {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: `username=${username}&id=${props.id}`
    })
    .then(res => res.json())
    .then((data) => console.log(data))
  }

  const unlikePost = async () => {
    await fetch('/blog/unlike', {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: `username=${username}&id=${props.id}`
    })
    .then(res => res.json())
    .then((data) => console.log(data))
  }

  const useAddLikeData = () => {
    const queryClient = useQueryClient()
    return useMutation(likePost, {
      onSuccess: () => {
        queryClient.invalidateQueries(`blogs${props.id}`)
      }
    })
  }

  const useRemoveLikeData = () => {
    const queryClient = useQueryClient()
    return useMutation(unlikePost, {
      onSuccess: () => {
        queryClient.invalidateQueries(`blogs${props.id}`)
      }
    })
  }

  const { mutate: addLikeToDb } = useAddLikeData()
  const { mutate: reomveLikeFromDb } = useRemoveLikeData()
  const {data: likesData} = useQuery(`likes${props.id}`, getLikes)
  const {data: commentsData} = useQuery(`comments${props.id}`, getComments)

  const handleLike = () => {
    const like = {
      username,
      id: props.id
    }
    addLikeToDb(like)
  }

  const handleUnlike = () => {
    const unlike = {
      username,
      id: props.id,
    }
    reomveLikeFromDb(unlike)
  }

  const LikeButton = () => {
    if(likesData) {
      if (likesData.likes.includes(username)) {
        return <FavoriteIcon className='icon' color='error' onClick={handleUnlike} />
      } else {
        return <FavoriteBorderIcon className='icon' onClick={handleLike} />
      }
    }
  }

  
  return (
    <div className='blog_post'>
      <div className='userDetails'>
        <img src={pi} alt="profile pic" />
        <h3>{props.title}</h3>
        <p>#{props.author}</p>
      </div>
      {props.body}
      <div className='blog_icons'>
      {(commentsData) ? commentsData.comments.length : 0} <CommentIcon className='icon' color='primary' />
      {(likesData) ? likesData.likes.length : 0} <LikeButton />
      </div>
    </div>
  )
}

export default Blogs