import { PokemonList } from './components/PokemonList'
import { ModalDetails } from './components/PokemonModalDetails'

import { PokemonProvider } from './context/Pokemon'

import './styles/global.scss'

export function App() {

  return (
    <PokemonProvider>
        <PokemonList />
    </PokemonProvider>
  )
}