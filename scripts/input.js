const citiesInput = document.querySelector('[name="cities"]');
const citiesElement = citiesInput.closest(".form__element");
citiesElement.classList.add("unactive");

function closeSelectInput(input, value, element) {
  input.scrollTop = 0;
  input.classList.remove("select-open");
  input.classList.add("selected");
  value.hidden = false;
  element.style.setProperty("--rotate", "0deg");
}

function setCitiesByState() {
  const citiesListItems = citiesInput.querySelectorAll(
    "li:not(.select__value)"
  );
  citiesListItems.forEach((li) => li.remove());
  const stateValue = document
    .querySelector('[name="state"]')
    .querySelector(".select__value").dataset.value;
  const currentCities = states[stateValue];
  currentCities.forEach((city) => {
    const cityElement = document.createElement("li");
    cityElement.dataset.value = city;
    cityElement.textContent = city;
    citiesInput.append(cityElement);
    if (citiesInput.children.length !== 1)
      citiesElement.classList.remove("unactive");
  });
}

function selectElementHandleClick(input, value, evt, element) {
  evt.stopPropagation();

  closeSelectInput(input, value, element);
  value.textContent = evt.target.textContent;
  value.dataset.value = evt.target.dataset.value;

  if (evt.currentTarget === document.querySelector('[name="state"]')) {
    setCitiesByState();
  }
}

function openField(element) {
  if (element.classList.contains("email-element")) return;
  const title = element.querySelector(".form__element-title");
  const input =
    element.querySelector(".form__input") ||
    element.querySelector(".form__select") ||
    element.querySelector(".form__select.selected");

  input.style.visibility = "visible";
  input.style.display = "initial";
  input.style.opacity = "1";
  title.style.transform = "translateY(-90%)";
  element.style.setProperty("--rotate", "180deg");
  element.style.cursor = "default";

  if (input.classList.contains("form__input")) {
    input.focus();
  }

  if (input.classList.contains("form__select")) {
    const value = element.querySelector(".select__value");
    value.hidden = true;
    input.classList.remove("selected");
    input.classList.add("select-open");

    const selectElementHandler = (evt) =>
      selectElementHandleClick(input, value, evt, element);
    input.addEventListener("click", selectElementHandler, { once: true });
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        closeSelectInput(input, value, element);
      }
    });
    document.addEventListener("click", (evt) => {
      if (!element.contains(evt.target)) {
        closeSelectInput(input, value, element);
      }
    });
    if (
      element.querySelector('[name="state"]') ||
      element.querySelector('[name="issuingState"]')
    ) {
      Object.keys(states).forEach((state) => {
        const stateElement = document.createElement("li");
        stateElement.dataset.value = state;
        stateElement.textContent = state;
        input.append(stateElement);
      });
    }
  }
}