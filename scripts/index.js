const footerBlockTemplate =
  document.querySelector("#form-footer-block").content;

let currentStepIdx = 0;

const forms = Array.from(document.querySelectorAll("form"));
forms.forEach((form, idx) => {
  const footerBlock = form.querySelector(".form__footer-block");
  if (idx === forms.length - 1) {
    initFooterBlock(footerBlock, { isFinal: true });
  } else {
    initFooterBlock(footerBlock);
  }

  if (idx === 0) return;
  form.classList.add("hidden");
});

function initFooterBlock(footerBlock, isFinal) {
  const navigationBlock = footerBlockTemplate
    .querySelector(".form__navigation")
    .cloneNode(true);

  const nextButton = navigationBlock.querySelector("#next-button").content;
  const requestButton =
    navigationBlock.querySelector("#request-button").content;

  const safetyContainer = footerBlockTemplate
    .querySelector(".form__safety-container")
    .cloneNode(true);

  footerBlock.prepend(safetyContainer);
  footerBlock.prepend(navigationBlock);
  if (isFinal) {
    navigationBlock.append(requestButton);
  } else {
    navigationBlock.append(nextButton);
  }

  const nextStepHandler = () => nextStep(forms);
  const prevStepHandler = () => prevStep(forms);

  const buttons = Array.from(navigationBlock.querySelectorAll(".form__button"));
  buttons.forEach((button) => {
    if (button.id === "nextButton") {
      button.addEventListener("click", nextStepHandler);
    } else if (button.id === "prevButton") {
      button.addEventListener("click", prevStepHandler);
    } else if (button.id === "requestButton") {
    }
  });
}

// --------------------------------------------------------------------------------

function closeSelectInput(input, value, element) {
  input.classList.remove("select-open");
  input.classList.add("selected");
  value.hidden = false;
  element.style.setProperty("--rotate", "0deg");
}

function openField(element) {
  const title = element.querySelector(".form__element-title");
  const input =
    element.querySelector(".form__input") ||
    element.querySelector(".form__select") ||
    element.querySelector(".form__select.selected");
  const value = element.querySelector(".select__value");

  input.style.visibility = "visible";
  input.style.display = "initial";
  input.style.opacity = "1";
  title.style.transform = "translateY(-90%)";
  element.style.setProperty("--rotate", "180deg");

  if (input.classList.contains("form__select")) {
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
  }
}

function selectElementHandleClick(input, value, evt, element) {
  evt.stopPropagation();

  input.classList.remove("select-open");
  input.classList.add("selected");
  value.hidden = false;
  element.style.setProperty("--rotate", "0deg");
  value.textContent = evt.target.textContent;
  value.value = evt.target.value;
}

const openFieldHandler = () => openField(testElement);
test.addEventListener("click", openFieldHandler);

// --------------------------------------------------------------------------------

function nextStep(forms) {
  if (currentStepIdx === forms.length - 1) return;
  forms[currentStepIdx].classList.add("hidden");
  currentStepIdx += 1;
  forms[currentStepIdx].classList.remove("hidden");
}

function prevStep(forms) {
  if (currentStepIdx === 0) return;
  currentStepIdx -= 1;
  forms[currentStepIdx + 1].classList.add("hidden");
  forms[currentStepIdx].classList.remove("hidden");
}
