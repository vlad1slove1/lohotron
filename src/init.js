import collection from '../__fixtures__/collection.js';
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
    participants: collection, // array of objects [{}, {}, {} ...];
    winners: [], // array of objects [{}, {}, {} ...];
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

            if (animationId) clearInterval(animationId);

            animationId = setInterval(() => {
              displayBar.innerText = values[getRandomValue(values)];
            });

            return animationId;
          };

          const parentSpinner = target.closest('div').parentNode;
          const bar = parentSpinner.querySelector('.bar');

          state.running = true;
          document.documentElement.style.setProperty('--speed', 5);
          updateAnimation(bar);

          bar.classList.add('down');
          target.classList.add('disabled');

          const initTime = 5000; // in average 7 seconds of rolling
          const inter = 500;

          const init = () => {
            setTimeout(() => {
              document.documentElement.style.setProperty('--speed', 5);
              setTimeout(() => {
                document.documentElement.style.setProperty('--speed', 4);
                setTimeout(() => {
                  document.documentElement.style.setProperty('--speed', 3);
                  setTimeout(() => {
                    document.documentElement.style.setProperty('--speed', 2);
                    setTimeout(() => {
                      document.documentElement.style.setProperty('--speed', 1);

                      bar.classList.remove('down');
                      clearInterval(animationId);

                      setTimeout(() => {
                        addWinnerToState(bar, state);
                        removeWinnerFromCollection(state);
                        renderWinners(state);

                        state.running = false;
                      }, 100);
                    }, inter);
                  }, inter);
                }, inter);
              }, inter);
            }, initTime);
          };

          init();
        }
      }
    });
  });
};
