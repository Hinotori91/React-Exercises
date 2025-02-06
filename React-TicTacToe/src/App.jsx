import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (<button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) { return; }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  status = winner ? 'Winner: ' + winner : 'Next Player: ' + (xIsNext ? 'X' : 'O');
  return (
    <>
      <div className="status">{status}</div>
      <div className="flex flex-wrap w-40">
        {squares.map(function (square, i) {
          return <Square value={square} onSquareClick={() => handleClick(i)} />;
        })}
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    description = (move > 0) ? "Go to move #" + move : "Go to game start";

    if (move == currentMove) {
      description = "You are at move #" + move;
    }

    return (
      <li key={move}><button onClick={() => jumpTo(move)}>{description}</button></li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


/*TODO
x Rewrite Board to use two loops to make the squares instead of hardcoding them.
X For the current move only, show “You are at move #…” instead of a button.
- Add a toggle button that lets you sort the moves in either ascending or descending order.
- When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
- Display the location for each move in the format (row, col) in the move history list.
*/