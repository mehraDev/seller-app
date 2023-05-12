import React, { useState } from "react";
import styled from "styled-components";
import Icon from "ui/Icon/Icon";
import { IconName } from "ui/Icon/iconNames";

interface Props {
  items?: string[];
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 8px;
`;

const SearchIcon = styled.span`
  color: #999;
  font-size: 1.2rem;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  border: none;
  flex: 1;
  font-size: 1rem;
  background-color: #f2f2f2;

  &:focus {
    outline: none;
  }
`;

const SearchResults = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchResult = styled.li`
  padding: 8px;

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
`;

const Search: React.FC<Props> = ({ items = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      setSearchResults([]);
    } else {
      const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredItems);
    }
  };

  return (
    <>
      <SearchContainer>
        <Icon name={IconName.LeftArrow} />
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </SearchContainer>
      {/* {searchResults.length > 0 && (
        <SearchResults>
          {searchResults.map((result) => (
            <SearchResult key={result}>{result}</SearchResult>
          ))}
        </SearchResults>
      )} */}
    </>
  );
};

export default Search;
