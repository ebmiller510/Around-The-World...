import { Link } from 'react-router-dom'
import './styles.css'


export default function Card({ countreeCard, updateDetailPage }) {
    // currencies is an object, so we need to convert to be iterable
    let currencyArray = ''
    for(let key in countreeCard.currencies){
        currencyArray += ' | ' + countreeCard.currencies[key].name  
    }

    // languages is an object, so we need to convert to be iterable 
    let languageArray = ''
    const langs = countreeCard.languages ? (
        languageArray  = Object.entries(countreeCard.languages)
            .map((language) => {
                
                return (
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={language[0]}>{language[1]}</span>)},
                    <span>{languageArray}</span>
    )
    ) : <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">No language data available</span>

  return (
    <Link to={`/details/${countreeCard.name.common}`} onClick={()=> { updateDetailPage(countreeCard) }}>
        <div className='hover:scale-110 hover:ease-out duration-200'>
            <div className="p-10">  
                <div className="max-w-sm rounded overflow-hidden shadow-xl border border-opacity-10 hover:border-2 ">
                <img className="w-full"  src={countreeCard.flags.png} alt={countreeCard.flags.alt}/>
                <div className="px-6 py-4">
                    <div className=" font-headerz font-bold text-3xl mb-2">{countreeCard.name.common}</div>
                    <p className="text-gray-700 text-base">
                        {/* Currencies: {countreeCard.currencies} */}
                    </p>
                </div>
                
                <p>Currency {currencyArray}</p>

                <div className="px-6 pt-4 pb-2">
                    <span>{langs}</span>
                    </div>

                </div>
            </div>
        </div>
    </Link>
  )
}
