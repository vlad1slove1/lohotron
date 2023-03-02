import participants from '../__fixtures__/participants.js';
import blackList from '../__fixtures__/blackList.js';
import {
  renderSpinners,
  renderItem,
  renderWinners,
} from './render.js';
import { addWinnerToState, removeWinnerFromCollection } from './utils.js';

const state = {
  running: false,
  spinnersCount: 2,
  collection: {
    participants, // array of objects [{}, {}, {} ...];
    winners: [],
  },
};

export default () => {
  // rendering spinners, according to state.spinnersCount
  renderSpinners(state.spinnersCount);

  // rendering bar, buttons and initial state to all spinners
  const spinners = document.querySelectorAll('.spinner');
  spinners.forEach((spinner) => {
    renderItem(spinner);

    spinner.addEventListener('click', (event) => {
      const { target } = event;

      if (target.nodeName === 'BUTTON') {
        // reset buttons handler (rerender to initial state)
        if (target.classList.contains('reset-btn')) {
          const parentSpinner = target.closest('div').parentNode;

          parentSpinner.innerHTML = '';
          document.documentElement.removeAttribute('style');

          renderItem(parentSpinner);
        }

        // start buttons handler (init spinner)
        if (target.classList.contains('start-btn')) {
          const values = state.collection.participants
            .map((participant) => participant.displayName);
          const getRandomValue = () => Math.floor(Math.random() * values.length);

          let animationId;
          const updateAnimation = (bar) => {
            const displayBar = bar;

            const blackListColl = blackList.map((item) => item.displayName);
            const filteredParticipants = values.filter((item) => !blackListColl.includes(item));

            animationId = setInterval(() => {
              const currentWinner = values[getRandomValue()];

              if (blackListColl.includes(currentWinner)) {
                displayBar.textContent = filteredParticipants[getRandomValue()];
                return;
              }

              displayBar.textContent = currentWinner;
            }, 100);
          };

          const parentSpinner = target.closest('div').parentNode;
          const bar = parentSpinner.querySelector('.bar');

          state.running = true;
          updateAnimation(bar);

          target.classList.add('disabled');

          const initTime = 5000;

          const init = setTimeout(() => {
            clearInterval(animationId);
            addWinnerToState(bar, state);
            removeWinnerFromCollection(state);
            renderWinners(state);

            state.running = false;
          }, initTime);

          return init;
        }
      }

      return false;
    });
  });
};
