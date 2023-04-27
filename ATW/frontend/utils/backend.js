// store axios requests to the backend

import axios from 'axios'

// ---------- LANDMARKS ----------
//------------------------------
export async function getLandmarks(countryName){
    const response = await axios.get(`/api/landmarks/country/${countryName}`)
    return response.data
}

export async function postLandmark(landmark){
    const response = await axios.post('/api/landmarks/', landmark)
    return response.data
}

export async function updateLandmark(landmark, id){
    const response = await axios.put(`/api/landmarks/${id}`, landmark)
    return response.data
}
export async function deleteLandmark(id){
    const response = await axios.delete(`/api/landmarks/${id}`)
    return response.data
}

// ---------- COMMENTS ----------
//------------------------------
export async function getComments(countryName){
    const response = await axios.get(`/api/comments/country/${countryName}`)
    return console.log(response.data + "this is the response")
}

export async function postComment(comment){
    const response = await axios.post('/api/comments/', comment)
    return response.data
}

export async function updateComment(comment, id){
    const response = await axios.put(`/api/comments/${id}`, comment)
    return response.data
}

export async function deleteComment(id){
    const response = await axios.delete(`/api/comments/${id}`)
    return response.data
}