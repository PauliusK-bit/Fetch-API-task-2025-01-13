const dogForm = document.querySelector("#dogs");
const dogBreedSelect = document.querySelector("#category");
const dogBreedSubmitButton = document.querySelector("#dogs button");
const imageWrapper = document.querySelector("#picture");

fetch("https://dog.ceo/api/breeds/list/all")
  .then((res) => res.json())
  .then((data) => {
    const breeds = Object.entries(data.message);
    breeds.forEach(([breed, subBreeds]) => {
      const categoryOption = document.createElement("option");
      categoryOption.value = breed;
      categoryOption.textContent = breed;
      dogBreedSelect.append(categoryOption);

      subBreeds.forEach((subBreed) => {
        const subBreedOption = document.createElement("option");
        subBreedOption.value = `${breed}/${subBreed}`;
        subBreedOption.textContent = `${breed} ${subBreed}  `;
        dogBreedSelect.append(subBreedOption);
      });
    });
  });

dogForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let selectedBreed = event.target.elements["category"].value;

  fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
    .then((res) => res.json())
    .then((data) => {
      let imageUrl = data.message;
      let imageElement = document.createElement("img");
      imageElement.src = imageUrl;

      imageWrapper.innerHTML = "";
      imageWrapper.append(imageElement);
    });
});
