import { useEffect, useState } from 'react'
import { getComments, postComment } from '../../../utils/backend'
import Comment from '../Comment'

export default function CommentSection({ countryName, updateComments }) {

//     //saving form to state so we can change the value of the form and not have to touch the comments directly
    const [comment, setComment] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createFormData, setCreateFormData] = useState({
        name: '',
        comment: '', countryName: countryName
    })

    // Query the database for all comment that pertain to this 
    useEffect(() => {
        getComments(countryName)
          .then(comment => {
            setComment(comment);
          })
      }, []);


    // Update the form fields as the user types
    function handleInputChange(event) {
        setCreateFormData({
            ...createFormData,
            [event.target.name]: event.target.value
        })
    }

    // Render a form that allows a user to create a comment on submit
    function toggleCreateForm() {
        setShowCreateForm(!showCreateForm)
    }

    // Update the comment in the comment section after a database transaction
    function refreshComments() {
        getComments(countryName)
            .then(newCommentData => setComment(newCommentData))
    }

    // Execute form submission logic
    function handleSubmit(event) {
        event.preventDefault()
        setCreateFormData({
            name: '',
            comment: ''
        })
        setShowCreateForm(false)
        postComment({ ...createFormData, countryName: countryName })
            .then(() => refreshComments())
    }


    // conditionally render comment
    let commentElements = (
        <p key="0" className="text-center mb-5 mt-8">
          No comments yet. Be the first to comment!
        </p>
      );
      if (comment.length > 0) {
        commentElements = comment.map((comment) => (
          <Comment 
          key={comment._id} 
          data={comment} 
          refreshComments={refreshComments} />
        ));
      }

      
    // conditionally display the text of the create form button
    let btnText = 'Add Comment'
    if (showCreateForm) {
        btnText = 'Close'
    }

    return (
        <div className=' relative h-fit w-11/12 bg-white rounded-lg border pt-4 mx-auto mt-20'>
            <div className='absolute px-2 top-0 -left-[0.5] bg-indigo-200 rounded-tl-lg rounded-br-lg'>
                <h2 className='viewer-reviews text-md font-semibold text-gray-800'>Comments</h2>
            </div>

            <button
                type='button'
                onClick={toggleCreateForm}
                className=" inline-block rounded-full px-3 py-1 text-sm font-semibold absolute top-2 right-2 bg-indigo-200"
            >
                {btnText}
            </button>
            {
                showCreateForm && 
                
                <form
                    onSubmit={handleSubmit}
                    className="bg-indigo-100 rounded-lg p-4 my-8 border-gray-700 border-2 w-[80vw] mx-auto text-right">
                    <input
                        name="name"
                        className="px-2 py-1 w-full bg-indigo-100 border border-gray-700 rounded"
                        placeholder="Your name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <textarea
                        name="comment"
                        className="p-2 my-2 h-[100px] px-2 py-1 w-full bg-indigo-100 border border-gray-700 rounded"
                        placeholder="Share your thoughts!"
                        value={createFormData.comment}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                        Post
                    </button>
                </form>
            }
            {commentElements}
        </div>
    )
}
