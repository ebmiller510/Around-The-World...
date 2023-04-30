export default function MovieCard({movie}){
    const imageUrl = 'https://image.tmdb.org/t/p/w500';
return (
    <div>
        <div className="p-10">  
            <div className="max-w-sm rounded overflow-hidden shadow-lg ">
            <img className="w-full"  src={`${imageUrl}${movie.backdrop_path}`}/>
            {/* <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{movie}</div>
                <p className="text-gray-700 text-base">
                </p>
            </div>
            c
            <p>Currency {currencyArray}</p>

            <div className="px-6 pt-4 pb-2">
                <span>{langs}</span>
                </div> */}

            </div>
        </div>
    </div> 
)
}