import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { ErrorBoundary } from './components/monitoring/ErrorBoundary';
import { Header } from './components/layout/Header';
import { GameLobby } from './components/games/GameLobby';
import { Slots } from './components/games/Slots';
import { Blackjack } from './components/games/Blackjack';
import { PokerRoom } from './components/games/poker/PokerRoom';
import { Roulette } from './components/games/Roulette';
import { ProfilePage } from './components/profile/ProfilePage';
import { TournamentList } from './components/tournaments/TournamentList';
import { TournamentDetail } from './components/tournaments/TournamentDetail';
import { Leaderboard } from './components/social/Leaderboard';
import { Chat } from './components/social/Chat';
import { AdminDashboard } from './components/admin/AdminDashboard';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<GameLobby />} />
                <Route path="/slots" element={<Slots />} />
                <Route path="/blackjack" element={<Blackjack />} />
                <Route path="/poker" element={<PokerRoom />} />
                <Route path="/roulette" element={<Roulette />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/tournaments" element={<TournamentList />} />
                <Route path="/tournaments/:id" element={<TournamentDetail />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Chat />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}