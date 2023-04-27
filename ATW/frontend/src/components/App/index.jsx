// NODE packages
import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'

// import components 
import Card from '../CountryCard'
import HomePage from '../HomePage'
import DetailsPage from '../DetailsPage'
import SearchPage from '../SearchPage'
// import { getCountryData } from '../../../utils/backend'

// import styles
import './styles.css'

// app component
function App() {
  // Q: why is the use state an empty array vs 0 in other apps 
  const [country, setCountry] = useState([])
  const [detailsPage, setDetailsPage] = useState({})
  
    
  //  async function to gather API data
    async function getData(){
    const response = await fetch('https://restcountries.com/v3.1/all')
    const apiResponse = await response.json()
    setCountry(apiResponse)
    console.log(apiResponse)
    return apiResponse
    } 


   //useEffect to run getData function
    useEffect(() => {
      getData()
    }, [])
  
  let cardGallery = <h2>Loading Around The World...</h2>

  if (country.length > 0) {
    cardGallery = country.map((countree, index) => <Card key={index} countreeCard={countree} updateDetailPage={setDetailsPage}/>)
  }


  return (

    <div className="landing-page">
      <nav>
      <ul className="flex h-80 justify-center py-60 flex-wrap flex-col ">
        <div>

            <div className=''>
              <h1 className='text-slate-400/75 text-12xl'>Around The World</h1>
            </div>

            <div className='py-10'>
                <a className="inline-block rounded text-blue-500 mr-10 " href="/" >
                  <button variant="gradient" size="sm" className=" py-2 px-10 hidden lg:inline-block hover:bg-gray-200" >
                    <span>Home</span>
                  </button>
                </a>

                <a className="inline-block rounded text-blue-500 ml-10" href="/search">
                  <button variant="gradient" size="sm" className="py-2 px-10 hidden lg:inline-block hover:bg-gray-200" href="/search">
                    <span>Search</span>
                  </button>
                </a>
            </div>


          </div>
      </ul>

      </nav>
      <div className='header'>
       
          {/* <h3>Log-In or Sign-Up Here</h3> */}
        
      </div>

    <Routes>
      <Route path='/' element={<HomePage galleryContent={cardGallery}/>}  />
      <Route path='/details/:id' element={<DetailsPage detailsPage={detailsPage} updateLandmark={setDetailsPage} updateComments={setDetailsPage}/>}  />
      <Route path='/search' element={<SearchPage  setDetailsPage={setDetailsPage}/>} />
      <Route path='*' element={<h1>404 Not Found</h1>}/>
    </Routes>

    </div>
  )
}

export default App
