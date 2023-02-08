const url_base = "https://swapi.dev/api/";
const endPointCharacter = "people/?page=";
const endPointPlaner = "planets/";

let page = 1;
let data = "";

async function getCharacters() {
  try {
    let response = await fetch(url_base + "people/?page=" + page);
    data = await response.json();

    createListItem(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getCharacters();

function createListItem(data) {
  for (let item of data.results) {
    let listItem = document.createElement("li");
    listItem.innerText = item.name;
    console.log(item.name);
    displayListItems(listItem);

    listItem.addEventListener("click", () => {
      let details = document.querySelector(".details__character");
      details.innerHTML = "";
      let detailsItems = document.createElement("li");
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
    });
  }
  displayListItems();
}

function displayListItems(listItem) {
  document.querySelector("ul").appendChild(listItem);
}
