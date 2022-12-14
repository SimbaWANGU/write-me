import React, { useState } from 'react'
import '../styles/Posts.scss'
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Modal } from '@mui/material';
import Comments from './PostComments';

function Posts(props) {
  const [username, setUsername] = useState('')
  const [postCommentsModal, setPostCommentsModal] = useState(false)
  let image = ''
  let pi = (image === '') ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : image;

  React.useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('write-me-user'))
    setUsername(loggedInUser.username)
  }, [])

  const getLikes = async () => {
    const res = await fetch(`/post/${props.id}/likes`, {
      method: 'get',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
    const result = await res.json()
    return result
  }

  const getComments = async () => {
    const res = await fetch(`/post/${props.id}/comments`, {
      method: 'get',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
    const result = await res.json()
    return result
  }

  const likePost = async () => {
    await fetch('/post/like', {
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
    await fetch('/post/unlike', {
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
        queryClient.invalidateQueries(`likes${props.id}`)
      }
    })
  }

  const useRemoveLikeData = () => {
    const queryClient = useQueryClient()
    return useMutation(unlikePost, {
      onSuccess: () => {
        queryClient.invalidateQueries(`likes${props.id}`)
      }
    })
  }

  const { mutate: addLikeToDb } = useAddLikeData()
  const { mutate: removeLikeFromDb } = useRemoveLikeData()
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
    const like = {
      username,
      id: props.id
    }
    removeLikeFromDb(like)
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

  const openPost = () => setPostCommentsModal(true)
  const closePost = () => setPostCommentsModal(false)

  return (
    <div className='post'>
      <div className='userDetails'>
        <img src={pi} alt="profile pic" />
        <p>#<strong>{props.author}</strong></p>
      </div>
        {props.body}
      <div className='post_icons'>
        {(commentsData) ? commentsData.comments.length : 0} <CommentIcon className='icon' color='primary' onClick={openPost} />
        {(likesData) ? likesData.likes.length : 0} <LikeButton />
      </div>
      <Modal
        open={postCommentsModal}
        onClose={closePost}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Comments 
          id={props.id}
          text={props.body}
          author={props.author}
          image={pi}
          username={username}
          comments={commentsData}
        />
      </Modal>
    </div>
  )
}

export default Posts