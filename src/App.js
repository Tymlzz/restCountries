import "./styles.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import DataFetchCard from "./components/DataFetchCard";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
export default function App() {
  const apiKey = "Tm8YPFCXoRG2oG2CV6ieCA5c5ApnN2sk2Xdcl2BL";
  const newApiKey = "SwCnxAGUbj3QSs8N9z2IR82jQ2RNsjIMRPK2LEur";
  const [countries, setCountries] = useState([]);
  const [allCountry, setAllCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("");
  const [countryName, setCountryName] = useState("");
  const [isClicked, setIsClick] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  function toggleTheme() {
    setDarkMode(!darkMode);
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://countryapi.io/api/all?apikey=${newApiKey}`)
      .then((res) => {
        const data = res.data;
        if (data && typeof data === "object") {
          const countryArray = Object.values(data);
          setCountries(countryArray);
          setAllCountry(countryArray);
        }
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleClick() {
    console.log("Search for:", countryName);
    const searchCountry = countries.filter(
      (country) => country.name.toLowerCase() === countryName.toLowerCase()
    );

    setCountries(searchCountry);
  }

  function handleReset() {
    setCountries(allCountry);
    setCountryName("");
  }
  function handleChange(e) {
    const searchRegion = e.target.value;
    setRegion(searchRegion);
    console.log("Selected region:", searchRegion);

    setLoading(true);

    axios
      .get(
        `https://countryapi.io/api/region/${searchRegion}?apikey=${newApiKey}`
      )
      .then((res) => {
        const data = res.data;
        if (data && typeof data === "object") {
          const countryArray = Object.values(data);
          setCountries(countryArray);
        }
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleDetails(id) {
    const thatCountry = countries.find((country) => country.alpha2Code === id);
    if (thatCountry) {
      setSelectedCountry(thatCountry);
      setIsClick(true);
    }
  }

  function stepback() {
    setSelectedCountry(null);
    setIsClick(false);
  }
  function toggleTheme() {
    setDarkMode(!darkMode);
  }
  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <DataFetchCard
        countryName={countryName}
        setCountryName={setCountryName}
        handleClick={handleClick}
        handleReset={handleReset}
        handleChange={handleChange}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />
      <div className="data-result">
        {loading ? (
          <p>Countries loading...</p>
        ) : countries.length === 0 ? (
          <p>No countries found.</p>
        ) : isClicked && selectedCountry ? (
          <div>
            <div className="country-card">
              <div className="country-details">
                <div className="flag-wrapper">
                  <img
                    src={selectedCountry.flag?.large}
                    alt={`${selectedCountry.name} flag`}
                    className="flag"
                  />
                </div>

                <div className="info-wrapper">
                  <h2>{selectedCountry.name}</h2>
                  <p>
                    <strong>Capital:</strong> {selectedCountry.capital}
                  </p>
                  <p>
                    <strong>Population:</strong>{" "}
                    {selectedCountry.population.toLocaleString()}
                  </p>
                  <p>
                    <strong>Region:</strong> {selectedCountry.region}
                  </p>
                  <p>
                    <strong>Languages:</strong>{" "}
                    {selectedCountry.languages
                      ? Object.values(selectedCountry.languages).join(", ")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Currencies:</strong>{" "}
                    {selectedCountry.currencies
                      ? Object.keys(selectedCountry.currencies).join(", ")
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Area:</strong>{" "}
                    {selectedCountry.area.toLocaleString()} km<sup>2</sup>
                  </p>
                  <p>
                    <strong>Borders:</strong>{" "}
                    {Array.isArray(selectedCountry.borders) &&
                    selectedCountry.borders.length > 0
                      ? selectedCountry.borders.join(", ")
                      : "N/A"}
                  </p>

                  <button className="bottom-button" onClick={stepback}>
                    <ArrowBackOutlinedIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Card handleDetails={handleDetails} countries={countries} />
        )}
      </div>
    </div>
  );
}
