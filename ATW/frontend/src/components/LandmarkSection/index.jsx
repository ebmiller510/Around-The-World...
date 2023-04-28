import { useState, useEffect } from 'react'
import { postLandmark, getLandmarks } from '../../../utils/backend'


export default function LandmarkSection({ countryName }) {
    //saving form to state 
    const [landmark, setLandmark] = useState([])
    const [showLandmarkForm, setShowLandmarkForm] = useState(false)
    const [landmarkFormData, setLandmarkFormData] = useState({
        name: '',
        country: '', countryName: countryName
    })  

    useEffect(() => {
        getLandmarks(countryName)
            .then(landmark => {
                setLandmark(landmark);
            });
    },[]);

    function handleInputChange(event) {
        setLandmarkFormData({
            ...landmarkFormData,
            [event.target.name]: event.target.value
        })
    }

    function toggleLandmarkForm() {
        setShowLandmarkForm(!showLandmarkForm)
    }

    function refreshLandmarks() {
        getLandmarks(countryName)
            .then(newLandmarkData => setLandmark(newLandmarkData))
    }

    function handleSubmit(event) {
        event.preventDefault()
        setLandmarkFormData({
            name: '',
            country: ''
        })
        setShowLandmarkForm(false)
        postLandmark({ ...landmarkFormData, countryName: countryName })
            .then(() => refreshLandmarks())
    }

    let landmarkElements = (
            <p key="0" className='text-center'>No landmarks have been added. Be the first to add one!</p>
    );
    if (landmark.length > 0) {
        landmarkElements = landmark.map(landmark => (
            <div key={landmark._id}>
                <p>{landmark.name} --- {landmark.country}</p>
                <button className=''>Edit</button>
                <button className=''>Delete</button>
            </div>
        ));
    }

    let btnText = 'Add Landmark'
    if (showLandmarkForm) {
        btnText = 'Close Form'
    }

    return (
        <div className='comment-section bg-gray-300 rounded-lg p-4 pb-10 mt-4 space-y-4 relative'>
            <h2 className='viewer-reviews'>Landmarks</h2>
            <button
                onClick={toggleLandmarkForm}
                className="top-0 right-5 absolute text-white hover:bg-green-800 font-bold py-2 px-4 bg-green-900 rounded cursor-pointer mr-2"
            >
                {btnText}
            </button>
            {
                showLandmarkForm && <form
                    onSubmit={handleSubmit}
                    className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto text-right">
                    <input
                        name="name"
                        className="px-2 py-1 w-full bg-gray-100"
                        placeholder="Landmark Name"
                        value={landmarkFormData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <input
                        name="country"
                        className="px-2 py-1 w-full bg-gray-100"
                        placeholder="Country Where Landmark is Located"
                        value={landmarkFormData.country}
                        onChange={handleInputChange}
                    />
                    <br />
                    {/* <textarea
                        name="content"
                        className="p-2 my-2 h-[100px] w-full bg-gray-100"
                        placeholder="Share your thoughts!"
                        value={landmarkFormData.content}
                        onChange={handleInputChange}
                    /> */}
                    <button
                        type="submit"
                        className="text-white hover:bg-gray-800 font-bold py-2 px-4 bg-gray-700 rounded cursor-pointer mr-2">
                        Post
                    </button>
                </form>
            }
            {landmarkElements}
        </div>
    )
}
            
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


//     // rendering form for creating landmark onSubmit
//     function createLandmarkForm(){ 
//         if (landmarkForm === null){
//             setLandmarkForm(
//                 console.log('landmark form goes here')
//             // <form
//             // className=''>
//             //     <input name='name' className='' placeholder='Name of Landmark' value={landmarkFormData.name}/>
//             //     <br />
//             //     <textarea name='country' className='' placeholder='Country Where Landmark is Located' value={landmarkFormData.country}/>   
//             //     <br />
//             // </form>
//             )
//         }else{
//             setLandmarkForm(null)
//         }
//     }

//     let buttonText = 'Add Landmark'
//     if (landmarkForm !== null){
//         buttonText = 'Close Form'
//     }

//     return (
//         <div className='landmarksection'>
//                 <button className='right-5'
//                     onClick={createLandmarkForm}>
//                         {buttonText}
//                 </button>
//             <div className='landmarks'>
//                 {/* conditionally render landmark name and location if there are any */}
//                 {landmarks.length > 0 ?  landmarks.map(landmark => <div key={landmark._id} >
//                     <p>{landmark.name} --- {landmark.country}</p>
//                     <button className=''>Edit</button>
//                     <button className=''>Delete</button>
//                     </div>): <p>No landmarks have been added. Be the first to add one!</p>  }

//             </div>
//         </div>
//     )
// }
