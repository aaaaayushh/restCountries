import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
const url = "https://restcountries.eu/rest/v2/name/";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [countries, setCountries] = useState([]);
  const [sortby, setSortby] = useState("");

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}${searchTerm}`);
      const data = await res.json();
      // console.log(data);

      if (data) {
        const newCountry = data.map((d) => {
          const {
            name,
            capital,
            region,
            population,
            flag,
            area,
            currencies,
            callingCodes,
          } = d;
          return {
            name,
            capital,
            region,
            population,
            id: uuidv4(),
            flag,
            area,
            currencies,
            callingCodes,
          };
        });
        const sortCountries = newCountry.sort((a, b) => {
          return b[sortby] - a[sortby];
        });
        console.log(typeof sortby);
        console.log(sortCountries);
        setCountries(sortCountries);
      } else {
        setCountries([]);
      }
      setLoading(false);
      // console.log(countries);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm, sortby]);

  useEffect(() => {
    fetchCountries();
  }, [searchTerm, fetchCountries, sortby]);

  return (
    <AppContext.Provider
      value={{
        loading,
        searchTerm,
        countries,
        setSearchTerm,
        setSortby,
        sortby,
        setCountries,
        // sort,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
