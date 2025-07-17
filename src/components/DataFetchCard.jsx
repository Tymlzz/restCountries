import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import RestoreIcon from "@mui/icons-material/Restore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function CountrySearchBar({
  countryName,
  setCountryName,
  handleClick,
  handleReset,
  handleChange,
  toggleTheme,
  darkMode,
}) {
  return (
    <div className="container">
      <input
        placeholder="search country"
        className="search-input"
        type="text"
        value={countryName}
        onChange={(e) => setCountryName(e.target.value)}
      />
      <button onClick={handleClick}>
        <SearchIcon />
      </button>
      <button onClick={handleReset}>
        <RestoreIcon />
      </button>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </button>

      <select name="region" onChange={handleChange}>
        <option value="">Select Region</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        <option value="Americas">Americas</option>
      </select>
    </div>
  );
}
