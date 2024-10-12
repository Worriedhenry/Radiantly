import React, { useEffect } from "react";
import axios from "axios";
import PokeCard from "./pokemonCard";


export default function Search() {
    const [data, setData] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [query, setQuery] = React.useState(null);
    const [search, setSearch] = React.useState("");
    const [loading, setLoading] = React.useState(false);


    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true)
        getPokemonData();
        setLoading(false)
    }, [page])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setQuery(search);
        getPokemonDataByName(search);

    }

    const getPokemonData = async () => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
        if (res.status === 200) {
            console.log(res.data?.results);
            setData(res.data?.results);
        }
    }

    const getPokemonDataByName = async (name) => {
        setData(null);
        try {
            setLoading(true);
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            setData([{ name: name }])
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            setData(null)

        }
    }

    const clearQuery = () => {
        setQuery(null);
        setSearch("");
        getPokemonData();
    }

    return (<>

        <form onSubmit={(e) => handleSubmit(e)} className="max-w-md mx-auto">
            <div className="relative">

                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>

                <input type="search" id="default-search" value={search} onChange={e => setSearch(e.target.value)} className="block w-full p-4 ps-10 text-sm  border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search pokemons" required />

                {query == null && <button type="submit" className="text-white absolute end-2.5 bottom-2.5  font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Search</button>}
                {query != null && <button type="button" className="text-white absolute end-2.5 bottom-2.5  font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" onClick={clearQuery}>Clear</button>}
            </div>
        </form>

        <div className=" flex flex-col items-center space-y-4 ">

            {query == null ? <p className="text-center text-gray-400">Search your favorite Pokemons</p> : null}

            {query && query.length > 0 && !loading && !data ? <p className="text-center text-gray-400">No pokemon found with name "{query}"</p> : null}


            <div className="flex w-3/4   flex-wrap justify-evenly">
                {data && data?.map((movie) => <PokeCard key={movie.name} pokemon={movie.name} />)}
            </div>

            {data && <div>
                <div className="flex">
                    {page != 1 && query == null && <button onClick={() => setPage(page - 1)} className="flex fixed bottom-2.5 left-0 md:left-[25%] items-center justify-center px-3 h-8 text-sm font-medium  bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white">
                        Previous
                    </button>}
                    {query == null && <button onClick={() => setPage(page + 1)} className="flex items-center fixed bottom-2.5 md:right-[25%] right-0 justify-center px-3 h-8 ms-3 text-sm font-medium  bg-gray-800 dark:border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white">
                        Next
                    </button>}
                </div>
            </div>}
        </div>
    </>
    )
}

