import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {GEO_API_URL, geoApiOptions} from "../api"

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    console.log(searchData);
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOption = (inputValue) => {
    return fetch(`${GEO_API_URL}/places?miniPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((res) => {
        // console.log(res); // Logging the entire response for debugging purposes
        return {
            options: res.data.map((city) => {
                // console.log(city); // Logging each city for debugging purposes
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                };
            })
        };
    })
    .catch((error) => {
        console.error('Error loading options:', error);
        // Handle error or return default options
        return { options: [] };
    });
};

  
  return (
    <AsyncPaginate
    placeholder="Search For City"
    debounceTimeout={600}
    value={search}
    onChange={handleOnChange}
    loadOptions={loadOption}
    />
  );
};

export default Search;
