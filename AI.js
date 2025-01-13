const form = document.querySelector("#name-form");
const outputText = document.querySelector("#output");

window.addEventListener("load", () => {
  form.reset();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target.elements.name.value;
  outputText.textContent = "";

  fetch(`https://api.agify.io/?name=${inputValue}`)
    .then((res) => res.json())
    .then((data) => {
      let ageOutput = `${inputValue} is ${data.age} years old.`;

      fetch(`https://api.nationalize.io/?name=${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
          let countryId = data.country[0].country_id;
          let nationalityOutput = `${inputValue} is from ${countryId}.`;

          fetch(`https://api.genderize.io/?name=${inputValue}`)
            .then((res) => res.json())
            .then((data) => {
              let genderOutput = `${inputValue} is a ${data.gender}.`;

              outputText.textContent = `${ageOutput} ${nationalityOutput}  ${genderOutput}`;
            });
        });
    });
});
