// src/App.tsx
import React, { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import PokemonCard from './components/PokemonCard';
import PokemonDetailModal from './components/PokemonDetailModal';
import Pagination from './components/Pagination';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import './styles.css';

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(currentPage - 1) * ITEMS_PER_PAGE}&limit=${ITEMS_PER_PAGE}`);
        const data = await response.json();
        setPokemons(data.results);
        setTotalPages(Math.ceil(data.count / ITEMS_PER_PAGE));
      } catch (err) {
        setError('Failed to fetch Pokémon data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [currentPage]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Login error: ", error);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Registration error: ", error);
      setError("Registration failed. Please try a different email.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const openDetail = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    setSelectedPokemon(data);
  };

  const closeDetail = () => {
    setSelectedPokemon(null);
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prev) => {
      return prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type];
    });
  };

  const filteredPokemons = pokemons.filter(pokemon => {
    const isMatchingName = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isMatchingType = selectedTypes.length === 0; // Here you would implement type checking logic based on fetched Pokémon types
    return isMatchingName && isMatchingType;
  });

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="app">
      <h1>Pokedex Lite</h1>
      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <TypeFilter selectedTypes={selectedTypes} onTypeChange={handleTypeChange} />
          <div className="pokemon-grid">
            {filteredPokemons.map((pokemon) => (
              <PokemonCard 
                key={pokemon.name} 
                name={pokemon.name} 
                image={`https://pokeapi.co/media/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} 
                onClick={() => openDetail(pokemon.name)} 
              />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          <PokemonDetailModal isOpen={!!selectedPokemon} pokemon={selectedPokemon} onClose={closeDetail} />
        </div>
      ) : (
        <div>
          <h2>Please Log In</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
};

export default App;