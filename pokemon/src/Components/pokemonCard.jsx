import React, { useState, useEffect } from "react";
import axios from "axios";
export default function PokeCard({ pokemon }) {

    const [image, setImage] = useState("https://png.pngtree.com/png-vector/20220715/ourmid/pngtree-hourglass-vector-png-image_5946419.png");

    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon/" + pokemon)
            .then(res => {
                setImage(res.data?.sprites?.front_default)
            })
            .catch(err => console.error(err));
    })

    return (
        <div className="max-w-sm  flex  lg:max-w-full lg:flex cursor-pointer" >
            <div className="border-2 border-gray-400 justify-center   lg:border-gray-400 bg-gray-700 rounded-b  p-4 flex flex-col leading-normal">
                <div className="text-white font-bold text-2xl text-center mb-2">{pokemon}</div>
                <img src={image} alt="Movie Poster" className="h-48  object-cover object-center  " />
            </div>
        </div>
    )
}