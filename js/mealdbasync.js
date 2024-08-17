const searchFood = async () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  searchField.value = "";

  if (searchText === "") {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";

    const emptySearchMesssage = document.createElement("p");
    emptySearchMesssage.classList.add(
      "text-center",
      "fs-4",
      "fw-bold",
      "text-danger",
      "mt-4"
    );
    emptySearchMesssage.textContent =
      "Please enter a search term to find a meal.";
    searchResult.appendChild(emptySearchMesssage);
    return;
  }

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

  const res = await fetch(url);
  const data = await res.json();
  displaySearchResult(data.meals);


  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => displaySearchResult(data.meals));
};

const displaySearchResult = (meals) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";

  if (!meals || meals.length == 0) {
    const noResultMessage = document.createElement("p");
    noResultMessage.classList.add(
      "text-center",
      "fs-4",
      "fw-bold",
      "text-danger",
      "mt-4"
    );
    noResultMessage.textContent =
      "No results found. Please try searching with a different keyword";
    searchResult.appendChild(noResultMessage);
    return;
  }

  meals.forEach((meal) => {
    console.log(meal);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
    </div>
        `;
    searchResult.appendChild(div);
  });
};

const loadMealDetail = async (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  const res = await fetch(url);
  const data = await res.json();
  displayMealDetail(data.meals[0]);

  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => displayMealDetail(data.meals[0]));
};

const displayMealDetail = (meal) => {
  console.log(meal);
  const mealDetails = document.getElementById("meal-details");
  mealDetails.textContent = ' ';
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
          <a href="${meal.strYoutube}" class="btn btn-primary">Go Somewhere</a>
        </div>
  `;
  mealDetails.appendChild(div);
};
