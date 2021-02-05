import { useState } from "react";
import random from "lodash/random";

function App() {
  const [secret] = useState(getRandAns());
  const [guesses, setGuesses] = useState([]);
  const [text, setText] = useState("");
  const [warning, setWarning] = useState("");

  let lives = lives_left(secret, guesses);
  let bulls = bullsAndCows(secret, guesses);

  function updateText(ev) {
    let vv = ev.target.value;
    setText(vv);
  }

  function getRandAns() {
    let numArr = [0,1,2,3,4,5,6,7,8,9];
    let one = 0; 
    let two = 0; 
    let three = 0; 
    let four = 0;
    let num = "";
    let ind = random(1,9); 
    one = numArr[ind];
    numArr.splice(ind, 1); 
    ind = random(0,8); 
    two = numArr[ind]; 
    numArr.splice(ind, 1); 
    ind = random(0,7); 
    three = numArr[ind];
    numArr.splice(ind, 1); 
    ind = random(0,6); 
    four = numArr[ind];
    num = one.toString() + two.toString() 
            + three.toString() + four.toString();
    return num;
  }

  function guess() {
    let array = [];
    if (text.length !== 4) { 
      setWarning("guess needs to be 4 characters"); 
    } else if (!cancelLetters(text)) { 
      setWarning("guess has to be numbers"); 
    }
    else if (text.charAt(0) === text.charAt(1) ||
              text.charAt(0) === text.charAt(2) || 
              text.charAt(0) === text.charAt(3) || 
              text.charAt(1) === text.charAt(2) || 
              text.charAt(1) === text.charAt(3) || 
              text.charAt(2) === text.charAt(3)) { 
      setWarning("guess must not have repeats");
    }
    else {
      array[0] = text;
      setWarning("");
      setGuesses(guesses.concat(array));
    }
    document.getElementById('guessInput').value = "";
  }

function cancelLetters(guess) { 
  let arr = guess.split("").slice(0,4);
  let noLett = true; //boolean true
  for (let i = 0; i < arr.length; i++) { 
    if(!(arr[i] <= '9' && arr[i] >= '0')) { 
      noLett = false;
    }
  }
  return noLett;
}


function keyPress(ev) {
    if (ev.key === "Enter") {
      guess();
    }
  }

  function bullsAndCows(secret, guesses) {
    let correctNum = secret.split("");
    let BCarray = [];
    for (let g = 0; g < guesses.length; g++) {
      let currGuess = guesses[g];
      let currArray = currGuess.split("");
      let bulls = 0;
      let cows = 0;
      let returnBC = "";
  
      for (let i = 0; i < 4; i++) {
        if (currArray[i] === correctNum[i]) {
          bulls = bulls + 1;
        } else {
          for (let j = 0; j < 4; j++) {
            if (currArray[i] === correctNum[j]) {
              cows = cows + 1;
            }
          }
        }
      }
      returnBC = bulls.toString() + "B" + cows.toString() + "C";
      BCarray[g] = returnBC;
    }
    return BCarray;
  }

  if (bulls[bulls.length - 1] === "4B0C") {
    return (
      <div className="App">
        <h1>Yay you win!</h1>
        <p>
          <button onClick={() => reloadGame()}>
            Play Again
          </button>
        </p>
      </div>
    );
}

  if (lives <= 0) {
    return (
      <div className="App">
        <h1>Game Over!</h1>
        <p>
          <button onClick={() => reloadGame()}>
            Try Again
          </button>
        </p>
        <h4>The answer was {secret}</h4>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Bulls and Cows Game!</h1>
      <div>
        <table>
            
          <tr>
                <th>guess</th>
                <th>result</th>
          </tr>
          <tr>
            <td>1</td>
            <td>{guesses[0]}</td>
            <td></td>
            <td>{bulls[0]}</td>
              
          </tr>
            
          <tr>
            <td>2</td>
            <td>{guesses[1]}</td>
            <td></td>
            <td>{bulls[1]}</td>
              
          </tr>
            
          <tr>
            <td>3</td>
            <td>{guesses[2]}</td>
            <td></td>
            <td>{bulls[2]}</td>
              
          </tr>
            
          <tr>
          <td>4</td>
            <td>{guesses[3]}</td>
            <td></td>
            <td>{bulls[3]}</td>
              
          </tr>
            
          <tr>
            <td>5</td>
            <td>{guesses[4]}</td>
            <td></td>
            <td>{bulls[4]}</td>
              
          </tr>
            
          <tr>
            <td>6</td>
            <td>{guesses[5]}</td>
            <td></td>
            <td>{bulls[5]}</td>
              
          </tr>
            
          <tr>
            <td>7</td>
            <td>{guesses[6]}</td>
            <td></td>
            <td>{bulls[6]}</td>
              
          </tr>
            
          <tr>
            <td>8</td>
            <td>{guesses[7]}</td>
            <td></td>
            <td>{bulls[7]}</td>
              
          </tr>
        </table>
      </div>
      <h1>Lives: {lives}</h1>
      <h1>{warning}</h1>
      <p>
        <input
          id="guessInput"
          type="text"
          pattern="\d{4}"
          maxlength="4"
          onChange={updateText}
          onKeyPress={keyPress}
        />
        <button onClick={guess}>Guess</button>
      </p>
      <p>
        <button onClick={() => reloadGame()}>
          Reset
        </button>
      </p>
    </div>
  );
}

function reloadGame() { 
  window.location.reload();
}


function lives_left(secret, guesses) {
  return 8 - guesses.length;
}

export default App;