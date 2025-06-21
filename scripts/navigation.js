const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

document.querySelector(".form__prev-button").classList.add("button-disbaled");

let currentStepIdx = 0;

document.addEventListener("click", (evt) => {
  const nextButton = evt.target.closest("#nextButton");
  const prevButton = evt.target.closest("#prevButton");

  if (nextButton) {
    evt.preventDefault();
    nextStep(forms, evt);
  } else if (prevButton) {
    evt.preventDefault();
    prevStep(forms);
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    const activeForm = document.querySelector("form:not(.hidden)");
    if (!activeForm) return;

    checkFormValidity(activeForm);

    const isButtonDisabled =
      activeForm.querySelector("#nextButton")?.disabled ||
      activeForm.querySelector("#requestButton")?.disabled;

    if (isButtonDisabled) {
      evt.preventDefault();
      return;
    }

    evt.preventDefault();
    nextStep(forms);
  }
});

function nextStep(forms) {
  const moveForward = () => {
    forms[currentStepIdx].classList.add("hidden");
    currentStepIdx += 1;
    forms[currentStepIdx].classList.remove("hidden");

    forms[currentStepIdx].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (currentStepIdx === forms.length - 1) return;
  moveForward();
}

function prevStep(forms) {
  const backBackward = () => {
    forms[currentStepIdx].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    currentStepIdx -= 1;
    forms[currentStepIdx + 1].classList.add("hidden");
    forms[currentStepIdx].classList.remove("hidden");
  };

  if (currentStepIdx === 0) return;
  backBackward();
}
