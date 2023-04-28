import { useEffect, useState } from 'react'

import { getLandmarks, getComments } from '../../../utils/backend'
import LandmarkSection from '../LandmarkSection'
import CommentSection from '../CommentSection'

 export default function DetailsPage({ detailsPage, updateLandmarks, updateComments }) {
    const  [landmarks, setLandmarks] = useState([])
    const [comments, setComments] = useState([])

    // for landmarks model
    useEffect(() => {
        // query the landmarks
        getLandmarks(detailsPage.name.common)
        // set the state of the landmarks 
        .then(landmarks => setLandmarks(landmarks))
    }, [])

    // // for comments model
    useEffect(() => {
        getComments(detailsPage.name.common)
        .then(comments => setComments(comments))
    }, [])

// languages is an object, so we need to convert to be iterable 
        let languageArray = ''
        const langs = detailsPage.languages ? (
            languageArray  = Object.entries(detailsPage.languages)
                .map((language) => {
                    
                    return (
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={language[0]}>{language[1]}</span>)},
                        <span>{languageArray}</span>
            )
        ) : <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">No language data available</span>

    let currencyArray = ''
    for(let key in detailsPage.currencies){
        currencyArray += ' | ' + detailsPage.currencies[key].name  
    }

    return (
      <div>
        <img className="w-full"  src={detailsPage.flags.png} alt={detailsPage.flags.alt}/>
         <h1>Details About { detailsPage.name.common }</h1>
            <p>Capital: { detailsPage.capital }</p>
            <p> Region: { detailsPage.continents }</p>
            {/* languages spoken */}
                <p>{langs}</p>
            {/* currencies */}
                <p>Acceptable Currency {currencyArray}</p>
            {/* population */}
                <p> Population: { detailsPage.population } </p>

        <div className='commentsection'>
            <div className='comments'>
                {/* conditionally render comment name and comment */}
                <CommentSection comments={comments} countryName={detailsPage.name.common} updateComments={setComments}/>
            </div>
        </div>

        <div className='landmarksection'>
            <div className='landmarks'>
            <LandmarkSection landmarks={landmarks} />
            </div>
        </div>

      </div>
    )
     }