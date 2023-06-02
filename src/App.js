import {useEffect ,useState} from "react";
import './App.css';
import MovieCard from "./MovieCard";
import searchIcon from './search.svg';

// const API_URL = 'http://www.omdbapi.com?apikey=ee1fac1d'
const API_URL = process.env.REACT_APP_API_URL;


// const movie1 = {
//     "Title": "Amazing Spiderman Syndrome",
//     "Year": "2012",
//     "imdbID": "tt2586634",
//     "Type": "movie",
//     "Poster": "N/A"
// }

const App = () =>{
    const[movies, setMovies] = useState([]);
    const[searchTerm, setSearchTerm]  =useState('');

    // To call th API
    const searchMovies = async (title) => {
        const response =await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
        console.log(data);
    }
    
    useEffect(() => {
        searchMovies('spiderman');
    }, []);
    
    return(
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for a movie"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies.length > 0
                ?(
                <div className="container">
                    {movies.map((movie,index) => (
                        <MovieCard key={index} movie ={movie}/>
                    ))}
                </div>
                ): (
                    <div className="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;