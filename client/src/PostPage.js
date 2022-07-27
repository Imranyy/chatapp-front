import React from 'react'
import { useParams } from 'react-router-dom'

const PostPage = ({posts}) => {
    const  { id }  = useParams(); 
    // id comes inform of ":1" therefore to pick the id only id[2] 
    const post = posts.find(post => (post.id).toString() === id[1]);

 
    return (
        <div className='individual-post'>

            {post &&
                <>
                    <h3>{post.title} <em>-[{post.date}]</em></h3>
                    <p>- {post.body}</p>
                 
                </>
            }

        </div>
    )
}

export default PostPage
