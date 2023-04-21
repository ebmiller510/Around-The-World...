import { useState } from 'react'
import Card from '../Card'

export default function SearchPage(props) {
    const  [searchString, setSearchString] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const handleSearchSubmit = async (event) => {
        event.preventDefault()
        const res = await fetch(`https://restcountries.com/v3.1/name/${searchString}`)
        const apiResponse = await res.json()
        setSearchResults([...apiResponse])
    }
    // default the gallery content 
    let countryArray = null
    if (searchResults.length > 0) {
        countryArray = searchResults.map((countree, index) => {
            return <Card key={index} countreeCard={countree} updateDetailPage={props.setDetailsPage}/>
        })
    }   


    return (
        <>
            <form onSubmit={handleSearchSubmit} className='text-center' >
                <label 
                    htmlFor='search'
                    className='text-center font-medium'
                    >Search for a Country
                </label>

                <input
                    onChange={event => setSearchString(event.target.value)}
                    placeholder='Search the World...'
                    name='search'
                    value={searchString}
                    className="p-2 w-[60vw] rounded border border-gray-300 focus:outline-none focus:border-gray-500"

                    />

                <button type='submit'>Search</button>
            
            
            </form>

            <div className='gallery flex flex-wrap'>
                {countryArray}
            </div>
        </>
    )
}
