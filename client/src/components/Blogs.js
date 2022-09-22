import React from 'react'
import '../styles/Blogs.scss'
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Blogs() {
  let text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam adipisci tempora, eaque dicta nemo illo, natus dignissimos non beatae nostrum neque consequuntur voluptate facere rem. Animi accusamus, consequatur ipsam ut laboriosam laborum dolores a. Amet sunt impedit soluta, necessitatibus asperiores delectus, aspernatur, accusantium doloribus voluptates itaque maxime quidem error distinctio. Impedit similique vel, perferendis eaque voluptate sed pariatur temporibus aspernatur voluptas consequuntur, ea suscipit laudantium veritatis voluptates nulla placeat velit? Officia dolorum fuga obcaecati ullam voluptates dignissimos quidem, est natus reprehenderit repellat sequi minus. Explicabo totam, nisi, a quaerat ex reiciendis, neque tempore ut unde vitae debitis fugit? Accusamus, sunt. Quibusdam quam eius inventore, itaque libero quos eaque quas impedit quae, placeat consectetur? Commodi neque, eos esse ducimus quaerat, aspernatur praesentium perferendis exercitationem amet officia inventore dicta eaque voluptas? Enim animi esse unde facere similique iste harum veritatis inventore fugiat eum quasi tempore rem accusamus aperiam incidunt repellat fuga dolores ipsam ullam, doloribus repudiandae error? Culpa doloribus consequatur dolorum laudantium, eaque quisquam doloremque rem ducimus, sapiente, voluptas aspernatur laborum! Nesciunt quia eius recusandae qui aut officiis alias. Quibusdam, molestiae quo neque maiores sapiente fugiat aliquam voluptates culpa nam delectus sunt, excepturi quia temporibus ullam minus reprehenderit quaerat harum officia cum.'
  let commentCounter = 30
  let likes = 40
  let person = 'SimbaWANGU'
  let image = ''
  let pi = (image === '') ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : image;
  
  return (
    <div className='blog_post'>
      <div className='userDetails'>
        <img src={pi} alt="profile pic" />
        <p>{person}</p>
      </div>
      {text}
      <div className='blog_icons'>
        {commentCounter} <CommentIcon className='icon' color='primary' />
        {likes}<FavoriteIcon className='icon' color='error' />
      </div>
    </div>
  )
}

export default Blogs