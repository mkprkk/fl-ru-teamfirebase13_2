function showError(formInput, formElement) {
  const errorId = `error-${formInput.name}`;
  let existingError = document.getElementById(errorId);

  if (existingError) {
    existingError.classList.remove("hide-error");
    formElement.classList.remove("element-active", "valid");
  } else {
    const errorContainer = document.createElement("p");
    errorContainer.classList.add("form-error");
    errorContainer.id = errorId;
    errorContainer.textContent = formInput.dataset.errorMessage || "Error";

    formElement.insertAdjacentElement("afterend", errorContainer);
  }
}

function hideError(formInput, formElement) {
  const errorId = `error-${formInput.name}`;
  const existingError = document.getElementById(errorId);

  if (existingError) {
    existingError.classList.add("hide-error");
  }

  const isRadioGroup = formElement.classList.contains("radio");
  const isEmpty = formInput.value?.trim() === "";

  if (isEmpty && !isRadioGroup) {
    formElement.classList.remove("element-active");
  } else if (!isRadioGroup) {
    formElement.classList.add("element-active");
    formElement.classList.add("valid");
  }
}

function checkFormValidity(form) {
  const allElements = Array.from(form.querySelectorAll(".form__element"));
  const button =
    form.querySelector("#nextButton") || form.querySelector("#requestButton");
  if (!button) return;

  const allValid = allElements.every((el) => el.classList.contains("valid"));

  if (allValid) {
    button.classList.remove("button-disbaled");
    button.disabled = false;
  } else {
    button.classList.add("button-disbaled");
    button.disabled = true;
  }

  updateProgress();
}

function handleValidation(evt) {
  const formElement = evt.target.closest(".form__element");
  const formInput = formElement?.querySelector(".form__input");
  if (!formInput) return;

  const isValid = formInput.validity.valid;


  if (!isValid) {
    showError(formInput, formElement);
  } else {
    hideError(formInput, formElement);
  }

  const form = evt.target.closest("form");
  if (form) {
    checkFormValidity(form);
  }
}

function validateRadioGroup(groupElement) {
  const radios = groupElement.querySelectorAll('input[type="radio"]');
  if (!radios) return;

  const name = radios[0].name;
  const checked = groupElement.querySelector(`input[name="${name}"]:checked`);

  if (checked) {
    groupElement.classList.add("valid");
    hideError(radios[0], groupElement);
  } else {
    groupElement.classList.remove("valid");
    showError(radios[0], groupElement);
  }
}

document.querySelectorAll("form").forEach((form) => {
  checkFormValidity(form);
});

document.addEventListener("input", handleValidation);

document.addEventListener("change", (evt) => {
  const form = evt.target.closest("form");
  const formElement = evt.target.closest(".form__element");

  if (formElement?.classList.contains("radio")) {
    validateRadioGroup(formElement);
  }

  if (form) checkFormValidity(form);
});
