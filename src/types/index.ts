export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  balance: number;
  vip_level: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'bet' | 'win' | 'loss' | 'bonus';
  game: string;
  created_at: string;
}

export interface GameStats {
  id: string;
  user_id: string;
  game: string;
  games_played: number;
  total_wagered: number;
  total_won: number;
  biggest_win: number;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
  created_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  achieved_at: string;
  achievement?: Achievement;
}

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted';
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

export interface ChatMessage {
  id: string;
  sender_id: string;
  receiver_id?: string;
  message: string;
  created_at: string;
  is_global: boolean;
  sender?: Profile;
}

export interface Tournament {
  id: string;
  title: string;
  description?: string;
  game: string;
  entry_fee: number;
  prize_pool: number;
  max_players?: number;
  start_time: string;
  end_time: string;
  status: 'upcoming' | 'active' | 'completed';
  created_at: string;
}

export interface TournamentParticipant {
  id: string;
  tournament_id: string;
  user_id: string;
  score: number;
  rank?: number;
  joined_at: string;
  profile?: Profile;
}