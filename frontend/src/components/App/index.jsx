// NODE packages
import { useState, useEffect } from 'react'
import {Routes, Route, Link} from 'react-router-dom'

// import components 
import Card from '../CountryCard'
import HomePage from '../HomePage'
import DetailsPage from '../DetailsPage'
import SearchPage from '../SearchPage'
import AuthFormPage from '../AuthFormPage'
import { getCountries } from '../../../utils/api'

// import { getCountryData } from '../../../utils/backend'

// import styles
import './styles.css'

// app component
function App() {
  // Q: why is the use state an empty array vs 0 in other apps 
  const [country, setCountry] = useState([])
  const [detailsPage, setDetailsPage] = useState({})
  const [movingText, setMovingText] = useState('Around The World...')

  
   //useEffect to run getData function
    useEffect(() => {
      getCountries()
        .then(country => setCountry(country))

    //  update the moving text
    const interval = setInterval(() => {
      // slicing the first character to the end of the string
      setMovingText(text => text.slice(1) + text[0])
    }, 230) 

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval)


    }, [])
  

  let cardGallery = <h2>Loading Around The World...</h2>

  if (country.length > 0) {
    cardGallery = country.map((countree, index) => <Card key={index} countreeCard={countree} updateDetailPage={setDetailsPage}/>)
  }


  return (

    <div className="landing-page">
      
      <ul className="flex h-60 justify-center py-40 flex-wrap flex-col ">
        <div>

            <div className=''>
              <h1 className=' font-headerz text-white-400/75 text-8xl animation:ease-in-out border-4 border-dotted'>{movingText}</h1>
            </div>

            <div className='py-10 flex flex-wrap'>
                <a className="rounded text-blue-500 mr-10 " href="/" >
                  <button variant="gradient" size="sm" className="py-2 px-10  hover:bg-gray-200" >
                    <span className='font-headerz'>Home</span>
                  </button>
                </a>

                <a className="inline-block rounded text-blue-500 mr-10" href="/search">
                  <button variant="gradient" size="sm" className="py-2 px-10 hover:bg-gray-200" href="/search">
                    <span className='font-headerz'>Search</span>
                  </button>
                </a>
                {/* log in and sign up add links */}
                <Link to="/auth/login" className="inline-block rounded text-blue-500 mr-10 ">
                  <button variant="gradient" size="sm" className=" py-2 px-10 hover:bg-gray-200" >
                    <span className='font-headerz'>Log In</span>
                  </button>
                </Link>

                <Link to="/auth/signup" className="inline-block rounded text-blue-500 mr-10 " >
                  <button variant="gradient" size="sm" className=" py-2 px-10 hover:bg-gray-200" >
                    <span className='font-headerz'>Sign Up</span>
                  </button>
                </Link>

            </div>


          </div>
      </ul>

    
      <div className='header'>
       
          {/* <h3>Log-In or Sign-Up Here</h3> */}
        
      </div>

    <Routes>
      <Route path='/' element={<HomePage galleryContent={cardGallery}/>}  />
      <Route path='/details/:id' element={<DetailsPage detailsPage={detailsPage} updateLandmark={setDetailsPage} updateComments={setDetailsPage}/>}  />
      <Route path='/search' element={<SearchPage  setDetailsPage={setDetailsPage}/>} />
      <Route path='*' element={<h1>404 Not Found</h1>}/>
      <Route path="/auth/:formType" element={<AuthFormPage />} />

    </Routes>

    </div>
  )
}

export default App
