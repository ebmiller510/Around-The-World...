
// // store axios requests for the third party API 
 //  async function to gather API data


 export async function getCountries(){
    const response = await fetch('https://restcountries.com/v3.1/all')
    const apiResponse = await response.json()
    return apiResponse
    } 
 
// async function to gather movie API data
export async function getMovies(countryLangCode){
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&with_original_language=${countryLangCode}`)
    const apiRes = await res.json()
    console.log(apiRes.results)
    return apiRes.results
    }