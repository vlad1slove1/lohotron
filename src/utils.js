export const addWinnerToState = (bar, state) => {
  const barInnerText = bar.innerText;
  const { participants, winners } = state.collection;

  participants.map((participant) => {
    if (participant.displayName === barInnerText) {
      winners.push(participant);
    }

    return state.collection.winners;
  });
};

export const removeWinnerFromCollection = (state) => {
  const { participants, winners } = state.collection;

  const winnersNames = [];
  winners.forEach((winner) => {
    winnersNames.push(winner.displayName);
  });

  const filteredCollection = participants.filter((participant) => {
    const participantName = participant.displayName;

    return !winnersNames.includes(participantName);
  });

  // mutating participants collection
  // eslint-disable-next-line no-param-reassign
  state.collection.participants = filteredCollection;
};

export const hideTelNumber = (phone) => Array.from(phone).reduceRight((ctx, char) => {
  const isDigit = char >= '0' && char <= '9';
  const offset = ctx.offset + (isDigit ? 1 : 0);
  // eslint-disable-next-line no-nested-ternary
  const filteredChar = isDigit ? (offset >= 4 && offset < 8) ? '*' : char : char;
  const filtered = filteredChar + ctx.filtered;
  return { offset, filtered };
}, { offset: -1, filtered: '' }).filtered;
