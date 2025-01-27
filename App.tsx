import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthProvider';
import { ErrorBoundary } from './components/monitoring/ErrorBoundary';
import { Header } from './components/layout/Header';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignUpPage } from './components/auth/SignUpPage';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { GameHistory } from './components/history/GameHistory';
import { CurrencyStore } from './components/store/CurrencyStore';
import { GamesPage } from './components/games/GamesPage';
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
                <Route path="/" element={<LandingPage />} />
                <Route path="/ <boltAction type="file" filePath="src/App.tsx">                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/history" element={<GameHistory />} />
                <Route path="/store" element={<CurrencyStore />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/lobby" element={<GameLobby />} />
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