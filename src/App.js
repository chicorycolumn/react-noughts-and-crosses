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
    playerNamesInput: { p1: "", p2: "" },
    playerScores: { p1: 0, p2: 0.5 }
  };

  handlePlayerSubmit = (player, event) => {
    event.preventDefault();
    this.setState(currentState => {
      if (currentState.playerNamesInput[player] !== "") {
        const newObj = { ...currentState.playerNamesDisplay };
        newObj[player] = currentState.playerNamesInput[player];
        return {
          playerNamesDisplay: newObj,
          playerNamesInput: { p1: "", p2: "" }
        };
      }
    });
  };

  handlePlayerNameChange = (player, event) => {
    const { value } = event.target;

    this.setState(currentState => {
      const newObj = { ...currentState.playerNamesInput };
      newObj[player] = value; // Interestingly, you cannot use event.target.value here.

      return { playerNamesInput: newObj };
    });
  };

  selectRandomName = (player, event) => {
    event.preventDefault();
    console.dir(Board);
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
                        while (
                          this.state.playerNamesDisplay[player] ===
                          this.state.playerNamesDisplay[
                            player === "p1" ? "p2" : "p1"
                          ]
                        ) {
                          console.log("whoops");
                          nameFlipper(player);
                        }
                        console.log();
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
          {this.props.hasTournamentBegun ? (
            <Finger
              player={player}
              isItPlayerOneTurn={this.props.isItPlayerOneTurn}
              handleTransitionToggle={this.props.handleTransitionToggle}
              transitionToggle={this.props.transitionToggle}
            />
          ) : (
            <></>
          )}

          <h2 className="playerNameText">
            {this.state.playerNamesDisplay[player]}
          </h2>

          {this.props.hasTournamentBegun ? (
            <Wins playerScores={this.state.playerScores} player={player} />
          ) : (
            <form
              className="nameForm"
              onSubmit={this.handlePlayerSubmit.bind(this, player)}
            >
              <input
                value={this.state.playerNamesInput[player]}
                className="inputName"
                onChange={this.handlePlayerNameChange.bind(this, player)}
                id={`${player}name`}
                name={`${player}name`}
                type="text"
                placeholder="Prosze napisz twoje imie"
              />
              <br />
              <button className="sideButtons" id={`submit${player}NameButton`}>
                Submit
              </button>
              <button
                className="sideButtons"
                id={`random${player}NameButton`}
                onClick={this.selectRandomName.bind(this, player)}
              >
                Random!
              </button>
            </form>
          )}
        </div>
      );
    });
  }
}

class Finger extends React.Component {
  state = {};

  render() {
    return (
      <div className="fingerWrapper">
        {this.props.transitionToggle ? (
          <h5
            className={
              this.props.player === "p1"
                ? "normalAnimation"
                : "reverseAnimation"
            }
          >
            <i className="theFinger">
              {this.props.isItPlayerOneTurn && this.props.player === "p1"
                ? "☝🏾"
                : ""}
              {!this.props.isItPlayerOneTurn && this.props.player === "p2"
                ? "☝🏾"
                : ""}
              {this.props.handleTransitionToggle(false, 1000)}
              {/* {setTimeout(() => {
                this.props.handleTransitionToggle(true);
              }, 500)} */}
            </i>
          </h5>
        ) : (
          <div className="theFinger">
            {this.props.isItPlayerOneTurn && this.props.player === "p1"
              ? "☝🏾"
              : ""}
            {!this.props.isItPlayerOneTurn && this.props.player === "p2"
              ? "☝🏾"
              : ""}
          </div>
        )}
      </div>
    );
  }
}

function ExtraButtons(props) {
  return (
    <div
      className="middleBottom"
      className={props.hasTournamentBegun ? "invisible" : ""}
    >
      <button
        id="startTourneyButton"
        className="startTourneyButton"
        onClick={() => {
          props.tournBegunHandler();
        }}
      >
        Start Tournament!
      </button>
    </div>
  );
}

class Board extends React.Component {
  state = {
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ],
    background: ""
  };

  makeBorderFlash = (row, column) => {
    const currentSquare = document.getElementById(`${row}, ${column}`);

    setTimeout(() => {
      currentSquare.setAttribute("style", "background-color: yellow;");
      setTimeout(() => {
        currentSquare.removeAttribute("style", "background-color: yellow;");
        setTimeout(() => {
          currentSquare.setAttribute("style", "background-color: yellow;");
          setTimeout(() => {
            currentSquare.removeAttribute("style", "background-color: yellow;");
            setTimeout(() => {
              currentSquare.setAttribute("style", "background-color: yellow;");
              setTimeout(() => {
                currentSquare.removeAttribute(
                  "style",
                  "background-color: yellow;"
                );
              }, 50);
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    }, 50);
  };

  makeButtonsFlash = () => {
    const c = document.getElementById("startTourneyButton");
    const b = document.getElementById("randomp1NameButton");
    const a = document.getElementById("submitp1NameButton");
    const e = document.getElementById("randomp2NameButton");
    const d = document.getElementById("submitp2NameButton");

    setTimeout(() => {
      a.setAttribute("style", "background-color: yellow;");
      setTimeout(() => {
        a.removeAttribute("style", "background-color: yellow;");
        b.setAttribute("style", "background-color: yellow;");
        setTimeout(() => {
          b.removeAttribute("style", "background-color: yellow;");
          c.setAttribute("style", "background-color: yellow;");
          setTimeout(() => {
            c.removeAttribute("style", "background-color: yellow;");
            d.setAttribute("style", "background-color: yellow;");
            setTimeout(() => {
              d.removeAttribute("style", "background-color: yellow;");
              e.setAttribute("style", "background-color: yellow;");
              setTimeout(() => {
                e.removeAttribute("style", "background-color: yellow;");
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  };

  handleClick = (event, row, column) => {
    if (!this.props.hasTournamentBegun) {
      this.makeButtonsFlash();
    } else {
      if (this.state.board[row][column] === "") {
        this.setState(currentState => {
          const newBoard = [];
          currentState.board.forEach(arr => newBoard.push([...arr]));
          console.log(newBoard);
          newBoard[row][column] = this.props.isItPlayerOneTurn ? "X" : "O";
          this.props.turnHandler();
          this.props.handleTransitionToggle(true);
          return {
            board: newBoard
          };
        });
        console.log(this.checkForWinningTriplet());
      } else {
        this.makeBorderFlash(row, column);
      }
    }
  };

  checkForWinningTriplet = () => {
    const { board } = this.state;

    console.log(board[0][0], board[1][1], board[2][2]);

    if (board[1][1]) {
      if (
        (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
        (board[0][2] === board[1][1] && board[1][1] === board[2][0])
      ) {
        return `Wow! ${board[1][1]} wins with a sick diagonal! It was either ${board[0][0]}${board[1][1]}${board[2][2]} from right to left, or it was ${board[2][0]}${board[1][1]}${board[2][0]} from left to right`;
      }
    } else {
      for (let iterant = 0; iterant < board.length; iterant++) {
        let col = iterant;

        if (board[col][0]) {
          if (
            board[col][0] === board[col][1] &&
            board[col][1] === board[col][2]
          ) {
            return `Wow! ${board[col][0]} wins with a boss vertical! It was ${board[col][0]}${board[col][1]}${board[col][2]}`;
          } else {
            let row = iterant;
            if (board[0][row]) {
              if (
                board[0][row] === board[1][row] &&
                board[1][row] === board[2][row]
              ) {
                return `Wow! ${board[0][row]} wins with a dank horizontal! It was ${board[0][row]}${board[1][row]}${board[2][row]}`;
              }
            }
          }
        }
      }
    }

    return "Keep playing, comrades!";
  };

  render() {
    return (
      <div className="wrapper">
        {this.state.board.map((row, indexRow) =>
          row.map((column, indexColumn) => {
            return (
              <div
                id={`${indexRow}, ${indexColumn}`}
                onClick={() => {
                  this.handleClick(this, indexRow, indexColumn);
                }}
                className={`squares`}
              >
                <div className="squareSymbolWrapper">
                  {this.state.board[indexRow][indexColumn]}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    isItPlayerOneTurn: true,
    hasTournamentBegun: false,
    transitionToggle: false
  };

  turnHandler = () => {
    this.setState({
      isItPlayerOneTurn: !this.state.isItPlayerOneTurn
    });
  };

  handleTransitionToggle = (boolean, timeout) => {
    console.log(boolean, timeout);
    console.log("in handletransitiontoggle");
    if (timeout === undefined) {
      this.setState({
        transitionToggle: boolean
      });
    } else {
      console.log("ready to timeout");
      setTimeout(() => {
        this.setState({
          transitionToggle: boolean
        });
      }, timeout);
    }
  };

  tournBegunHandler = () => {
    this.setState({
      hasTournamentBegun: !this.state.hasTournamentBegun
    });
  };

  render() {
    console.log("re-rendering");
    return (
      <div className="App">
        <header className="Ticcy Taccy Toe"></header>
        <h1>Noughts and Crosses</h1>
        <div className="over-grid">
          <Board
            isItPlayerOneTurn={this.state.isItPlayerOneTurn}
            turnHandler={this.turnHandler}
            handleTransitionToggle={this.handleTransitionToggle}
            hasTournamentBegun={this.state.hasTournamentBegun}
          />
          <PlayerNames
            isItPlayerOneTurn={this.state.isItPlayerOneTurn}
            hasTournamentBegun={this.state.hasTournamentBegun}
            transitionToggle={this.state.transitionToggle}
            handleTransitionToggle={this.handleTransitionToggle}
          />
          <ExtraButtons
            tournBegunHandler={this.tournBegunHandler}
            hasTournamentBegun={this.state.hasTournamentBegun}
          />
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

function Wins(props) {
  return <p className="wins">🏆 {props.playerScores[props.player]}</p>;
}

export default App;
