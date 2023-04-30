// store axios requests to the backend
import axios from 'axios'
const authHeader = { headers: { 'Authorization': localStorage.getItem('userToken') } }

// ---------- USERS ----------
//------------------------------
export async function signUp(user) {
    const { data } = await axios.post('/api/users/signup', user)
    return data
}

export async function logIn(user) {
    const { data } = await axios.post('/api/users/login', user)
    console.log({data})
    return data
}



// ---------- LANDMARKS ----------
//------------------------------
export async function getLandmarks( countryName){
    // getting all landmarks for whatever country is passed in
    const response = await axios.get(`/api/landmarks/country/${countryName}`)
    return response.data
}

export async function postLandmark(landmark){
    const response = await axios.post('/api/landmarks/', landmark, authHeader)
    return response.data
}

export async function updateLandmark(landmark, id){
    const response = await axios.put(`/api/landmarks/${id}`, landmark, authHeader)
    return response.data
}
export async function deleteLandmark(id){
    const response = await axios.delete(`/api/landmarks/${id}`, authHeader)
    return response.data
}

// ---------- COMMENTS ----------
//------------------------------
export async function getComments(countryName){
    // get all comments for whatever country is passed in
    const response = await axios.get(`/api/comments/country/${countryName}`)
    return response.data
}

export async function postComment(comment){
    // first arg is the endpoint and the second arg is req body
    const response = await axios.post('/api/comments/', comment, authHeader)
    return response.data
}

export async function updateComment(comment, id){
    const response = await axios.put(`/api/comments/${id}`, comment, authHeader)
    return response.data
}

export async function deleteComment(id){
    const response = await axios.delete(`/api/comments/${id}`, authHeader)
    return response.data
}