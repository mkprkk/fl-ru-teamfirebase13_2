function showError(formInput, formElement) {
  const errorId = `error-${formInput.name}`;
  let existingError = document.getElementById(errorId);

  if (existingError) {
    existingError.classList.remove("hide-error");
    formElement.classList.remove("element-active");
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

  if (formInput.value.trim() === "") {
    formElement.classList.remove("element-active");
  } else {
    formElement.classList.add("element-active");
  }
}

function checkFormValidity(form) {
  const inputs = Array.from(form.querySelectorAll(".form__input"));
  const selects = Array.from(form.querySelectorAll(".select__value"));
  const radioGroups = Array.from(form.querySelectorAll(".form__element.radio"));

  const anyEmptyInput = inputs.some((input) => input.value.trim() === "");

  const anyEmptySelect = selects.some(
    (select) => select.textContent.trim() === ""
  );

  const anyEmptyRadioGroup = radioGroups.some((group) => {
    const radios = group.querySelectorAll('input[type="radio"]');
    const name = radios[0]?.name;
    if (!name) return true;
    return !form.querySelector(`input[name="${name}"]:checked`);
  });

  const errors = Array.from(
    form.querySelectorAll(".form-error:not(.hide-error)")
  );

  const button =
    form.querySelector("#nextButton") || form.querySelector("#requestButton");
  if (!button) return;

  const isInvalid =
    errors.length > 0 || anyEmptyInput || anyEmptySelect || anyEmptyRadioGroup;

  if (isInvalid) {
    button.classList.add("button-disbaled");
    button.disabled = true;
  } else {
    button.classList.remove("button-disbaled");
    button.disabled = false;
  }
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

document.addEventListener("input", handleValidation);

document.addEventListener("change", (evt) => {
  const form = evt.target.closest("form");
  if (form) {
    checkFormValidity(form);
  }
});

document.querySelectorAll("form").forEach((form) => {
  checkFormValidity(form);
});
