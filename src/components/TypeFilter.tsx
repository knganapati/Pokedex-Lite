// src/components/TypeFilter.tsx
import React from 'react';

interface TypeFilterProps {
  selectedTypes: string[];
  onTypeChange: (type: string) => void;  // Accepts a single type string
}

const types = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Ice', 'Rock', 'Ground'];

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedTypes, onTypeChange }) => {
  const handleTypeChange = (type: string) => {
    onTypeChange(type);
  };

  return (
    <div>
      {types.map((type) => (
        <label key={type}>
          <input
            type="checkbox"
            checked={selectedTypes.includes(type)}
            onChange={() => {
              handleTypeChange(type);
            }}
          />
          {type}
        </label>
      ))}
    </div>
  );
};

export default TypeFilter;