import React from 'react'
import {Link} from 'react-router-dom'

const Post = ({post}) => {
    return (
      <div className='post'>

            <Link className='post-link' to={`/post:${post.id}`}>
                <p >
                    <strong>{post.id}) {post.title} [{post.date}]</strong> <br/>
                    <small>
                        {(post.body).length <= 20 ? post.body : `${(post.body).slice(0,20)}...`}

                    </small>
                </p>    
            </Link>
      </div>
    )
}

export default Post
