import React from "react";
import { Link } from "react-router-dom";
const Country = ({ name, capital, region, population, flag, area }) => {
  return (
    <article className="country">
      <div className="img-container">
        <img src={flag} alt={name} />
      </div>
      <div className="country-footer">
        <h3>{name}</h3>
        <h4>Capital:{capital}</h4>
        <h4>{region}</h4>
        <h4>Population:{population}</h4>
        <h4>Area:{area} sq.km</h4>
        <Link
          to={`/country/${capital}`}
          className="btn btn-primary btn-details"
        >
          Country Details
        </Link>
      </div>
    </article>
  );
};

export default Country;
