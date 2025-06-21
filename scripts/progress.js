const allElements = Array.from(document.querySelectorAll(".form__element"));
const progressElement = document.querySelector('.progress');
const formContainer = document.querySelector('.form__container');

function updateProgress() {
  const total = allElements.length;
  const validCount = allElements.filter(el => el.classList.contains("valid")).length;

  const progressRatio = validCount / total;
  const progressPercent = Math.round(progressRatio * 100);

  const barWidth = progressElement.clientWidth;
  const bubbleWidth = 42; 
  const offset = 40; 

  let posPx = (progressPercent / 100) * barWidth - offset;

  posPx = Math.max(0, Math.min(posPx, barWidth - bubbleWidth));

  progressElement.style.setProperty("--progress-line", progressRatio);
  progressElement.style.setProperty("--progress-procent", `"${progressPercent}%"`);
  progressElement.style.setProperty("--procent-position", `${posPx}px`);

  if (progressPercent === 100) {
    formContainer.dataset.allValid = true;
  }
}
