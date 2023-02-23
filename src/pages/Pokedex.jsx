import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokeCard from '../components/pokedex/PokeCard'
import { paginationLogic } from '../utils/paginationLogic'
import '../components/pokedex/styles/Pokedex.css'

const Pokedex = () => {

  const [pokemons, setPokemons] = useState([])
  const [pokemonsFilter, setPokemonsFilter] = useState([])
  const [types, setTypes] = useState([])
  const [selectType, setSelectType] = useState("")
  const [pokemonName, setPokemonName] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const nameTrainer = useSelector(store => store.nameTrainer)

  const handleChangeSelect = e => {
    setSelectType(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPokemonName(e.target.pokemonName.value)
  }

  const { pagesInBlock, lastPag, pokemonsInpage } = paginationLogic(currentPage, pokemonsFilter)

  const handleNextPage = () => {
    const nextPage = currentPage + 1

    nextPage > lastPag ? setCurrentPage(1) : setCurrentPage(nextPage)
  }

  const handlePreviusPage = () => {
    const backPage = currentPage - 1

    backPage < 1 ? setCurrentPage(lastPag) : setCurrentPage(backPage)
  }
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${selectType ? `type/${selectType}` : "pokemon/?limit=100"}`
    axios.get(URL)
      .then(res => {
        if (selectType) {
          const pokemonByType = res.data.pokemon.map(pokemon => {
            return {
              name: pokemon.pokemon.name,
              url: pokemon.pokemon.url
            }
          })
          setPokemons(pokemonByType)
        } else {
          setPokemons(res.data.results)
        }
      })
      .catch(err => console.log(err))

  }, [selectType])

  useEffect(() => {
    const pokemonByName = pokemons.filter(pokemon => pokemon.name.includes(pokemonName.toLowerCase()))
    setPokemonsFilter(pokemonByName)
  }, [pokemonName, pokemons])

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/"
    axios.get(URL)
      .then(res => setTypes(res.data.results))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [pokemons])

  return (
    <main className='pokedex'>
      <p className='pokedex__welcome'><span>Welcome {nameTrainer}</span>, here you can find your favorite Pokemon</p>
      <form className='pokedex__funtions' onSubmit={handleSubmit}>
        <div className='pokedex__input-button'>
          <input className='pokedex__input' type="text" id='pokemonName' placeholder='Search your pokemon' />
          <button className='pokedex__button'>Search</button>
        </div>
        <select className='pokedex__selection' onChange={handleChangeSelect}>
          <option value="">All pokemons</option>
          {
            types.map(type => <option key={type.url}>{type.name}</option>)
          }
        </select>
      </form>
      <section className='pokedex__pokeCard'>
        {
          pokemonsInpage.map((pokemon) => <PokeCard key={pokemon.url} pokemonUrl={pokemon.url} />)
        }
      </section>
      <section className='pokedex__pages'>
        <ul className='pokedex__listpages'>
          <li className='pokedex__previusPage' onClick={handlePreviusPage}>{"<<"}</li>
          <li className='pokedex__firstPage' onClick={() => setCurrentPage(1)}> ... </li>
          {
            pagesInBlock.map(page => <li className={`pokedex__pags ${currentPage === page ? 'bg-red' : ''}`} onClick={() => setCurrentPage(page)} key={page}>{page}</li>)
          }
          <li className='pokedex__lastPage' onClick={() => setCurrentPage(lastPag)}> ... </li>
          <li className='pokedex__nextPage' onClick={handleNextPage}>{">>"}</li>
        </ul>
      </section>
    </main>
  )
}

export default Pokedex