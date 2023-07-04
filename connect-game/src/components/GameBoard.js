import React  from "react";
import GameCircle from "./GameCircle";
import '../Game.css'
import Header from "./Header";
import Footer from "./Footer";
import { isDraw, isWinner, getSuggestMove } from "../helper";
import  {NO_PLAYER, PLAYER_1, PLAYER_2,CIRCLE_NUM, GAME_STATE_PLAYING,GAME_STATE_WIN, GAME_STATE_DRAW} from "../Constants";


const GameBoard = () => {
   const [gameBoard, setGameBoard] = React.useState(Array(16).fill(NO_PLAYER));
   const [currentPlayer, setCurrentPlayer] = React.useState(PLAYER_1);
   const [gameState, setGameState] = React.useState(GAME_STATE_PLAYING);
   const [winPlayer, setWinPlayer] = React.useState(NO_PLAYER);

   const initGame = () => {
      console.log("initGame");
      setGameBoard(Array(16).fill(NO_PLAYER));
      setCurrentPlayer(PLAYER_1);
      setGameState(GAME_STATE_PLAYING);
      setWinPlayer(NO_PLAYER);
   }

   React.useEffect(() => {initGame()}, []);

   const initBoard = () => {
      const circles = [];
      for (let i = 0; i < CIRCLE_NUM; i++) {
         const circle = renderCircle(i);
         circles.push(circle);
      }
      return circles;
   }

   const onSuggestClick = () => {
      const suggestMove = getSuggestMove(gameBoard);
      handleClick(suggestMove);
   }

   const handleClick = (id) => {
      //console.log("Clicked" + id);
      // const newGameState = [...gameState]; // copy of the array of game state
      // newGameState[id] = currentPlayer; 
      // setGameState(newGameState);

      if(gameBoard[id] !== NO_PLAYER) return; // if the circle is already clicked, return
      if(gameState !== GAME_STATE_PLAYING) return; // if the game is not playing, return

      if(isWinner(gameBoard,id,currentPlayer)) {
         setGameState(GAME_STATE_WIN);
         setWinPlayer(currentPlayer);
      }

      if(isDraw(gameBoard,id,currentPlayer)) {
         setGameState(GAME_STATE_DRAW);
         setWinPlayer(NO_PLAYER);
      }

      setGameBoard((gameBoard) => {return gameBoard.map((value, index) => {
         if (index === id) {return currentPlayer;}
         return value;}
      )}); // state is updated asynchronously, so we need to pass a function to setGameBoard

      setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1); // primitive value, so no need to copy
   }

   const renderCircle = (id) => {
      return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={handleClick}>
               
            </GameCircle>
   }

    return(
      <>
         <Header currentPlayer={currentPlayer} winPlayer={winPlayer} gameState={gameState}/>
         <div className="gameBoard">
            {initBoard()}
         </div>
         <Footer onNewGameClick={initGame} onSuggestClick={onSuggestClick} gameState={gameState}/>
      </>
    );
 }

 export default GameBoard;