import React, { useEffect } from "react";
import Country from "./Country";
import Loading from "./Loading";
import { useGlobalContext } from "../context";
const CountryList = () => {
  const { countries, loading } = useGlobalContext();
  // useEffect(() => {
  //   sort(sortby);
  // }, [sort, sortby]);
  if (loading) {
    return <Loading />;
  }
  // console.log(countries);
  if (countries.length < 1) {
    return (
      <h2 className="section-title">
        No countries matched your search criteria
      </h2>
    );
  }

  const getCountries = (data) => {
    return data.map((item) => {
      return <Country key={item.id} {...item} />;
    });
  };
  // useEffect(()=>{

  // },[countries])

  return (
    <div className="section">
      <h2 className="section-title">Countries</h2>
      <div className="countries-center">{getCountries(countries)}</div>
    </div>
  );
};

export default CountryList;
