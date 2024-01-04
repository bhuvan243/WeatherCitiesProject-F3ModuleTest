const addBtn = document.getElementById("add-city-btn");
const input = document.getElementById("searchbar");
const container = document.getElementById("weather-cards-containers");
const errorMessageContainer = document.getElementById("error-message");
const apiKey = "b78bd618b86451ce6f7ec0bb155135f8";
let citiesList = [];

////////////////////////////////////////////////////////////////
function displayList() {
  container.innerHTML = "";
  for (let item of citiesList) {
    const myCard = document.createElement("div");
    myCard.className = "city-container";
    myCard.innerHTML = `
         <div class="degree">${item.temperature.current}&deg;</div>
         <div class="temperature">
             <span class="high">H:${item.temperature.high}&deg;</span>
             <span class="low">L:${item.temperature.low}&deg;</span>
         </div>
         <div class="card-bottom">
             <span class="city-name">${item.city}, ${item.country}</span>
             <span class="cloud-type">${item.condition}</span>
         </div>
         <img src="./Assets/${item.cloudPic}.svg" alt="${item.condition}-cloud" class="cloud-img">
         `;
    container.appendChild(myCard);
  }
  document.getElementById("searchbar").value = "";
}
////////////////////////////////////////////////////////////////
function getCloudCondition(condition) {
  if (condition == "Dust" || condition == "Sand" || condition == "Haze")
    return "windy";
  else if (
    condition == "Rain" ||
    condition == "Thunderstorm" ||
    condition == "Drizzle"
  )
    return "rainny";
  else if (condition == "Clear") return "sunny";
  else return "cloudy";
}
////////////////////////////////////////////////////////////////
function sortCitiesList() {
  citiesList.sort((a, b) => a.temperature.current - b.temperature.current);
}
