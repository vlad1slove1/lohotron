import { hideTelNumber } from './utils.js';

const container = document.querySelector('.container');
const defaultSlot = '❓ ❓ ❓ ❓ ❓';
let spinnerIdCount = 1;

export const renderSpinners = (spinnersCount) => {
  const winnerEl = document.createElement('div');
  winnerEl.classList.add('winners');
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
  winnersBar.textContent = 'Победители';

  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');

  const { winners } = state.collection;

  winners.forEach((winner) => {
    const modalItem = document.createElement('button');
    modalItem.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    modalItem.setAttribute('type', 'button');
    modalItem.setAttribute('data-bs-toggle', 'modal');
    modalItem.setAttribute('data-bs-target', '#modal');
    modalItem.textContent = winner.displayName;

    modalTitle.textContent = winner.displayName;
    modalBody.textContent = `${winner.name} ${winner.secondName}\nгород: ${winner.city}\nтел.: ${hideTelNumber(winner.phone)}`;

    winnersBar.append(modalItem);
  });
};
