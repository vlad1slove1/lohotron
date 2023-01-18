/* eslint-disable no-restricted-syntax */
import collection from '../__fixtures__/collection.js';
import { shuffle } from './utils.js';

const shuffledCollection = shuffle(collection);

const elements = {
  spinner: document.querySelector('.spinner'),
  doors: document.querySelectorAll('.door'),
  startButton: document.querySelector('.start-button'),
  resetButton: document.querySelector('.reset-button'),
};

const init = (firstInit = true, groups = 1, duration = 1) => {
  for (const door of elements.doors) {
    if (firstInit) {
      door.dataset.spinned = '0';
    } else if (door.dataset.spinned === '1') {
      return;
    }

    const boxes = door.querySelector('.boxes');
    const boxesClone = boxes.cloneNode(false);
    const pool = [{ name: '❓' }];

    const items = shuffledCollection.map((item) => {
      const obj = {};
      obj.name = item.displayName;
      obj.color = item.color;

      return obj;
    });

    if (!firstInit) {
      const arr = [];
      for (let i = 0; i < (groups > 0 ? groups : 1); i += 1) {
        arr.push(...items);
      }
      pool.push(...shuffle(arr));

      boxesClone.addEventListener('transitionstart', () => {
        door.dataset.spinned = '1';
      }, { once: true });

      boxesClone.addEventListener('transitionend', () => {
        const boxList = document.querySelectorAll('.box');
        const boxListArr = Array.from(boxList);

        const filterBoxes = (_box, index) => index > 0;
        boxListArr.filter(filterBoxes);
      }, { once: true });

      for (let i = pool.length - 1; i >= 0; i -= 1) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.setAttribute('style', `background-color: ${pool[i].color}`);
        box.style.width = `${door.clientWidth}px`;
        box.style.height = `${door.clientHeight}px`;
        box.textContent = pool[i].name;
        boxesClone.appendChild(box);
      }

      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${door.clientHeight * (pool.length - 1)}px)`;
      door.replaceChild(boxesClone, boxes);
    }
  }
};

const spin = async () => {
  init(false, 1, 2);

  for (const door of elements.doors) {
    const boxes = door.querySelector('.boxes');
    const duration = parseInt(boxes.style.transitionDuration, 10);
    boxes.style.transform = 'translateY(0)';

    await new Promise((resolve) => setTimeout(resolve, duration * 100));
  }
};

export default () => {
  init(false, 1, 2);

  elements.startButton.addEventListener('click', spin);
  elements.resetButton.addEventListener('click', init);
};
