const openFieldHandler = (evt) => {
  const formElement = evt.target?.closest(".form__element");

  if (!formElement) return;

  if (formElement.classList.contains("radio")) return;

  openField(formElement, evt);
};

document.addEventListener("click", openFieldHandler);

function closeSelectInput(input, value, element) {
  input.scrollTop = 0;
  input.classList.remove("select-open");
  input.classList.add("selected");
  value.hidden = false;
  element.style.setProperty("--rotate", "0deg");
}

function selectElementHandleClick(input, value, evt, element) {
  evt.stopPropagation();

  closeSelectInput(input, value, element);
  value.textContent = evt.target.textContent;
  value.dataset.value = evt.target.dataset.value;

  if (value.dataset.value) {
    element.classList.add("element-active", "valid");
  } else {
    element.classList.remove("element-active", "valid");
  }

  const formElement = element.closest("form");

  checkFormValidity(formElement);
}

function openField(element) {
  if (element.classList.contains("email-element")) return;

  const title = element.querySelector(".form__element-title");
  const input =
    element.querySelector(".form__input") ||
    element.querySelector(".form__select") ||
    element.querySelector(".form__select.selected");

  input.classList.add("input-opened");
  title.classList.add("title-opened");
  element.classList.add("element-opened");
  element.style.setProperty("--rotate", "180deg");

  if (input.classList.contains("form__input")) {
    input.focus();
  }

  if (input.type === "tel") {
    input.value = "+1 ";
    input.setSelectionRange(input.value.length, input.value.length);
    input.addEventListener("keydown", (evt) => {
      if (
        input.selectionStart <= 3 &&
        (evt.key === "Backspace" || evt.key === "Delete")
      ) {
        evt.preventDefault();
      }
    });
  }

  if (input.getAttribute("inputmode") === "numeric") {
    input.addEventListener("keydown", (evt) => {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Home",
        "End",
      ];

      const isNumberKey = /^[0-9-]$/.test(evt.key);
      const isAllowedKey = allowedKeys.includes(evt.key);

      if (!isNumberKey && !isAllowedKey) {
        evt.preventDefault();
      }
    });
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
      if (!evt.target.closest(".element-opened")) {
        closeSelectInput(input, value, element);
      }
    });
    if (
      element.querySelector('[data-name="state"]') ||
      element.querySelector('[data-name="issuingState"]')
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
