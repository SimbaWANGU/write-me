import React, { useState } from 'react'
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import '../styles/Comments.scss';
import { useMutation, useQueryClient } from 'react-query';

function Comments(props) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 'inset 20px 20px 15px #eeeef1, inset -9.91px -9.91px 15px #FFFFFF;',
    p: 4,
  };

  const [comment, setComment] = useState('')

  const addComment = async () => {
    await fetch(`/post/${props.id}/comment`, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
      body: `comment=${comment}&author=${props.username}`
    })
    .then(res => res.json())
    .then((data) => console.log(data))
  }

  const useAddComment = () => {
    const queryClient = useQueryClient()
    return useMutation(addComment, {
      onSuccess: () => {
        queryClient.invalidateQueries(`comments${props.id}`)
      },
    })
  }

  const { mutate: addCommentToPost } = useAddComment()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = {
      comment,
      author: props.username
    }
    addCommentToPost(newComment)
    setComment('')
  }

  return (
    <Box sx={style}>
      <div className='bodyText'>
        <img src={props.image} alt='PP' />
        <p>{props.author}</p>
      </div>
      <p className='author'>{props.text}</p>
      <div className='commentInput'>
        <form onSubmit={handleSubmit}>
          <input 
            type='text'
            placeholder='Add Comment'
            value={comment}
            onChange={(e) => {setComment(e.target.value)}}
          />
          <button type='submit'>
            <SendIcon color='primary'/>
          </button>
        </form>
      </div>
      {props.comments.comments?.map((comment) => (
        <div className='commentsArea'>
          <img src={props.image} alt='pp' />
          <p className='author'><strong>{comment.username}</strong></p>
          <p className='comment'>{comment.comment}</p>
        </div>
      ))}
    </Box>
  )
}

export default Comments