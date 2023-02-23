export const paginationLogic = ( currentPage, pokemonsFilter ) => {
    const pokemonPerPage = 12;

    const slicePagStart = (currentPage - 1) * pokemonPerPage
    const slicePagEnd = slicePagStart + pokemonPerPage
    const pokemonsInpage = pokemonsFilter.slice(slicePagStart, slicePagEnd)

    const lastPag = Math.ceil(pokemonsFilter.length / pokemonPerPage) || 1

    const pagesPerBlock = 7;

    const actualBlock = Math.ceil(currentPage / pagesPerBlock)

    const pagesInBlock = []
    const minPage = ((actualBlock * pagesPerBlock) - pagesPerBlock) + 1 
    const maxPage = actualBlock * pagesPerBlock

    for(let i = minPage; i <= maxPage; i++) {
      if(i <= lastPag){
        pagesInBlock.push(i)
      }

    }

    return {pagesInBlock, lastPag, pokemonsInpage}
  }