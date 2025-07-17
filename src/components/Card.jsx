import React from "react";

export default function Card({ countries, handleDetails }) {
  return (
    <div className="grid">
      {countries.map((country, index) => (
        <div
          className="card"
          onClick={() => handleDetails(country.alpha2Code)}
          key={index}
        >
          <img
            src={country.flag?.large}
            alt={`${country.name} flag`}
            className="flag"
          />
          <h3>{country.name}</h3>
          <p>
            <strong>Capital:</strong> {country.capital}
          </p>
          <p>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Call Code:</strong> {country.callingCode}
          </p>
        </div>
      ))}
    </div>
  );
}
