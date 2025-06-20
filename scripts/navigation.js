function nextStep(forms, evt) {
  const moveForward = () => {
    evt.preventDefault();
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
  const moveBackward = () => {
    forms[currentStepIdx].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    currentStepIdx -= 1;
    forms[currentStepIdx + 1].classList.add("hidden");
    forms[currentStepIdx].classList.remove("hidden");
  };

  if (currentStepIdx === 0) return;
  moveBackward();
}