document.addEventListener("click", toggleExample);

function toggleExample(evt) {
  const exampleBlock = evt.target.closest(".show-example");
  if (exampleBlock) {
    const exampleImg = exampleBlock.querySelector(".example-img");
    const exampleArrow = exampleBlock.querySelector(".example-arrow");
    const exampleText = exampleBlock.querySelector(".example-text");

    if (exampleText.textContent === "Show example") {
      exampleText.textContent = "Close";
    } else {
      exampleText.textContent = "Show example";
    }

    exampleArrow.classList.toggle("example-arrow__rotate");
    exampleImg.classList.toggle("example-img__is-animated");
    exampleImg.classList.toggle("hidden");
  }
}