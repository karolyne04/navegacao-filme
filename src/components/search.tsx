"use client";
import  { useState } from 'react';
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  onSearch: (query: string) => void;
  className?: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, className }: SearchProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`relative ${className}`}>
        <input
          type="text"
          className="w-full h-10 pl-10 pr-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Pesquise por filmes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaSearch color='#E51A54'/>
        </div>
      </div>
    </form>
  );
};

export default Search;