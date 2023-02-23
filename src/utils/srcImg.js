export const srcImg = (pokemon) => {
    const img = pokemon?.sprites.other.home.front_default
    const img2 = pokemon?.sprites.other["official-artwork"].front_default

    return img ? img : img2
  }