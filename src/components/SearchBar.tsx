import { ChangeEvent, useRef } from 'react';
import { useSearchPlacesByTerm } from '../hooks/useSearchPlacesByTerm';
import { SearchResults } from './';

export const SearchBar = () => {
  const { searchPlacesByTerm } = useSearchPlacesByTerm();

  const debounceRef = useRef<NodeJS.Timeout>();
  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(query);
    }, 350);
  };

  return (
    <div className="search-container border border-primary">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar..."
        onChange={onQueryChange}
      />

      <SearchResults />
    </div>
  );
};
