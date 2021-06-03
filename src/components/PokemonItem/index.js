import './styles.scss'

import { api } from '../../services/api'
import { useEffect, useState } from 'react'

import { usePokemons } from '../../context/Pokemon'

export function PokemonItem({ name }) {
  const { setPokemonData, setIsOpen } = usePokemons()
  const [pokemon, setPokemon] = useState({})

  useEffect(() => {
    api.get(`pokemon/${name}`,)
      .then(response => setPokemon(response.data))
  }, [name])


  function handleOpenModal() {
    setIsOpen(true)
    setPokemonData(pokemon)
    const body = document.querySelector('body')
    body.style.overflow = 'hidden'
  }

  return (
    <>
      {pokemon.name &&
        <button onClick={handleOpenModal} className="pokemon-item">
          <p>{pokemon.name.toUpperCase()}</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <ul>
            {pokemon.types.map(type => {
              return <li className={type.type.name + '-class'} key={type.type.name}>{type.type.name.toUpperCase()}</li>
            })}
          </ul>
        </button> 
      }
    </>
  )

}