const emailElement = document.querySelector(".email-element");
const emailInput = emailElement.querySelector(".form__input");

function emailModal() {
  const dialog = document.getElementById("emailDialog");
  const email = dialog.querySelector(".email");
  const confirmBtn = dialog.querySelector(".email-dialog__button-confirm");
  const editBtn = dialog.querySelector(".email-dialog__button-edit");

  email.textContent = emailInput.value;

  function confirmHandler() {
    cleanup();
    dialog.close();
  }

  function editHandler() {
    emailInput.focus();
    cleanup();
    dialog.close();
  }

  function cleanup() {
    confirmBtn.removeEventListener("click", confirmHandler);
    editBtn.removeEventListener("click", editHandler);
    dialog.removeEventListener("close", cleanup);
  }

  confirmBtn.addEventListener("click", confirmHandler);
  editBtn.addEventListener("click", editHandler);
  dialog.addEventListener("close", cleanup);

  dialog.showModal();
}

emailInput.addEventListener("change", emailModal);