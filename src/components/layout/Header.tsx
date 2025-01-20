import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins, Trophy, User as UserIcon } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { AuthModal } from '../auth/AuthModal';
import { signOut } from '../../lib/supabase';

export const Header = () => {
  const { user } = useStore();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Social Casino
          </Link>

          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 transition-colors hover:text-blue-600"
            >
              Games
            </Link>
            <Link
              to="/tournaments"
              className="text-gray-600 transition-colors hover:text-blue-600"
            >
              Tournaments
            </Link>
            <Link
              to="/leaderboard"
              className="text-gray-600 transition-colors hover:text-blue-600"
            >
              Leaderboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2 rounded-full bg-blue-50 px-4 py-2">
                <Coins className="h-5 w-5 text-blue-600" />
                <span className="font-medium">${user.balance}</span>
              </div>
            )}

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 rounded-full bg-gray-100 px-4 py-2">
                  <UserIcon className="h-5 w-5" />
                  <span>{user.username}</span>
                  {user.vip_level > 1 && (
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none invisible group-hover:visible">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button onClick={() => setShowAuthModal(true)}>Sign In</Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};