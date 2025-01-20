import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Coins, RotateCw } from 'lucide-react';
import Confetti from 'react-confetti';

const SYMBOLS = ['🍒', '🍋', '🍊', '7️⃣', '💎', '🎰'];
const PAYOUTS = {
  '🍒': 2,
  '🍋': 3,
  '🍊': 4,
  '7️⃣': 5,
  '💎': 10,
  '🎰': 20,
};

const INITIAL_BET = 10;
const ROWS = 3;
const COLS = 3;

export const Slots = () => {
  const { balance, updateBalance } = useStore();
  const [reels, setReels] = useState<string[][]>(Array(ROWS).fill(Array(COLS).fill('🎰')));
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState(INITIAL_BET);
  const [win, setWin] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const spin = () => {
    if (balance < bet) return;
    
    setSpinning(true);
    updateBalance(-bet);
    setWin(0);
    
    // Animate spinning
    const spinDuration = 2000;
    const intervals = 100;
    let spins = 0;
    
    const spinInterval = setInterval(() => {
      setReels(Array(ROWS).fill(0).map(() => 
        Array(COLS).fill(0).map(() => 
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        )
      ));
      
      spins += intervals;
      if (spins >= spinDuration) {
        clearInterval(spinInterval);
        finalizeSpinResult();
      }
    }, intervals);
  };

  const finalizeSpinResult = () => {
    const finalReels = Array(ROWS).fill(0).map(() => 
      Array(COLS).fill(0).map(() => 
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      )
    );
    
    setReels(finalReels);
    setSpinning(false);
    
    // Calculate winnings
    let totalWin = 0;
    
    // Check rows
    finalReels.forEach(row => {
      if (row.every(symbol => symbol === row[0])) {
        totalWin += bet * (PAYOUTS[row[0] as keyof typeof PAYOUTS] || 0);
      }
    });
    
    // Check diagonals
    const diagonal1 = [finalReels[0][0], finalReels[1][1], finalReels[2][2]];
    const diagonal2 = [finalReels[0][2], finalReels[1][1], finalReels[2][0]];
    
    if (diagonal1.every(symbol => symbol === diagonal1[0])) {
      totalWin += bet * (PAYOUTS[diagonal1[0] as keyof typeof PAYOUTS] || 0);
    }
    if (diagonal2.every(symbol => symbol === diagonal2[0])) {
      totalWin += bet * (PAYOUTS[diagonal2[0] as keyof typeof PAYOUTS] || 0);
    }
    
    if (totalWin > 0) {
      setWin(totalWin);
      updateBalance(totalWin);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-900 to-purple-900 p-8">
      {showConfetti && <Confetti />}
      
      <div className="mb-8 flex items-center justify-between gap-4 rounded-lg bg-white/10 p-4 text-white backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Coins className="h-6 w-6 text-yellow-400" />
          <span className="text-xl font-bold">${balance}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setBet(Math.max(INITIAL_BET, bet - INITIAL_BET))}
              disabled={spinning}
            >
              -
            </Button>
            <span className="min-w-[60px] text-center font-bold">
              Bet: ${bet}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setBet(bet + INITIAL_BET)}
              disabled={spinning}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8 overflow-hidden rounded-lg bg-black/30 p-8 backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-2">
          {reels.map((row, i) =>
            row.map((symbol, j) => (
              <div
                key={`${i}-${j}`}
                className="flex h-24 w-24 items-center justify-center rounded-lg bg-white/10 text-4xl backdrop-blur-sm"
              >
                {symbol}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button
          size="lg"
          onClick={spin}
          disabled={spinning || balance < bet}
          className="min-w-[200px] gap-2"
        >
          <RotateCw className={`h-5 w-5 ${spinning ? 'animate-spin' : ''}`} />
          Spin
        </Button>
        
        {win > 0 && (
          <div className="animate-bounce rounded-full bg-yellow-400 px-6 py-2 text-lg font-bold text-black">
            You won ${win}!
          </div>
        )}
      </div>

      <div className="mt-8 rounded-lg bg-white/10 p-4 text-white backdrop-blur-sm">
        <h3 className="mb-2 text-lg font-bold">Payouts</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {Object.entries(PAYOUTS).map(([symbol, multiplier]) => (
            <div key={symbol} className="flex items-center gap-2">
              <span className="text-2xl">{symbol}</span>
              <span>×{multiplier}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};