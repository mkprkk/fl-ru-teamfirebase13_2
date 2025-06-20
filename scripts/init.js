const footerBlockTemplate =
  document.querySelector("#form-footer-block").content;
const includingTextTemplate = document.querySelector("#including-text").content;
const showExampleTemplate = document.querySelector("#show-example").content;

const forms = Array.from(document.querySelectorAll("form"));
forms.forEach((form, idx) => {
  const formElements = Array.from(form.querySelectorAll(".form__element"));

  formElements.forEach((formElement) => {
    const formSelect = formElement.querySelector(".form__select");

    if (formSelect && !formSelect.querySelector(".select__value")) {
      const selectedValue = document.createElement("li");
      selectedValue.classList.add("select__value");
      formSelect.prepend(selectedValue);
    }

    if (formElement.dataset.includingText) {
      const includingTextContainer = includingTextTemplate
        .querySelector(".including-text")
        .cloneNode(true);
      const includingText = formElement.dataset.includingText;
      includingTextContainer.textContent = includingText;
      formElement.insertAdjacentElement("afterend", includingTextContainer);
      
    } 

    else if (formElement.dataset.hasExample) {
      const showExampleContainer = showExampleTemplate
        .querySelector(".show-example")
        .cloneNode(true);
      formElement.insertAdjacentElement("afterend", showExampleContainer);

      const exampleImgElement = document.createElement("img");
      exampleImgElement.src = formElement.dataset.exampleUrl;
      exampleImgElement.classList.add('example-img', 'hidden');
      exampleImgElement.alt = "Example";
      
      showExampleContainer.append(exampleImgElement);
    }
  });

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
}


