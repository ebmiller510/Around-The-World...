import { useState } from "react";
import { updateLandmark, deleteLandmark } from "../../../utils/backend";

export default function Landmark({data, refreshLandmarks }){
    const [showEditForm, setShowEditForm] = useState(false)
    const [editFormData, setEditFormData] = useState({
        name: data.name,
        country: data.country
})

function handleInputChange(event) {
    setEditFormData({
        ...editFormData,
        [event.target.name]: event.target.value
    })
}

function handleSubmit(event) {
    event.preventDefault()
    setShowEditForm(false)
    updateLandmark(editFormData, data._id)
        .then(() => refreshLandmarks())
}

function handleDelete() {  
    deleteLandmark(data._id)
        .then(() => refreshLandmarks())
}

let landmarkElement = <div className="bg-gray-100 rounded-lg p-4 my-4 border-indigo-700 border-2 w-[80vw] mx-auto">
                            <div className="flex justify-between">
                            <div className="flex">
                                <p className="font-bold my-2 mr-4">{data.name}</p>
                                <p className="my-2">{data.country}</p>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => { setShowEditForm(true) }}
                                    className="inline-block rounded-full px-3 py-2 text-sm font-semibold bg-indigo-200 mr-2">
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="inline-block rounded-full px-3 py-2 text-sm font-semibold bg-red-200 ml-2">
                                    Delete
                                </button>
                            </div>
                            </div>
                     </div>

if (showEditForm) {
    landmarkElement = <form
        onSubmit={handleSubmit}
        className="bg-gray-100 rounded-lg p-4 my-4 border-gray-700 border-2 w-[80vw] mx-auto text-right">
        <input
            onChange={handleInputChange}
            value={editFormData.name}
            className="border-2 border-gray-700 rounded-lg p-2 my-2 w-full"
            placeholder="Name of Landmark"
            name="name"
            />
        <input
            onChange={handleInputChange}
            value={editFormData.country}
            className="border-2 border-gray-700 rounded-lg p-2 my-2 w-full"
            placeholder="Country"
            name="country"
            />
        <div>
            <button
                type="button"
                onClick={() => { setShowEditForm(false) }}
                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mr-2">
                Cancel
            </button>
            <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                Save
            </button>

        </div>
    </form>
}

return landmarkElement
}

{/* <div key={landmark._id}>
<p>{landmark.name} --- {landmark.country}</p>
<button className=''>Edit</button>
<button className=''>Delete</button>
</div> */}