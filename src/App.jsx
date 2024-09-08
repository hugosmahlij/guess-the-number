import { useState } from 'react';

function App () {
  // Estado para almacenar el numero a adivinar
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 20) + 1);
  // Input del usuario
  const [guess, setGuess] = useState('');
  // Mensajes para pistas
  const [message, setMessage] = useState('');
  // Intentos disponibles
  const [lives, setLives] = useState(20);
  // Puntaje actual
  const [score, setScore] = useState(0);
  // Puntaje más alto
  const [highscore, setHighscore] = useState(0);

  // Funcion del input

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  }

  // Funcion para validar input y logica del juego
  const checkGuess = () => {
    const userGuess = Number(guess);

    if (userGuess < 1 || userGuess > 20) {
      setMessage('Por favor ingresa un número entre 1 y 20');
      return
    }

    if (userGuess === randomNumber) {
      setMessage('Correcto! Has adivinado el número.');
      setScore(score + 1);

      if (score + 1 > highscore) {
        setHighscore(score + 1);
      }

      setRandomNumber(Math.floor(Math.random() * 20) + 1);
      setLives(20);
    } else {
      setLives(lives - 1);
      if (lives - 1 === 0) {
        setMessage(`Perdiste :( El número era ${randomNumber}. Intenta nuevamente.`);
        setRandomNumber(Math.floor(Math.random() * 20) + 1);
        setLives(20);
        score(0);
      } else {
        const clue = userGuess > randomNumber ? 'muy alto' : 'muy bajo';
        setMessage(`Incorrecto, tu numero es ${clue}. Te quedan ${lives - 1} intentos.`);
      }
    }
    setGuess('');
  };

  // Para resetear el juego
  const resetGame = () => {
    setRandomNumber(Math.floor(Math.random() * 20) + 1);
    setLives(20);
    setScore(0);
    setMessage('');
    setGuess('');
  };

  return (
    <div className='game'>
      <h1>Adivina el número</h1>
      <p>Puntaje: {score}</p>
      <p>Highscore: {highscore}</p>
      <p>Intentos restantes: {lives}</p>
      <input
        type="number"
        value={guess}
        onChange={handleGuessChange}
        placeholder="Ingresa un número entre 1 y 20"
      />
      <button onClick={checkGuess}>Adivinar</button>
      <button onClick={resetGame}>Reiniciar</button>
      <p>{message}</p>
    </div>
  );
};

export default App
