const footerBlockTemplate =
  document.querySelector("#form-footer-block").content;
const safetyContainer = footerBlockTemplate
  .querySelector(".form__safety-container")
  .cloneNode(true);
const navigationBlock = footerBlockTemplate
  .querySelector(".form__navigation")
  .cloneNode(true);
const nextButton = navigationBlock.querySelector("#next-button").content;
const requestButton = navigationBlock.querySelector("#request-button").content;

const footerBlock = document.querySelector(".form__footer-block");

const testElement = document.getElementById("test");

function initFooterBlock() {
  footerBlock.prepend(safetyContainer);

  navigationBlock.append(nextButton);
  footerBlock.prepend(navigationBlock);
}

initFooterBlock();

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

const forms = Array.from(document.querySelectorAll('form'));
forms.forEach((form, idx) => {
  if (idx === 0) return;
  form.classList.add('hidden');
})
// for (let i = 1, i < )
//  document.getElementById(`step-${}`))
