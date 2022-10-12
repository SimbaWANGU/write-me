import React from 'react'
import { useQuery } from 'react-query';
import '../styles/profile.scss'

function Profile(props) {
  let image = ''
  let pi = (image === '') ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : image;

  const username = props.user.username

  const getPostCount = async () => {
    const res = await fetch(`/post/count/${username}`, {
      method: 'get',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
    const result = await res.json()
    return result
  }

  const getBlogCount = async () => {
    const res = await fetch(`/blog/count/${username}`, {
      method: 'get',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
    const result = await res.json()
    return result
  }

  const getPrivateBlogCount = async () => {
    const res = await fetch(`/blog/private/count/${username}`, {
      method: 'get',
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      },
    })
    const result = await res.json()
    return result
  }

  const {
    data: postData,
  } = useQuery('postCount', getPostCount)

  const {
    data: blogData,
  } = useQuery('blogCount', getBlogCount)

  const {
    data: privateData,
  } = useQuery('privateBlogCount', getPrivateBlogCount)

  return (
    <div className='profileContainer'>
      <div className='profileCard'>
        <img src={pi} alt='' />
        <h1>{username}</h1>
        <div className='statsContainer'>
          <div>
            <h4>{postData ? postData.length : 0}</h4>
            <p>Posts</p>
          </div>
          <div>
            <h4>{blogData ? blogData.length : 0}</h4>
            <p>Public Blogs</p>
          </div>
          <div>
            <h4>{privateData ? privateData.length : 0}</h4>
            <p>Private Blogs</p>
          </div>
        </div>
        <p className='bio'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum facilis totam mollitia neque in placeat autem, sint laudantium impedit error nemo. Natus, animi laudantium necessitatibus in facilis nostrum libero quidem.</p>
      </div>
    </div>
  )
}

export default Profile