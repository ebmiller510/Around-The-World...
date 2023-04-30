// import MovieCard from "../MovieCard"


// export default function MovieSection({ movies, languages }) {
//     let movieArray = ''
//     const movieList = movies ? (
//         movieArray = Object.entries(movies)
//             .map((movie) => {
//                 return (
//                     <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" 
//                     key={movie[0]}>{movie[1]}</span>
//                 )
//             }),
//         <span>{movieArray}</span>
//     ) : <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">No movie data available</span>

//     return (
//         <div>
//             <p>{movieList}</p>
//         </div>
//     )
// }