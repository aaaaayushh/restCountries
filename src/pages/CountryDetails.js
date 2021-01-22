import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://restcountries.eu/rest/v2/capital/";
const CountryDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getCountry() {
      try {
        const res = await fetch(`${url}${id}`);
        const data = await res.json();
        if (data.length) {
          const {
            name,
            capital,
            region,
            population,
            flag,
            area,
            currencies,
            callingCodes,
          } = data[0];
          const newCountry = {
            name,
            capital,
            region,
            population,
            flag,
            area,
            currencies,
            callingCodes,
          };
          // console.log(newCountry);
          setCountry(newCountry);
        } else {
          setCountry(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getCountry();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!country) {
    return <h2 className="section-title">No country to display</h2>;
  }

  const {
    name,
    capital,
    region,
    population,
    flag,
    area,
    currencies,
    callingCodes,
  } = country;
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="country">
        <img src={flag} alt={name} />
        <div className="country-info">
          <p>
            <span className="country-data">Name:</span>
            {name}
          </p>
          <p>
            <span className="country-data">Capital:</span>
            {capital}
          </p>
          <p>
            <span className="country-data">Region:</span>
            {region}
          </p>
          <p>
            <span className="country-data">Population:</span>
            {population}
          </p>
          <p>
            <span className="country-data">Area:</span>
            {area} sq.km
          </p>
          <p>
            <span className="country-data">Currency:</span>
            {currencies[0].name}
          </p>
          <p>
            <span className="country-data">Calling Code:</span>
            {callingCodes}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CountryDetails;
