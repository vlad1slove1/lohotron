import collection from '../__fixtures__/collection.js';
import { renderSpinners, renderItem } from './render.js';
import addWinnerToState from './addWinnerToState.js';

const state = {
  running: false,
  spinnersCount: 2,
  collection: {
    participants: collection, // array of objects [{}, {}, {} ...];
    winners: [], // array of objects [{}, {}, {} ...];
  },
};

/**
 * find all reset buttons, then find their parent nodes (spinners)
 * on click rerender the default view of found parent node
 */

const resetButtonsHandler = () => {
  const spinners = document.querySelectorAll('.spinner');

  spinners.forEach((spinner) => {
    const resetButton = spinner.querySelector('.reset-btn');

    if (spinner.id === resetButton.id) {
      resetButton.addEventListener('click', (event) => {
        const { target } = event;
        const parentSpinner = target.closest('div').parentNode;

        parentSpinner.innerHTML = '';
        document.documentElement.removeAttribute('style');
        renderItem(parentSpinner);
      });
    }
  });
};

const values = state.collection.participants.map((participant) => participant.displayName);
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

/**
 * find all start buttons, then find their parent nodes (spinners)
 * on click launch scroll function
 */

const startButtonsHandler = () => {
  const spinners = document.querySelectorAll('.spinner');

  spinners.forEach((spinner) => {
    const startButton = spinner.querySelector('.start-btn');

    if (spinner.id === startButton.id) {
      startButton.addEventListener('click', (event) => {
        const { target } = event;
        const parentSpinner = target.closest('div').parentNode;
        const bar = parentSpinner.querySelector('.bar');

        state.running = true;
        document.documentElement.style.setProperty('--speed', 5);
        updateAnimation(bar);

        bar.classList.add('down');
        startButton.classList.add('disabled');

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

                      console.group('bar text => state.collection.winners');
                      console.log(bar.innerText);
                      console.log('winners', state.collection.winners);
                      console.groupEnd();

                      state.running = false;
                    }, 100);
                  }, inter);
                }, inter);
              }, inter);
            }, inter);
          }, initTime);
        };

        init();
      });
    }
  });
};

export default () => {
  // rendering spinners, according to state.spinnersCount
  renderSpinners(state.spinnersCount);

  // rendering bar, buttons and initial state to all spinners
  const spinners = document.querySelectorAll('.spinner');
  spinners.forEach((spinner) => renderItem(spinner));

  // adding event listeners on click to buttons
  spinners.forEach((spinner) => spinner.addEventListener('click', resetButtonsHandler));
  spinners.forEach((spinner) => spinner.addEventListener('click', startButtonsHandler));
};
