// src/hooks/usePokemons.ts
import { useEffect, useState } from 'react';
import axios from 'axios';

const usePokemons = (currentPage: number, itemsPerPage: number) => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`);
        setPokemons(response.data.results);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (err) {
        setError('Failed to fetch Pokémon data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPokemons();
  }, [currentPage, itemsPerPage]);

  return { pokemons, loading, error, totalPages };
};

export default usePokemons;