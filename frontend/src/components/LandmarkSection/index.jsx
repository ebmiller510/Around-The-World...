import { useState, useEffect } from 'react'
import { postLandmark, getLandmarks } from '../../../utils/backend'
import Landmark from '../Landmark'

export default function LandmarkSection({ countryName, updateLandmarks }) {
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
            <p key="0" className='text-center mb-5 mt-8'>No landmarks have been added to {}. Be the first to add one!</p>
    );
    if (landmark.length > 0) {
        landmarkElements = landmark.map(landmark => (
            <Landmark
            key={landmark._id}
            data={landmark}
            refreshLandmarks={refreshLandmarks}
            />
        ));
    }

    let btnText = 'Add Landmark'
    if (showLandmarkForm) {
        btnText = 'Close'
    }

    return (
        <div className='relative h-fit w-11/12 bg-white rounded-lg border pt-4 mx-auto mt-20 mb-20'>
            <div className='absolute px-2 top-0 -left-[0.5] bg-indigo-200 rounded-tl-lg rounded-br-lg'>
                <h2 className='viewer-reviews text-md font-semibold text-gray-800'>Landmarks</h2>

            </div>
            <button
                onClick={toggleLandmarkForm}
                className="inline-block rounded-full px-3 py-1 text-sm font-semibold absolute top-2 right-2 bg-indigo-200"
            >
                {btnText}
            </button>
            {
                showLandmarkForm && <form
                    onSubmit={handleSubmit}
                    className="bg-indigo-100 rounded-lg p-4 my-8 border-gray-700 border-2 w-[80vw] mx-auto text-right">
                    <input
                        name="name"
                        className="px-2 py-1 w-full bg-indigo-100 border border-gray-700 rounded"
                        placeholder="Landmark Name"
                        value={landmarkFormData.name}
                        onChange={handleInputChange}
                    />
                    <br />
                    <input
                        name="country"
                        className="p-2 my-2 px-2 py-1 w-full bg-indigo-100 border border-gray-700 rounded"
                        placeholder="Country Where Landmark is Located"
                        value={landmarkFormData.country}
                        onChange={handleInputChange}
                    />
                    <br />
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
    