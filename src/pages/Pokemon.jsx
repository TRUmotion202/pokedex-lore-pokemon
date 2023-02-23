import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { srcImg } from '../utils/srcImg'
import '../components/styles/Pokemon.css'

const Pokemon = () => {

  const [pokemon, setPokemon] = useState()

  const { id } = useParams()

  const widthBarStyle = (stat) => {
    const percent = Math.ceil(stat * 100 / 255)

    return `${percent}%`
  }

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(URL)
      .then(res => setPokemon(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <main className='pokemon'>
      <section className='pokemon__img-container'>
        <section className={`pokemon__header bg-lg-${pokemon?.types[0].type.name}`}>
          <div className='pokemon__img'>
            <img src={srcImg(pokemon)} alt="" />
          </div>
        </section>
      </section>

      <section className='pokemon__data'>
        <h2 className='pokemon__id'># {id}</h2>
        <h2 className='pokemon__name'>{pokemon?.name}</h2>
        <div className='pokemon__info'>
          <div className='pokemon__weight'>
            <h4 className='pokemon__weight-title'>Weight</h4>
            <p className='pokemon__weight-data'>{pokemon?.weight}</p>
          </div>
          <div className='pokemon__height'>
            <h4 className='pokemon__height-title'>Height</h4>
            <p className='pokemon__height-data'>{pokemon?.height}</p>
          </div>
        </div>

        <div className='pokemon__info-type'>
          <div className='pokemon__types'>
            <h3 className='pokemon__type-title'>Type</h3>
            <div className='pokemon__type-info'>
              {
                pokemon?.types.map(type => <div className={`pokemon__type-data bg-${type.type.name}`} key={type.type.name}><span>{type.type.name}</span></div>)
              }
            </div>
          </div>
          <div className='pokemon__abilities'>
            <h3 className='pokemon__abilitie-title'>Abilities</h3>
            <div className='pokemon__abilitie-info'>
              {
                pokemon?.abilities.map(ability => <div className='pokemon__abilitie-data' key={ability.ability.name}><span>{ability.ability.name}</span></div>)
              }
            </div>
          </div>
        </div>

        <section className='pokemon__stats'>
          <h2 className='pokemon__stats-title'>Stats</h2>
          <section className='pokemon__stats-info'>
            {
              pokemon?.stats.map(stat => (
                <article className='pokemon__stat-container' key={stat.stat.name}>
                  <div className='pokemon__stat-info'>
                    <h4 className='pokemon__stat-name'>{stat.stat.name}</h4>
                    <p className='pokemon__stat-data'>{stat.base_stat}/255</p>
                  </div>
                  <div className='pokemon__containerbar'>
                    <div className='pokemon__bar' style={{width: widthBarStyle(stat.base_stat)}}></div>
                  </div>
                </article>
              ))
            }

          </section>
        </section>
      </section>
      <section className='pokemon__movements'>
        <h2 className='pokemon__move-title'>Movements</h2>
        <ul className='pokemon__ul-moves'>
          {
            pokemon?.moves.map(move => (<li className='pokemon__moves' key={move.move.url}><span>{move.move.name}</span></li>
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Pokemon