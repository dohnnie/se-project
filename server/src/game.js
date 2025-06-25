let gAttr = {
  players: [],
  prompts: [],
  status: 0,
  start: false,
}

// Boilerplate to allow for modifications of data structures

const initGame = (playerList, time) => {
  if (playerList.length > 0 && playerList !== null) {
    const prompter = playerList[0];
    gAttr.status = 2;
    return ({
      prompter: prompter.id,
      listIndex: 0,
      startTime: time,
      round: 1,
      cycle: 1,
      status: 2,
    });
  } else {
    return ({
      error: "Error not enough players in the lobby",
    });
  }
}



const changePhases = (status) => {
  switch (status) {
    // Transitioning from waiting area to prompting phase
    case 0: return 2;
    // Transitioning from prompting phase to guessing phase
    case 2: return 3;
    // Transitioning from guessing phase to voting phase
    case 3: return 4;
    // Transitioning from voting phase to round winner
    case 4:
      return 5;
    // Transitioning from round winner to either end game or back to voting phase
    case 5:
      console.log("In case 5 switch statement");
      return 0;
  }
}

export { gAttr, initGame, changePhases }
