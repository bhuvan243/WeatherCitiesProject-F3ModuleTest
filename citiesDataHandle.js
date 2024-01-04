////////////////////////////////////////////////////////////////  
async function fetchDetails(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      // Exception handling
      if (response.ok) {
        const cloudCondition = getCloudCondition(data.weather[0].main);
        citiesList.push({
          city: data.name,
          country: data.sys.country,
          temperature: {
            current: Math.floor(data.main.temp),
            high: Math.floor(data.main.temp_max),
            low: Math.floor(data.main.temp_min),
          },
          condition: data.weather[0].main,
          cloudPic: cloudCondition,
        });
        sortCitiesList();
        displayList();
      } else{
        errorMessageContainer.innerText = `Hint : City not found`;
      }
    } catch (err) {
      console.log("Error:" + err);
    }
  }
////////////////////////////////////////////////////////////////  
function checkForDuplicates(cityInput) {
  for (let item of citiesList) {
    if (item.city.toLowerCase() == cityInput.toLowerCase()) {
      return true;
    }
  }
}
////////////////////////////////////////////////////////////////  
function checkForValidInput() {
  const inputElement = document.getElementById("searchbar");
  const inputValue = inputElement.value;
  if (!inputValue) {
    errorMessageContainer.innerText = "Please enter a valid city";
  } else if (checkForDuplicates(inputValue)) {
    errorMessageContainer.innerText = `Hint : ${inputValue
      .charAt(0)
      .toUpperCase()}${inputValue.slice(1)} is already present`;
      inputElement.value = '';
  } else {
    errorMessageContainer.innerText = "";
    fetchDetails(inputValue);
  }
}

input.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    checkForValidInput();
  }
});
addBtn.addEventListener("click", checkForValidInput);
