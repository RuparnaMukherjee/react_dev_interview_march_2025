import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_POKEMON_BASE_URL });

const getPokemonCount = async () => {
  let response = null;
  await API.get('/pokemon?limit=1')
    .then((res) => {
      response = res
    }).catch((error) => {
      response = error.response
    })
  return handleResponse(response);
}

const fetchRandomPokemons = async () => {
  let response = {};
  let count = 100;
  const randomIds = [];
  while (randomIds.length < 6) {
    let num = Math.floor(Math.random() * count)
    if (!randomIds.includes(num)) {
      randomIds.push(num);
    }
  }
  const pokemonAPIList = randomIds.map(id => API.get(`/pokemon/${id}`));
  await Promise.all(pokemonAPIList)
    .then((res) => {
      response={status: 200,data: res.map((r)=>r.data)};
    }).catch((error) => {
      response={status: 400, data: `error ${error}`}
    })

  return handleResponse(response);
}

const fetchRandomPokemon = async () => {
  let response = null;
  let count = 100;
  const id = Math.floor(Math.random() * count) + 1
  await API.get(`/pokemon/${id}`)
    .then((res) => {
      response = res
    }).catch((error) => {
      throw error
    })
  return handleResponse(response);
}

const handleResponse = response => {
  if (response.data === undefined) {
    return {
      success: false,
      Error: JSON.stringify(response)
    }
  }
  else if (response.status !== 200) {
    return {
      success: false,
      Error: JSON.stringify(response.data.error)
    }
  }
  return {
    success: true,
    data: response.data
  }
}

const api = {
  getPokemonCount: getPokemonCount,
  fetchRandomPokemons: fetchRandomPokemons,
  fetchRandomPokemon: fetchRandomPokemon
}

export { api as API }