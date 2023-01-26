import collection from '../__fixtures__/collection.js';
import { renderSpinners, renderItem } from './render.js';

const state = {
  running: false,
  spinnersCount: 3,
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

/**
 * find all start buttons, then find their parent nodes (spinners)
 * on click launch scroll function
 */

const values = state.collection.participants.map((participant) => participant.displayName);
const getRandomValue = () => Math.floor(Math.random() * values.length);

let animationId;
const updateAnimation = (newTime, bar) => {
  if (animationId) clearInterval(animationId);

  // eslint-disable-next-line no-return-assign, no-param-reassign
  animationId = setInterval(() => bar.innerText = values[getRandomValue(values)], newTime * 500);

  return animationId;
};

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
        const newTime = 0.1;
        updateAnimation(newTime, bar);

        bar.classList.add('down');
        startButton.setAttribute('disabled', true);

        let currentTime = (6 - 5) * 1000;
        let currentValue = 5;
        let stepValue = currentTime / 5;
        let initTime = (parseInt(Math.random() * 5, 10) + 1) * 1000;
        let inter = 500;

        const init = () => {
          setTimeout(() => {
            document.documentElement.style.setProperty('--speed', parseInt(currentValue - stepValue, 10));
            setTimeout(() => {
              document.documentElement.style.setProperty('--speed', parseInt(currentValue - (2 * stepValue), 10));
              setTimeout(() => {
                document.documentElement.style.setProperty('--speed', parseInt(currentValue - (3 * stepValue), 10));
                setTimeout(() => {
                  document.documentElement.style.setProperty('--speed', parseInt(currentValue - (4 * stepValue), 10));
                  setTimeout(() => {
                    document.documentElement.style.setProperty('--speed', 6);

                    bar.classList.remove('down');
                    clearInterval(animationId);

                    setTimeout(() => {
                      startButton.setAttribute('disabled', false);
                      state.running = false;
                      console.log(bar.innerText);
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
