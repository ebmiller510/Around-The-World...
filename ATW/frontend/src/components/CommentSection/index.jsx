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
        // prevent the page from reloading
        event.preventDefault()
        // clear the form
        setCreateFormData({
            name: '',
            comment: ''
        })
        // close the form
        setShowCreateForm(false)
        // create the comment in the backend
        postComment({ ...createFormData, countryName: countryName })
            .then(() => refreshComments())
        // console.log(createFormData)
    }


    // conditionally render comment
    let commentElements = (
        <p key="0" className="text-center">
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
        <div className='comment-section bg-gray-300 rounded-lg p-4 pb-10 mt-4 space-y-4 relative'>
            <h2 className='viewer-reviews'>Comments</h2>
            <button
                type='button'
                onClick={toggleCreateForm}
                className="top-0 right-5 absolute text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>
            {
                showCreateForm && <form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto text-right">
                    <input
                        name="name"
                        className="px-2 py-1 w-full bg-gray-100"
                        placeholder="Your name"
                        value={createFormData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <textarea
                        name="comment"
                        className="p-2 my-2 h-[100px] w-full bg-gray-100"
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
