//document.querySelectorAll returns nodeList

function addEventListenerToNodeList(nodeList, dialog) {
  if (dialog && nodeList.length > 0) {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].addEventListener("click", () => openModal(dialog));
      dialog.addEventListener("click", (e) => closeModal(e, dialog));
    }
  }
}

function openModal(dialog) {
  dialog.showModal();
}

function closeModal(e, dialog) {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
}
