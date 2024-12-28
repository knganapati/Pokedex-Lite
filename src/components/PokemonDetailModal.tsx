import React from 'react';

interface PokemonDetailModalProps {
  isOpen: boolean;
  pokemon: any;
  onClose: () => void;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({ isOpen, pokemon, onClose }) => {
  if (!isOpen || !pokemon) return null;

  return (
    <div className="modal">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>HP: {pokemon.stats[0].base_stat}</p>
      <p>Attack: {pokemon.stats[1].base_stat}</p>
      <p>Abilities: {pokemon.abilities.map((ability: any) => ability.ability.name).join(', ')}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PokemonDetailModal;