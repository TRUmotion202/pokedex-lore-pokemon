import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { srcImg } from '../../utils/srcImg'
import './styles/PokeCard.css'

const PokeCard = ({ pokemonUrl }) => {

  const [pokemon, setPokemon] = useState()

  const navigate = useNavigate()

  const handleClickPokemon = () => {
    navigate(`/pokedex/${pokemon.id}`)
  }

useEffect(() => {
  axios.get(pokemonUrl)
    .then(res => setPokemon(res.data))
    .catch(err => console.log(err))
}, [])

  return (
    <article className={`pokeCard border-${pokemon?.types[0].type.name}`} onClick={handleClickPokemon}>
      <section className={`pokeCard__header bg-lg-${pokemon?.types[0].type.name}`}></section>
      <section className='pokeCard__body'>
        <div className='pokeCard__img'>
          <img src={srcImg(pokemon)} alt="POKEimg" />
        </div>
        <h3 className='pokeCard__name'>{pokemon?.name}</h3>
        <p className='pokeCard__types'>{pokemon?.types[0].type.name} {pokemon?.types[1] && `/ ${pokemon?.types[1].type.name}`}</p>
        <p className='pokeCard__subtitle-type'>Type</p>
        <hr className='pokeCard__hr'/>
        <section className='pokeCard__stats'>
          {
            pokemon?.stats.map(stat => (
              <div className='pokeCard__stat' key={stat.stat.url}>
                <p className='pokeCard__stat-name'>{stat.stat.name}</p>
                <p className='pokeCard__stat-value'>{stat.base_stat}</p>
              </div>
            ))
          }
        </section>
      </section>
    </article>
  )
}

export default PokeCard