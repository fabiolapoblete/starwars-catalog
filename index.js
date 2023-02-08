const url_base = "https://swapi.dev/api/";

let data = "";
let planet = "";
let homeWorld = "";

let page = 1;

let nextBtn = document.querySelector(".next");
let backBtn = document.querySelector(".back");
let pageNr = document.querySelector(".page-nr");

let characterList = document.querySelector("ul");
let details = document.querySelector(".details__character");
let planetSection = document.querySelector(".details__planet");
let planetDetails = document.createElement("section");

backBtn.style.display = "none";
pageNr.innerText = `${page} / 9`;

getCharacters();

async function getCharacters() {
  try {
    let response = await fetch(url_base + "people/?page=" + page);
    data = await response.json();

    createCharacterItem(data);

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

async function getHomeworld(homeWorld) {
  try {
    let response = await fetch(homeWorld);
    planet = await response.json();

    createPlanetItem(planet);

    console.log(planet);
  } catch (error) {
    console.log(error);
  }
}

function createPlanetItem(planet) {
  planetSection.innerHTML = "";
  planetDetails.innerHTML = `
    <h3>${planet.name}</h3>
    <p>Rotational period: ${planet.rotation_period} h </p>
    <p>Orbital period: ${planet.orbital_perdod} days </p>
    <p>Diameter: ${planet.diameter} km </p>
    <p>Climate: ${planet.climate} </p>
    <p>Gravity: ${planet.gravity} </p>
    <p>Terrain: ${planet.terrain} </p>
    `;
  planetSection.appendChild(planetDetails);
}

function createCharacterItem(data) {
  for (let item of data.results) {
    let listItem = document.createElement("li");
    listItem.innerText = item.name;

    characterList.appendChild(listItem);

    listItem.addEventListener("click", () => {
      details.innerHTML = "";
      let detailsItems = document.createElement("section");
      detailsItems.innerHTML = `
        <h3>${item.name}</h3>
        <p>Height: ${item.height} cm </p>
        <p>Mass: ${item.mass} kg </p>
        <p>Hair color: ${item.hair_color} </p>
        <p>Eye color: ${item.eye_color}</p>
        <p>Birth Year: ${item.birth_year}</p>
        <p>Gender: ${item.gender} </p>
        `;
      details.appendChild(detailsItems);
      homeWorld = item.homeworld;
      getHomeworld(homeWorld);
    });
  }
}

nextBtn.addEventListener("click", () => {
  if (page < 9) {
    nextBtn.style.display = "block";
    backBtn.style.display = "block";
    document.querySelector("ul").innerHTML = "";
    details.innerHTML = "";
    planetDetails.innerHTML = "";
    page++;
    pageNr.innerText = `${page} / 9`;
    getCharacters();
    if (page >= 9) {
      nextBtn.style.display = "none";
    }
  }
});

backBtn.addEventListener("click", () => {
  if (page > 1) {
    backBtn.style.display = "block";
    document.querySelector("ul").innerHTML = "";
    details.innerHTML = "";
    planetDetails.innerHTML = "";
    page--;
    pageNr.innerText = `${page} / 9`;
    getCharacters();
    if (page <= 1) {
      backBtn.style.display = "none";
    }
  }
});
