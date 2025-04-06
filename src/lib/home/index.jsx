import React, { useEffect, useState } from "react";
import { Button, Card, Loader, Title } from "../../components";
import { API } from "../../services";

export const HomePage = () => {
  const [pokemonCount, setPokemonCount] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [totalStats, setTotalStats] = useState({});
  const [arePokemonsLoading, setArePokemonsLoading] =useState(false);

  useEffect(() => {
    getPokeMonCount();
  }, []);

  useEffect(() => {
    if (pokemons.length > 0) {
      CalculatePoints();
    }
  }, [pokemons]);

  const getPokeMonCount = async () => {
    let data = await API.getPokemonCount();
    if (data.success) {
      setPokemonCount(data.data.count);
    } else {
      console.log(data);
    }
  };

  const showPokemons = async () => {
    setArePokemonsLoading(true)
    let data = await API.fetchRandomPokemons();
    if (data.success) {
      setPokemons(data.data);
      setArePokemonsLoading(false)
    } else {
      console.log(data);
      setArePokemonsLoading(false)
    }
  };

  const CalculatePoints = () => {
    let stats = pokemons.map((item) => {
      return {
        hp: item.stats.find((stat) => stat.stat?.name == "hp")?.base_stat,
        attack: item.stats.find((stat) => stat.stat?.name == "attack")
          ?.base_stat,
        defense: item.stats.find((stat) => stat.stat?.name == "defense")
          ?.base_stat,
      };
    });

    let totalStatdata = {
      hp: stats.reduce((acc, item) => acc + item.hp, 0),
      attack: stats.reduce((acc, item) => acc + item.attack, 0),
      defense: stats.reduce((acc, item) => acc + item.defense, 0),
    };

    setTotalStats(totalStatdata);
  };

  const onRemove = (index) => {
    setPokemons((prevPokemons) =>
      prevPokemons.filter((_item, id) => id != index)
    );
  };

  const onReplace = async (index) => {
    const data = await API.fetchRandomPokemon();
    if (data.success) {
      setPokemons((prevPokemons) =>
        prevPokemons.map((item, id) => (id === index ? data.data : item))
      );
    } else {
      console.log(data);
    }
  };

  const getMoves = (moves) => {
    return moves
      .map((move) => move.move.name)
      .slice(0, 30)
      .join(",");
  };

  const getTypes = (types) => {
    return types.map((type) => type.type.name).join(",");
  };

  const getHp = (stats) => {
    return stats.find((stat) => stat.stat?.name == "hp")?.base_stat
  };

  const getAttack = (stats) => {
    return stats.find((stat) => stat.stat?.name == "attack")?.base_stat
  };

  const getDefense = (stats) => {
    return stats.find((stat) => stat.stat?.name == "defense")?.base_stat
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <Title text="Pokemon Creator" />
      </div>
      <div className="flex items-center justify-center gap-4 py-4">
      <Button
        text={
          pokemons.length == 0 ? "Assemble my PokeTeam!" : "Make All New Team"
        }
        onClick={() => showPokemons()}
        type="secondary"
        size="md"
      />
      {pokemons.length > 0 && (
        <ul>
          <li>Total Attack: {totalStats.attack}</li>
          <li>Total Defense: {totalStats.defense}</li>
          <li>Total HP: {totalStats.hp}</li>
        </ul>
      )}
      </div>
      {
        arePokemonsLoading && <div className="m-auto">
          <Loader />
          </div>
      }
      <ul className="flex flex-wrap gap-2 items-stretch justify-center gap-y-4 pb-5 w-screen">
        {!arePokemonsLoading && pokemons.map((pokemon, index) => (
          <li key={pokemon.name}>
            <Card>
              <img
                alt=""
                src={pokemon.sprites?.front_default || ""}
                className="h-32 rounded-full"
              />
              <div className="text-center">
                <h3 className="text-base font-semibold tracking-tight text-gray-900">
                  {pokemon.name}
                </h3>
                <p className="text-sm font-semibold">
                  <span>weight:</span> {pokemon.weight}
                </p>
                <p className="text-sm/6 font-semibold">
                  species: {pokemon.species?.name}
                </p>
                <p className="text-sm/6 font-semibold text-wrap">
                  moves: {getMoves(pokemon.moves)}
                </p>
                <p className="text-sm/6 font-semibold text-wrap">
                  types: {getTypes(pokemon.types)}
                </p>
                <p className="text-sm/6 font-semibold text-wrap">
                  hp: {getHp(pokemon.stats)}
                </p>
                <p className="text-sm/6 font-semibold text-wrap">
                  attack: {getAttack(pokemon.stats)}
                </p>
                <p className="text-sm/6 font-semibold text-wrap">
                  defense: {getDefense(pokemon.stats)}
                </p>
              </div>
              <div className="mt-auto flex gap-1 mb-1">
              <Button
                text={"Replace Pokemon"}
                onClick={() => onReplace(index)}
              />
              <Button text={"Remove Pokemon"} onClick={() => onRemove(index)} type="danger" />
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};
