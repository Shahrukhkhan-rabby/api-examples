const loadCountries = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => displayCountries(data));
};
loadCountries();

const displayCountries = (countries) => {
  // for (const country of countries) {
  //     console.log(country);
  // }
  const countriesDiv = document.getElementById("countries");
  countries.forEach((country) => {
    // console.log(country);
    const div = document.createElement("div");
    div.classList.add("country");
    div.innerHTML = `
      <h3>${country.name.common}</h3>
       <p>${country.capital ? country.capital[0] : "No capital available"}</p>
      <button onclick="loadCountryByName('${
        country.name.common
      }')">Details</button>
      `;
    countriesDiv.appendChild(div);
  });
};

const loadCountryByName = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCountriesDetail(data[0]));
};
const displayCountriesDetail = (country) => {
  console.log(country);
  const countryDiv = document.getElementById("country-detail");
  countryDiv.innerHTML = `
  <h5>${country.name.common}</h5>
  <p>population: ${country.population}</p>
  <img width="200px" src="${country.flags.png}" alt="Flag of ${country.name.common}">
  `;
};
