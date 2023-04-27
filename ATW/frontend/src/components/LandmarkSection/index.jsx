import { useState } from 'react'
// import { postLandmark, getLandmarks } from '../../../utils/backend'


export default function LandmarkSection({ landmarks }) {
    //saving form to state 
    const [landmarkForm, setLandmarkForm] = useState((null))
    // const [landmarkFormData, setLandmarkFormData] = useState({
    //     name: '',
    //     country: ''
    // })
    
    // function handleInputChange(event){
    //    setLandmarkFormData({ ...landmarkFormData,
    //      [event.target.name]: event.target.value })
    // }
    
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log(landmarkFormData)
    // }


    // rendering form for creating landmark onSubmit
    function createLandmarkForm(){ 
        if (landmarkForm === null){
            setLandmarkForm(
                console.log('landmark form goes here')
            // <form
            // className=''>
            //     <input name='name' className='' placeholder='Name of Landmark' value={landmarkFormData.name}/>
            //     <br />
            //     <textarea name='country' className='' placeholder='Country Where Landmark is Located' value={landmarkFormData.country}/>   
            //     <br />
            // </form>
            )
        }else{
            setLandmarkForm(null)
        }
    }

    let buttonText = 'Add Landmark'
    if (landmarkForm !== null){
        buttonText = 'Close Form'
    }

    return (
        <div className='landmarksection'>
                <button className='right-5'
                    onClick={createLandmarkForm}>
                        {buttonText}
                </button>
            <div className='landmarks'>
                {/* conditionally render landmark name and location if there are any */}
                {landmarks.length > 0 ?  landmarks.map(landmark => <div key={landmark._id} >
                    <p>{landmark.name} --- {landmark.country}</p>
                    <button className=''>Edit</button>
                    <button className=''>Delete</button>
                    </div>): <p>No landmarks have been added. Be the first to add one!</p>  }

            </div>
        </div>
    )
}
