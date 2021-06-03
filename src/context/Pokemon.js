import React, { createContext, useContext, useEffect, useState } from 'react'

import { api } from '../services/api'

export const PokemonContext = createContext()

export function PokemonProvider({ children }) {

  const [pokemons, setPokemons] = useState([])
  const [filteredPokemons, setFilteredPokemons] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [pokemonData, setPokemonData] = useState({})

  useEffect(() => {
    api.get(`pokemon?limit=1200`)
      .then(response => {
        setPokemons(response.data.results)
        setFilteredPokemons(response.data.results)
      })
  }, [])

  return (
    <PokemonContext.Provider value={
      {
        pokemons,
        filteredPokemons,
        setFilteredPokemons,
        setPokemonData,
        pokemonData,
        isOpen,
        setIsOpen
      }
    }>
      {children}
    </PokemonContext.Provider>
  )
}

export function usePokemons() {
  const context = useContext(PokemonContext)

  let { pokemons, filteredPokemons, setFilteredPokemons, setPokemonData, pokemonData, isOpen, setIsOpen } = context

  return { pokemons, filteredPokemons, setFilteredPokemons, setPokemonData, pokemonData, isOpen, setIsOpen };
}