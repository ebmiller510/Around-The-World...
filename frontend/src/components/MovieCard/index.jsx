export default function MovieCard({movie}){
    const imageUrl = 'https://image.tmdb.org/t/p/w500';
return (
    <div className="p-3">
    <div className="">
        <div className="w-72 h-96 border hover:border-dotted hover:border-4 overflow-y-auto">  
            <div className="rounded shadow-lg h-3/5 w-full p-3">
            <img className="w-full h-full overflow-x-auto object-cover"  src={`${imageUrl}${movie.backdrop_path}`}/>
            <div className="w-full h-1/4 p-3 ">
                <a href="#" className=" hover:text-red-600 text-white-400">
                <span className="text-lg font-semibold uppercase tracking-wide ">{movie.original_title}</span>
                </a>
                <br />
                <span className="text-sm font-semibold uppercase tracking-wide ">"{movie.title}"</span>
                
                <p className="text-white-600 text- leading-5 mt-1 ">{movie.overview}</p>
            </div>
          

            </div>
        </div>
    </div> 
    </div>
    
)
}