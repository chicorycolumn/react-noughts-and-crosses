import React from "react";
import "./App.css";

//Where should this non-changing data go?
const randomNames = [
  "Daphne",
  "Scooby",
  "Fred",
  "Velma",
  "Shaggy",
  "Scrappy",
  "Caveman",
  "Ghost Clown",
  "The Suspicious Butler",
  "Oil Tycoon",
  "Green Ghoul",
  "A tempting plate of Scooby Snacks",
  "An excessively tall sandwich",
  "Velma's lost glasses"
];

class PlayerNames extends React.Component {
  state = {
    playerNamesDisplay: { p1: "Player One", p2: "Player Two" },
    playerNamesInternal: { p1: "", p2: "" }
  };

  handlePlayerSubmit = (player, event) => {
    event.preventDefault();
    this.setState(currentState => {
      if (currentState.playerNamesInternal[player] !== "") {
        const newObj = { ...currentState.playerNamesDisplay };
        newObj[player] = currentState.playerNamesInternal[player];
        return { playerNamesDisplay: newObj };
      }
    });
  };

  handlePlayerNameChange = (player, event) => {
    const { value } = event.target;

    this.setState(currentState => {
      const newObj = { ...currentState.playerNamesInternal };
      newObj[player] = value; // Interestingly, you cannot use event.target.value here.

      return { playerNamesInternal: newObj };
    });
  };

  selectRandomName = (player, event) => {
    event.preventDefault();

    const nameFlipper = player => {
      this.setState(currentState => {
        const newObj = { ...currentState.playerNamesDisplay };
        newObj[player] =
          randomNames[Math.floor(Math.random() * randomNames.length)];
        return { playerNamesDisplay: newObj };
      });
    };

    setTimeout(() => {
      nameFlipper(player);
      setTimeout(() => {
        nameFlipper(player);
        setTimeout(() => {
          nameFlipper(player);
          setTimeout(() => {
            nameFlipper(player);
            setTimeout(() => {
              nameFlipper(player);
              setTimeout(() => {
                nameFlipper(player);
                setTimeout(() => {
                  nameFlipper(player);
                  setTimeout(() => {
                    nameFlipper(player);
                    setTimeout(() => {
                      nameFlipper(player);
                      setTimeout(() => {
                        nameFlipper(player);
                      }, 100);
                    }, 100);
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  };

  render() {
    return Object.keys(this.state.playerNamesDisplay).map(player => {
      return (
        <div id={`${player}`} className={`${player}Details`}>
          <h2 className="playerNameText">
            {this.state.playerNamesDisplay[player]}{" "}
            {this.props.whoseTurn === player ? "☝" : ""}
          </h2>
          <form onSubmit={this.handlePlayerSubmit.bind(this, player)}>
            <input
              onChange={this.handlePlayerNameChange.bind(this, player)} //This is how you pass arguments to an event handler.
              id={`${player}name`}
              name={`${player}name`}
              type="text"
              placeholder="Prosze napisz twoje imie"
            />
            <br />
            <br />
            <button>Submit name</button>
            <button onClick={this.selectRandomName.bind(this, player)}>
              Random!
            </button>
          </form>
        </div>
      );
    });
  }
}

class Board extends React.Component {
  state = {
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
  };
  render() {
    return (
      // <div className="over-grid">
      <div className="wrapper">
        {this.state.board.map((row, indexRow) =>
          row.map((square, indexSquare) => {
            return (
              <div
                id={`box ${indexRow}-${indexSquare}`}
                className="squares"
              ></div>
            );
            //return <div id="box a" class="squares"></div>;
          })
        )}
      </div>
      // </div>
    );
  }
}

class App extends React.Component {
  state = {
    whoseTurn: "p1"
  };

  render() {
    return (
      <div className="App">
        <header className="Ticcy Taccy Toe"></header>
        <h1>Noughts and Crosses</h1>
        <div className="over-grid">
          <Board />
          <PlayerNames whoseTurn={this.state.whoseTurn} />
        </div>
        {/* </div> */}
        {/* <div className="container">
          <div className="cell cell-1">1.</div>
          <div className="cell cell-2">

          </div>
          <div className="cell cell-3">3.</div>
          <div className="cell cell-4">4.</div>
          <div className="cell cell-5">5.</div>
          <div className="cell cell-6">6.</div>
          <div className="cell cell-7">7.</div>
          <div className="cell cell-8">8.</div>
          <div className="cell cell-9">9.</div>
        </div> */}

        {/* <div className="bodySurrogate">
         
          <div className="overWrapper">
            
          </div>
          <button className="centralElements">Start Game</button>
        </div> */}
      </div>
    );
  }
}

export default App;
