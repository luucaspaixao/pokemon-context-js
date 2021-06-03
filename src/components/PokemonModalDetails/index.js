import './styles.scss'

import { usePokemons } from '../../context/Pokemon'

export function ModalDetails({ pokemon, isOpen }) {

  const { setIsOpen, setPokemonData } = usePokemons()

  function handleCloseModal() {
    setIsOpen(false)
    setPokemonData({})
    const body = document.querySelector('body')
    body.style.overflow = 'auto'
  }

  return (
    <div className={isOpen ? "modal active" : "modal"}>
      { pokemon.name &&
        <div>
          <div className="modal-content">
            <button onClick={handleCloseModal}>X</button>
            <div>
              <h1>{pokemon.name.toUpperCase()}</h1>
              <div className="pokemon-images">
                <img src={pokemon.sprites.front_default} alt={pokemon.name + pokemon.sprites.front_default} />
                <img src={pokemon.sprites.back_default} alt={pokemon.name + pokemon.sprites.back_default} />
              </div>
              <ul>
                {pokemon.types.map(type => {
                  return <li className={type.type.name + '-class'} key={type.type.name}>{type.type.name.toUpperCase()}</li>
                })}
              </ul>
              <br />
              <span>Weight: {pokemon.weight + ' kg'} </span>
              <br />
              <span>Height: {pokemon.height + ' meters'}</span>
              <div className="pokemon-status">
                {pokemon.stats.map(stat => {
                  return (
                    <div key={stat.stat.name}>
                      <label htmlFor={stat.stat.name}>{stat.stat.name.toUpperCase()}</label>
                      <div className="progress-bar">
                        <progress id={stat.stat.name} value={stat.base_stat} max="200" />
                        <span> {stat.base_stat}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="specials">
              <p>Abilities:</p>
              <ul className="abilities">
                {
                  pokemon.abilities.map(ability => {
                    return <li key={ability.ability.name}>{ability.ability.name}</li>
                  })
                }
              </ul>
              <div>
                <p>Moves:</p>
                <ul className="moves">
                  {
                    pokemon.moves.map(move => {
                      return <li key={move.move.name}>{move.move.name}</li>
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}