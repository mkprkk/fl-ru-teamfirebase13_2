let allUserData = {};

function collectAllData() {
  const formContainer = document.querySelector(".form__container");
  const allElements = formContainer.querySelectorAll(".form__element");

  allUserData = {};

  allElements.forEach((element, index) => {
    const input = element.querySelector(".form__input");
    const selectContainer = element.querySelector(".form__select");
    const selectValue = element.querySelector(".form__select .select__value");
    const radio = element.querySelector(".form__radio");

    let key = null;
    let value = null;

    if (input) {
      key = input.name || `field_${index}`;
      value = input.value;
    } else if (selectValue) {
      key = selectContainer.dataset.name || `fieldSelect_${index}`;
      value = selectValue.dataset.value;
    } else if (radio) {
      key = radio.name || `field_${index}`;
      value = radio.dataset.value;
    }

    if (key) {
      allUserData[key] = value;
    }
  });

  console.log("Собранные данные формы:", allUserData);
}

// const formContainer = document.querySelector('.form__container');

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "data-all-valid") {
      const isValid = formContainer.dataset.allValid === "true";
      if (isValid) {
        collectAllData();
      }
    }
  });
});

observer.observe(formContainer, {
  attributes: true,
});
