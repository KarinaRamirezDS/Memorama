import "./App.css";
import { useEffect, useState } from "react";
import Board from "./components/Board/Board.js";
import convertToTimer from "./components/Cronometro/Cronometro.js";

//Importación de imagenes
import ImagenAnimal1 from "./assets/001.png";
import ImagenAnimal2 from "./assets/002.png";
import ImagenAnimal3 from "./assets/003.png";
import ImagenAnimal4 from "./assets/004.png";
import ImagenAnimal5 from "./assets/005.png";
import ImagenAnimal6 from "./assets/006.png";
import ImagenAnimal7 from "./assets/007.png";
import ImagenAnimal8 from "./assets/008.png";
import ImagenAnimal9 from "./assets/009.png";

function App() {
  //array de imagenes para el tablero
  const imagenesList = [
    <img src={ImagenAnimal1} alt="Arce" />,
    <img src={ImagenAnimal2} alt="Foca" />,
    <img src={ImagenAnimal3} alt="Hurón" />,
    <img src={ImagenAnimal4} alt="Lobo" />,
    <img src={ImagenAnimal5} alt="Pajaro" />,
    <img src={ImagenAnimal6} alt="Colibri" />,
    <img src={ImagenAnimal7} alt="Morsa" />,
    <img src={ImagenAnimal8} alt="Garza" />,
    <img src={ImagenAnimal9} alt="Ballena" />,
  ];

  //useStates

  const [mixImagenes, setMixImagenes] = useState([]); //Mezclar las cartas
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null); //Selecionar la tarjeta
  const [animating, setAnimating] = useState(false); //movimiento de las tarjertas al cliquear
  const [move, setMove] = useState(0); //Numero de movimientos

  //UseEffect

  useEffect(() => {
    const mixImagenList = mixArray([...imagenesList, ...imagenesList]);

    setMixImagenes(
      mixImagenList.map((imagen, i) => ({ index: i, imagen, flipped: false }))
    );
  }, []);

  //Mezclar el arrary de forma aletoria y regresarlo
  const mixArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    playTimer();
    return a;
  };
  // const reiniciar el juego

  const handleMemoClick = (memoBlock) => {
    setMove(move + 1);
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...mixImagenes];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setMixImagenes(shuffledMemoBlocksCopy);
    if (selectedMemoBlock === null) {
      setselectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.imagen === memoBlock.imagen) {
      setselectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(
          selectedMemoBlock.index,
          1,
          selectedMemoBlock
        );
        setMixImagenes(shuffledMemoBlocksCopy);
        setselectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  };

  // CONTADOR DE TIEMPO
  const [intervalId, setIntervalId] = useState(0);
  const [mainMiliseconds, setMainMiliseconds] = useState(0);

  const playTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }

    const newIntervalId = setInterval(() => {
      setMainMiliseconds((mainMiliseconds) => mainMiliseconds + 1000);
    }, 1000);

    setIntervalId(newIntervalId);
  };

  return (
    <>
      <div>
        <h1>Juego de Memoria</h1>
        <div>
          <h3>Movimientos: {move}</h3>
        </div>
        <p>Time: {convertToTimer(mainMiliseconds)}</p>
      </div>

      <Board
        memoBlocks={mixImagenes}
        animating={animating}
        handleMemoClick={handleMemoClick}
      />
    </>
  );
}

export default App;
