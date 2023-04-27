import { useEffect, useState } from 'react'
import { getComments } from '../../../utils/backend'

export default function CommentSection({ detailsPage }) {
    //saving form to state 
    const [comments, setComments] = useState([])
    const [commentForm, setCommentForm] = useState(null)

 // for comments model
    useEffect(() => {
        getComments(detailsPage.name.common)
        .then(comments => setComments(comments))
    })


    console.log(detailsPage)
    // rendering form for creating landmark onSubmit
    function createCommentForm(){ 
        if (commentForm === null){
            console.log(commentForm)
            setCommentForm (<h1>Create form goes here!</h1>)
        }else{
            console.log(commentForm)
            setCommentForm(null)
        }
    }

    let buttonText = 'Add a Comment'
    if (commentForm !== null){
        buttonText = 'Close Form'
    }

    return (
        <div className='comment-section'>
                <button className='right-5'
                    onClick={createCommentForm}>
                        {buttonText}
                </button>
            <div className='comments'>
                {/* conditionally render comment name and  if there are any */}
               
                {comments.length > 0 ?  comments.map(comment => <div key={comment._id} ><p>{comment.tripDate} --- {comment.name} --- {comment.comment}</p> <button className=''>Edit</button><button className=''>Delete</button></div>): <p>No comments about this country yet. Be the first to add one!</p>  }

            </div>
        </div>
    )
}
