const url_base = "https://swapi.dev/api/";
const endPointCharacter = "people/?page=";
const endPointPlaner = "planets/";

let page = 1;
let data = "";

let nextBtn = document.querySelector(".next");
let backBtn = document.querySelector(".back");
backBtn.style.display = "none";
let pageNr = document.querySelector(".page-nr");
pageNr.innerText = `${page} / 9`;

let details = document.querySelector(".details__character");
let planetDetails = document.createElement("section");

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
    let planet = await response.json();
    createPlanetItem(planet);

    console.log(planet);
  } catch (error) {}
}

getCharacters();

function createPlanetItem(planet) {
  let planetSection = document.querySelector(".details__planet");
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
    console.log(item.name);
    displayListItems(listItem);

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
      let homeWorld = item.homeworld;
      getHomeworld(homeWorld);

      console.log(data);
      console.log(item.homeworld);
    });
  }
  displayListItems();
}

function displayListItems(listItem) {
  document.querySelector("ul").appendChild(listItem);
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

// document.querySelector(".next").addEventListener("click", () => {
//   if (page < 9) {
//     document.querySelector(".prev").style.color = "black";
//     charList.innerHTML = `<img src="https://media.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif">`;
//     page++;
//     document.querySelector(".nrPage").innerText = page;
//     findNames();
//     if (page == 9) {
//       document.querySelector(".next").style.color = "lightgray";
//     }
//   } else {
//     document.querySelector(".next").style.color = "lightgray";
//   }
// });

// document.querySelector(".prev").addEventListener("click", () => {
//   if (page > 1) {
//     document.querySelector(".next").style.color = "black";
//     charList.innerHTML = `<img src="https://media.giphy.com/media/6036p0cTnjUrNFpAlr/giphy.gif">`;
//     page--;
//     document.querySelector(".nrPage").innerText = page;
//     findNames();
//     if (page == 1) {
//       document.querySelector(".prev").style.color = "lightgray";
//     }
//   } else {
//     document.querySelector(".prev").style.color = "lightgray";
//   }
// });
