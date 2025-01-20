import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Coins, RotateCw } from 'lucide-react';
import Confetti from 'react-confetti';

type BetType = 'straight' | 'red' | 'black' | 'even' | 'odd' | 'low' | 'high';

interface Bet {
  type: BetType;
  amount: number;
  numbers: number[];
}

const INITIAL_BET = 10;

const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

export const Roulette = () => {
  const { balance, updateBalance } = useStore();
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [bets, setBets] = useState<Bet[]>([]);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const addBet = (type: BetType, numbers: number[]) => {
    if (balance < INITIAL_BET) return;
    
    updateBalance(-INITIAL_BET);
    setBets([...bets, { type, amount: INITIAL_BET, numbers }]);
  };

  const spin = () => {
    if (bets.length === 0) return;
    
    setSpinning(true);
    setMessage('');
    
    // Animate spinning
    const spinDuration = 3000;
    const intervals = 50;
    let spins = 0;
    
    const spinInterval = setInterval(() => {
      setCurrentNumber(Math.floor(Math.random() * 37));
      spins += intervals;
      
      if (spins >= spinDuration) {
        clearInterval(spinInterval);
        const finalNumber = Math.floor(Math.random() * 37);
        setCurrentNumber(finalNumber);
        calculateWinnings(finalNumber);
        setSpinning(false);
      }
    }, intervals);
  };

  const calculateWinnings = (number: number) => {
    let totalWin = 0;
    
    bets.forEach(bet => {
      let win = 0;
      
      switch (bet.type) {
        case 'straight':
          if (bet.numbers.includes(number)) {
            win = bet.amount * 35;
          }
          break;
        case 'red':
          if (RED_NUMBERS.includes(number)) {
            win = bet.amount * 2;
          }
          break;
        case 'black':
          if (BLACK_NUMBERS.includes(number)) {
            win = bet.amount * 2;
          }
          break;
        case 'even':
          if (number !== 0 && number % 2 === 0) {
            win = bet.amount * 2;
          }
          break;
        case 'odd':
          if (number !== 0 && number % 2 === 1) {
            win = bet.amount * 2;
          }
          break;
        case 'low':
          if (number >= 1 && number <= 18) {
            win = bet.amount * 2;
          }
          break;
        case 'high':
          if (number >= 19 && number <= 36) {
            win = bet.amount * 2;
          }
          break;
      }
      
      if (win > 0) {
        totalWin += win;
      }
    });
    
    if (totalWin > 0) {
      updateBalance(totalWin);
      setMessage(`You won $${totalWin}!`);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setMessage('No winning bets');
    }
    
    setBets([]);
  };

  const renderNumber = (number: number) => {
    const isRed = RED_NUMBERS.includes(number);
    const isBlack = BLACK_NUMBERS.includes(number);
    
    return (
      <button
        key={number}
        onClick={() => addBet('straight', [number])}
        disabled={spinning}
        className={`h-12 w-12 rounded-full font-bold transition-transform hover:scale-110
          ${isRed ? 'bg-red-600 text-white' : 
            isBlack ? 'bg-black text-white' : 
            'bg-green-600 text-white'}`}
      >
        {number}
      </button>
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-green-800 to-emerald-900 p-8">
      {showConfetti && <Confetti />}
      
      <div className="mb-8 flex items-center justify-between gap-4 rounded-lg bg-white/10 p-4 text-white backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Coins className="h-6 w-6 text-yellow-400" />
          <span className="text-xl font-bold">${balance}</span>
        </div>
        <div className="text-lg font-bold">
          Bet: ${INITIAL_BET}
        </div>
      </div>

      <div className="mb-8 w-full max-w-4xl">
        <div className="mb-8 flex justify-center">
          <div className="relative h-48 w-48">
            <div className={`absolute inset-0 flex items-center justify-center rounded-full 
              bg-green-700 text-4xl font-bold text-white shadow-xl
              ${spinning ? 'animate-spin' : ''}`}>
              {currentNumber !== null ? currentNumber : '0'}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
            <button
              onClick={() => addBet('straight', [0])}
              disabled={spinning}
              className="col-span-2 h-12 rounded bg-green-600 font-bold text-white transition-transform hover:scale-105"
            >
              0
            </button>
            {Array.from({ length: 36 }, (_, i) => renderNumber(i + 1))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Button
            variant="secondary"
            onClick={() => addBet('red', RED_NUMBERS)}
            disabled={spinning}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Red
          </Button>
          <Button
            variant="secondary"
            onClick={() => addBet('black', BLACK_NUMBERS)}
            disabled={spinning}
            className="bg-black text-white hover:bg-gray-800"
          >
            Black
          </Button>
          <Button
            variant="secondary"
            onClick={() => addBet('even', Array.from({ length: 18 }, (_, i) => (i + 1) * 2))}
            disabled={spinning}
          >
            Even
          </Button>
          <Button
            variant="secondary"
            onClick={() => addBet('odd', Array.from({ length: 18 }, (_, i) => i * 2 + 1))}
            disabled={spinning}
          >
            Odd
          </Button>
          <Button
            variant="secondary"
            onClick={() => addBet('low', Array.from({ length: 18 }, (_, i) => i + 1))}
            disabled={spinning}
          >
            1-18
          </Button>
          <Button
            variant="secondary"
            onClick={() => addBet('high', Array.from({ length: 18 }, (_, i) => i + 19))}
            disabled={spinning}
          >
            19-36
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          size="lg"
          onClick={spin}
          disabled={spinning || bets.length === 0}
          className="min-w-[200px] gap-2"
        >
          <RotateCw className={`h-5 w-5 ${spinning ? 'animate-spin' : ''}`} />
          Spin
        </Button>
        
        {bets.length > 0 && (
          <div className="rounded-full bg-white/10 px-6 py-2 text-lg font-bold text-white">
            Total Bet: ${bets.reduce((sum, bet) => sum + bet.amount, 0)}
          </div>
        )}
        
        {message && (
          <div className={`rounded-full px-6 py-2 text-lg font-bold
            ${message.includes('won') ? 'animate-bounce bg-yellow-400 text-black' : 'bg-white/10 text-white'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};