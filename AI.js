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
      let ageOutput = `${inputValue} is ${data.age} years old and he is from`;

      fetch(`https://api.nationalize.io/?name=${inputValue}`)
        .then((res) => res.json())
        .then((data) => {
          let countryId = data.country[0].country_id;
          let nationalityOutput = `${countryId} also ${inputValue} is a`;

          fetch(`https://api.genderize.io/?name=${inputValue}`)
            .then((res) => res.json())
            .then((data) => {
              let genderOutput = `${data.gender}.`;

              outputText.textContent = `${ageOutput} ${nationalityOutput}  ${genderOutput}`;
            });
        });
    });
});
