import { useEffect, useState } from 'react'

import { getLandmarks, getComments } from '../../../utils/backend'
import LandmarkSection from '../LandmarkSection'
import CommentSection from '../CommentSection'
import { getMovies } from '../../../utils/api'
import MovieCard from '../MovieCard'

 export default function DetailsPage({ detailsPage }) {
    const  [landmarks, setLandmarks] = useState([])
    const [comments, setComments] = useState([])
    const [movies, setMovies] = useState([])
    

    // for movies
    useEffect(() => {
            const code = {
                "aar": "aa",
                "abk": "ab",
                "afr": "af",
                "aka": "ak",
                "alb": "sq",
                "amh": "am",
                "ara": "ar",
                "arg": "an",
                "hye": "hy",
                "asm": "as",
                "ava": "av",
                "ave": "ae",
                "aym": "ay",
                "aze": "az",
                "bak": "ba",
                "bam": "bm",
                "eus": "eu",
                "bel": "be",
                "ben": "bn",
                "bih": "bh",
                "bis": "bi",
                "tib": "bo",
                "bos": "bs",
                "bre": "br",
                "bul": "bg",
                "mya": "my",
                "cat": "ca",
                "cze": "cs",
                "cha": "ch",
                "che": "ce",
                "zho": "zh",
                "chu": "cu",
                "chv": "cv",
                "cor": "kw",
                "cos": "co",
                "cre": "cr",
                "wel": "cy",
                "dan": "da",
                "ger": "de",
                "div": "dv",
                "dut": "nl",
                "dzo": "dz",
                "gre": "el",
                "eng": "en",
                "epo": "eo",
                "est": "et",
                "ewe": "ee",
                "fao": "fo",
                "per": "fa",
                "fij": "fj",
                "fin": "fi",
                "fra": "fr",
                "fry": "fy",
                "ful": "ff",
                "geo": "ka",
                "gla": "gd",
                "gle": "ga",
                "glg": "gl",
                "glv": "gv",
                "grn": "gn",
                "guj": "gu",
                "hat": "ht",
                "hau": "ha",
                "heb": "he",
                "her": "hz",
                "hin": "hi",
                "hmo": "ho",
                "hrv": "hr",
                "hun": "hu",
                "ibo": "ig",
                "ice": "is",
                "ido": "io",
                "iii": "ii",
                "iku": "iu",
                "ile": "ie",
                "ina": "ia",
                "ind": "id",
                "ipk": "ik",
                "ita": "it",
                "jav": "jv",
                "jpn": "ja",
                "kal": "kl",
                "kan": "kn",
                "kas": "ks",
                "kau": "kr",
                "kaz": "kk",
                "khm": "km",
                "kik": "ki",
                "kin": "rw",
                "kir": "ky",
                "kom": "kv",
                "kon": "kg",
                "kor": "ko",
                "kua": "kj",
                "kur": "ku",
                "lao": "lo",
                "lat": "la",
                "lav": "lv",
                "lim": "li",
                "lin": "ln",
                "lit": "lt",
                "ltz": "lb",
                "lu": "lub",
                "lg": "lug",
                "mk": "mkd",
                "mh": "mah",
                "ml": "mal",
                "mi": "mri",
                "mr": "mar",
                "ms": "may",
                "mg": "mlg",
                "mt": "mlt",
                "mn": "mon",
                "na": "nau",
                "nv": "nav",
                "nr": "nbl",
                "nd": "nde",
                "ng": "ndo",
                "ne": "nep",
                "nn": "nno",
                "nb": "nob",
                "no": "nor",
                "ny": "nya",
                "oc": "oci",
                "oj": "oji",
                "or": "ori",
                "om": "orm",
                "os": "oss",
                "pa": "pan",
                "pi": "pli",
                "pl": "pol",
                "pt": "por",
                "ps": "pus",
                "qu": "que",
                "rm": "roh",
                "ro": "ron",
                "rn": "run",
                "ru": "rus",
                "sg": "sag",
                "sa": "san",
                "si": "sin",
                "sk": "slk",
                "sl": "slv",
                "se": "sme",
                "sm": "smo",
                "sn": "sna",
                "sd": "snd",
                "so": "som",
                "st": "sot",
                "es": "spa",
                "sc": "srd",
                "sr": "srp",
                "ss": "ssw",
                "su": "sun",
                "sw": "swa",
                "sv": "swe",
                "ty": "tah",
                "ta": "tam",
                "tt": "tat",
                "te": "tel",
                "tg": "tgk",
                "tl": "tgl",
                "th": "tha",
                "ti": "tir",
                "to": "ton",
                "tn": "tsn",
                "ts": "tso",
                "tk": "tuk",
                "tr": "tur",
                "tw": "twi",
                "ug": "uig",
                "uk": "ukr",
                "ur": "urd",
                "uz": "uzb",
                "ve": "ven",
                "vi": "vie",
                "vo": "vol",
                "wa": "wln",
                "wo": "wol",
                "xh": "xho",
                "yi": "yid",
                "yo": "yor",
                "za": "zha",
                "zu": "zul"
                }
            let countryLangCode = code[Object.keys(detailsPage.languages)[0]]
            console.log(countryLangCode)

        getMovies(countryLangCode)
            .then(movies => setMovies(movies))
    }, [])

    
    let movieGallery = <p>Loading {detailsPage.languages[0]} movies</p>

    if (movies.length > 0){
        movieGallery = movies.map((movie, index) => <MovieCard key={index} movie={movie} />)         
    }

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
            {/* movies in langs of this country */}
                <div>{movieGallery}</div>
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
            <LandmarkSection landmarks={landmarks} countryName={detailsPage.name.common} updateLandmarks={setLandmarks} />
            </div>
        </div>

      </div>
    )
     }