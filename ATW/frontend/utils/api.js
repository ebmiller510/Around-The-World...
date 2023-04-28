// // store axios requests for the third party API 
 //  async function to gather API data

 export async function getCountries(){
    const response = await fetch('https://restcountries.com/v3.1/all')
    const apiResponse = await response.json()
    return apiResponse
    } 

// async function to gather movie API data