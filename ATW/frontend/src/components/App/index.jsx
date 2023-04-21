// NODE packages
import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'

// import components 
import Card from '../CountryCard'
import HomePage from '../HomePage'
import DetailsPage from '../DetailsPage'
import SearchPage from '../SearchPage'
// import styles
import './styles.css'

// app component
function App() {
  // Q: why is the use state an empty array vs 0 in other apps 
  const [country, setCountry] = useState([])
  const [detailsPage, setDetailsPage] = useState({})
  
  console.log(import.meta.env.VITE_TEST_VAR)
    //async function to gather API data
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
      <ul className="flex ">
        <h1 className=''>Around The World</h1>

            <li className="mr-3">
            <a className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3" href="/search">Search</a>
            </li>
  
          <li className="mr-3">
            <a className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3" href="/">Home</a>
          </li>

          </ul>

      </nav>
      <div className='header'>
       
          {/* <h3>Log-In or Sign-Up Here</h3> */}
        
      </div>

    <Routes>
      <Route path='/' element={<HomePage galleryContent={cardGallery}/>}/>
      <Route path='/details/:id' element={<DetailsPage detailsPage={detailsPage}/>}/>
      <Route path='/search' element={<SearchPage  setDetailsPage={setDetailsPage}/>} />
    </Routes>

    </div>
  )
}

export default App
