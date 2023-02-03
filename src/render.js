import { hideTelNumber } from './utils.js';

const container = document.querySelector('.container');
const defaultSlot = '❓ ❓ ❓ ❓ ❓';
let spinnerIdCount = 1;

export const renderSpinners = (spinnersCount) => {
  const winnerEl = document.createElement('div');
  winnerEl.classList.add('winners', 'fw-bold');
  container.append(winnerEl);

  for (let i = 0; i < spinnersCount; i += 1) {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.setAttribute('id', spinnerIdCount);
    spinnerIdCount += 1;

    container.append(spinner);
  }
};

export const renderItem = (spinner) => {
  const spinnerID = spinner.getAttribute('id');

  const wheel = document.createElement('div');
  wheel.classList.add('wheel');

  const bar = document.createElement('div');
  bar.classList.add('bar');
  bar.textContent = defaultSlot;
  wheel.append(bar);

  const buttons = document.createElement('div');
  buttons.classList.add('buttons', 'btn-group');
  buttons.setAttribute('role', 'group');
  buttons.setAttribute('aria-label', 'Basic mixed styles example');

  const startButton = document.createElement('button');
  startButton.setAttribute('type', 'button');
  startButton.setAttribute('id', spinnerID);
  startButton.classList.add('start-btn', 'btn', 'btn-outline-primary', 'btn-lg');
  startButton.textContent = 'Spin';

  const resetButton = document.createElement('button');
  resetButton.setAttribute('type', 'button');
  resetButton.setAttribute('id', spinnerID);
  resetButton.classList.add('reset-btn', 'btn', 'btn-outline-secondary', 'btn-lg');
  resetButton.textContent = 'Reset';

  buttons.append(startButton, resetButton);
  spinner.append(wheel, buttons);
};

export const renderWinners = (state) => {
  const winnersBar = document.querySelector('.winners');
  winnersBar.innerHTML = '';

  let modalIDCounter = 1;
  winnersBar.textContent = 'Победители';

  const { winners } = state.collection;

  winners.forEach((winner) => {
    const commentModalButton = document.createComment(`Button-${modalIDCounter} trigger modal`);

    const modalButton = document.createElement('button');
    modalButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    modalButton.setAttribute('type', 'button');
    modalButton.setAttribute('data-bs-toggle', 'modal');
    modalButton.setAttribute('data-bs-target', `#modal-${modalIDCounter}`);
    modalButton.textContent = winner.displayName;

    const commentModalDiv = document.createComment(`Modal-${modalIDCounter}`);

    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal', 'fade');
    modalDiv.setAttribute('id', `modal-${modalIDCounter}`);
    modalDiv.setAttribute('role', 'dialog');
    modalDiv.setAttribute('tabindex', '-1');
    modalDiv.setAttribute('aria-labelledby', 'modal');
    modalDiv.setAttribute('aria-hidden', 'true');

    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.setAttribute('role', 'document');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    const h5 = document.createElement('h5');
    h5.classList.add('modal-title', 'fw-bold');
    h5.textContent = winner.displayName;
    modalHeader.append(h5);

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body', 'fw-normal', 'font-monospace');
    modalBody.innerText = `${winner.name} ${winner.secondName}\nгород: ${winner.city}\nтел.: ${hideTelNumber(winner.phone)}`;

    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');

    const footerButton = document.createElement('button');
    footerButton.classList.add('btn', 'btn-secondary');
    footerButton.setAttribute('type', 'button');
    footerButton.setAttribute('data-bs-dismiss', 'modal');
    footerButton.textContent = 'Закрыть';
    modalFooter.append(footerButton);

    modalContent.append(modalHeader, modalBody, modalFooter);
    modalDialog.append(modalContent);
    modalDiv.append(modalDialog);

    modalIDCounter += 1;
    winnersBar.append(commentModalButton, modalButton, commentModalDiv, modalDiv);
  });
};
