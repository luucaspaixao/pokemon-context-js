import { useState, useRef } from 'react'
import { PokemonItem } from '../PokemonItem/index'

import { usePokemons } from '../../context/Pokemon'

import './styles.scss'
import { ModalDetails } from '../PokemonModalDetails'

export function PokemonList() {
  const { pokemons, filteredPokemons, setFilteredPokemons, pokemonData, isOpen } = usePokemons()
  const [count, setCount] = useState(20)
  
  const inputRef = useRef(null)

  function handleSearch(){
    if(inputRef.current?.value !== undefined){
      const pokemonName = inputRef.current.value
      const newPokemons = pokemons.filter(pokemon => pokemon.name.includes(pokemonName))
      newPokemons.length > 0 ? setFilteredPokemons(newPokemons) : setFilteredPokemons([])
      setCount(20)
    } else {
      setFilteredPokemons(pokemons)
    }
  }

  function handleClearSearch(){
    setCount(20)
    setFilteredPokemons(pokemons)
    if(inputRef.current?.value !== undefined){
      inputRef.current.value = ''
    }
  }

  return (
    <>
    <div className="search-area">
      <input ref={inputRef} type="search" placeholder="Informe o nome do pokemon"/>
      <div>
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleClearSearch}>Limpar filtro</button>
      </div>
    </div>
    <div className="pokemon-list">
      {filteredPokemons.map((pokemon,index) => {
        if(index < count){
          return <PokemonItem key={pokemon.name} name={pokemon.name}/>
        }
          return null
      })}
    </div>
    {
      filteredPokemons.length > 20 && <button className="center-button" onClick={() => setCount(count => count + 20)}>Carregar mais...</button>
    }
    {
      isOpen && <ModalDetails pokemon={pokemonData} isOpen={isOpen} />
    }
    
    </>
  )
}