export default (bar, state) => {
  const barInnerText = bar.innerText;
  const { participants, winners } = state.collection;

  participants.map((participant) => {
    if (participant.displayName === barInnerText) {
      winners.push(participant);
    }

    return state.collection.winners;
  });
};
