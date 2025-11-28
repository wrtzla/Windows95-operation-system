import React, { useState, useEffect } from 'react';

const GRID_SIZE = 9;
const MINES = 10;

interface Cell {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const Minesweeper: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [statusFace, setStatusFace] = useState('😎');

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setGameOver(false);
    setWin(false);
    setStatusFace('😎');
    
    // Create empty grid
    const newGrid: Cell[][] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      newGrid[x] = [];
      for (let y = 0; y < GRID_SIZE; y++) {
        newGrid[x][y] = { x, y, isMine: false, isRevealed: false, isFlagged: false, neighborMines: 0 };
      }
    }

    // Place mines
    let placedMines = 0;
    while (placedMines < MINES) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      if (!newGrid[x][y].isMine) {
        newGrid[x][y].isMine = true;
        placedMines++;
      }
    }

    // Calculate neighbors
    const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        if (!newGrid[x][y].isMine) {
          let count = 0;
          directions.forEach(([dx, dy]) => {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && newGrid[nx][ny].isMine) {
              count++;
            }
          });
          newGrid[x][y].neighborMines = count;
        }
      }
    }
    setGrid(newGrid);
  };

  const revealCell = (x: number, y: number) => {
    if (gameOver || grid[x][y].isRevealed || grid[x][y].isFlagged) return;

    const newGrid = [...grid];
    
    if (newGrid[x][y].isMine) {
      setGameOver(true);
      setStatusFace('😵');
      // Reveal all mines
      newGrid.forEach(row => row.forEach(cell => {
        if (cell.isMine) cell.isRevealed = true;
      }));
    } else {
      floodFill(newGrid, x, y);
      checkWin(newGrid);
    }
    setGrid(newGrid);
  };

  const floodFill = (currentGrid: Cell[][], x: number, y: number) => {
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE || currentGrid[x][y].isRevealed) return;
    
    currentGrid[x][y].isRevealed = true;

    if (currentGrid[x][y].neighborMines === 0) {
      const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
      directions.forEach(([dx, dy]) => floodFill(currentGrid, x + dx, y + dy));
    }
  };

  const toggleFlag = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    if (gameOver || grid[x][y].isRevealed) return;
    const newGrid = [...grid];
    newGrid[x][y].isFlagged = !newGrid[x][y].isFlagged;
    setGrid(newGrid);
  };

  const checkWin = (currentGrid: Cell[][]) => {
    let unrevealedSafeCells = 0;
    currentGrid.forEach(row => row.forEach(cell => {
      if (!cell.isMine && !cell.isRevealed) unrevealedSafeCells++;
    }));
    if (unrevealedSafeCells === 0) {
      setWin(true);
      setGameOver(true);
      setStatusFace('🤠');
    }
  };

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    return cell.neighborMines > 0 ? cell.neighborMines : '';
  };

  const getTextColor = (count: number) => {
    const colors = ['blue', 'green', 'red', 'navy', 'maroon', 'teal', 'black', 'gray'];
    return colors[count - 1] || 'black';
  };

  return (
    <div className="flex flex-col items-center p-2 bg-[#c0c0c0] h-full justify-center">
      <div className="win95-border-inset p-1 bg-[#c0c0c0] flex justify-between items-center w-full mb-2 bg-[#c0c0c0]">
        <div className="bg-black text-red-500 font-mono text-xl px-1 border-2 border-gray-400 border-inset">
           {String(MINES - grid.flat().filter(c => c.isFlagged).length).padStart(3, '0')}
        </div>
        <button 
          onClick={resetGame} 
          className="w-8 h-8 win95-border-outset active:win95-border-inset bg-[#c0c0c0] flex items-center justify-center text-lg"
        >
          {statusFace}
        </button>
        <div className="bg-black text-red-500 font-mono text-xl px-1 border-2 border-gray-400 border-inset">000</div>
      </div>
      
      <div className="grid grid-cols-9 gap-0 win95-border-inset border-4 border-[#c0c0c0]">
        {grid.map((row, x) => (
          row.map((cell, y) => (
            <div
              key={`${x}-${y}`}
              onClick={() => revealCell(x, y)}
              onContextMenu={(e) => toggleFlag(e, x, y)}
              className={`w-6 h-6 flex items-center justify-center text-sm font-bold cursor-default select-none
                ${!cell.isRevealed ? 'bg-[#c0c0c0] win95-border-outset' : 'bg-[#c0c0c0] border border-gray-400'}
              `}
              style={{ color: cell.isRevealed && cell.neighborMines > 0 ? getTextColor(cell.neighborMines) : 'black' }}
            >
              {getCellContent(cell)}
            </div>
          ))
        ))}
      </div>
      {win && <div className="mt-2 text-xs">You Win!</div>}
      {gameOver && !win && <div className="mt-2 text-xs">Game Over</div>}
    </div>
  );
};

export default Minesweeper;