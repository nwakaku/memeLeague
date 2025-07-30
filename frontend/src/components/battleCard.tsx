import React, { useState, useEffect } from "react";
import {
  Timer,
  Zap,
  Trophy,
  Coins,
  Crown,
  Flame,
  Eye,
  ThumbsUp,
  Activity,
  BarChart3,
  Clock,
  Target,
  Shield,
  Star,
  Gift,
  Heart,
} from "lucide-react";

const BattleCard = ({ battle, index, handleVote }) => {
  const [timeLeft, setTimeLeft] = useState(battle.timeLeft);
  const [voteCounts, setVoteCounts] = useState({
    pet1: battle.pet1.votes,
    pet2: battle.pet2.votes,
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate live vote updates
  useEffect(() => {
    const voteUpdateInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every 5 seconds
        const petToUpdate = Math.random() > 0.5 ? "pet1" : "pet2";
        setVoteCounts((prev) => ({
          ...prev,
          [petToUpdate]: prev[petToUpdate] + Math.floor(Math.random() * 3) + 1,
        }));
      }
    }, 5000);

    return () => clearInterval(voteUpdateInterval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${String(secs).padStart(2, "0")}`;
  };

  const getBattleIntensityColor = (intensity) => {
    switch (intensity) {
      case "extreme":
        return "from-red-600 to-orange-600";
      case "high":
        return "from-orange-500 to-red-500";
      case "medium":
        return "from-yellow-500 to-orange-500";
      default:
        return "from-green-500 to-yellow-500";
    }
  };

  const getBattleStatusIcon = (status, timeLeft) => {
    if (timeLeft <= 60) {
      return <Clock className="text-red-500 animate-ping" size={20} />;
    }
    switch (status) {
      case "active":
        return <Zap className="text-red-500 animate-pulse" size={20} />;
      case "starting_soon":
        return <Clock className="text-yellow-500 animate-bounce" size={20} />;
      case "finished":
        return <Trophy className="text-green-500" size={20} />;
      default:
        return <Timer className="text-gray-500" size={20} />;
    }
  };

  const getTrendingEmoji = () => {
    const emojis = ["🔥", "💫", "⚡", "🌟", "💥", "🚀"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const getVotePercentage = (petVotes, totalVotes) => {
    return totalVotes > 0 ? Math.round((petVotes / totalVotes) * 100) : 50;
  };

  const totalVotes = voteCounts.pet1 + voteCounts.pet2;

  return (
    <div
      className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl ${
        battle.intensity === "extreme"
          ? "border-red-500/50 shadow-red-200/50 dark:shadow-red-500/20"
          : battle.intensity === "high"
            ? "border-orange-400/50 shadow-orange-200/50 dark:shadow-orange-500/20"
            : "border-white/30"
      }`}
      style={{ transitionDelay: `${(index + 1) * 50}ms` }}
    >
      {/* Background Animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${getBattleIntensityColor(battle.intensity)} opacity-5 animate-pulse rounded-2xl`}
      />

      {/* Trending Badge */}
      {battle.intensity === "extreme" && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center space-x-1">
          <span>{getTrendingEmoji()}</span>
          <span>TRENDING</span>
        </div>
      )}

      {/* Battle Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 relative z-10 gap-4">
        <div className="flex items-center space-x-4">
          {getBattleStatusIcon(battle.status, timeLeft)}
          <div>
            <div className="flex items-center space-x-2 flex-wrap">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {battle.battleRound}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  battle.type === "tournament"
                    ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                    : battle.type === "ranked"
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                }`}
              >
                {battle.type.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center space-x-1">
                <Timer size={14} />
                <span
                  className={`font-mono font-bold ${timeLeft <= 60 ? "text-red-500 animate-pulse" : "text-red-500"}`}
                >
                  {formatTime(timeLeft)}
                </span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye size={14} />
                <span>{battle.spectators} watching</span>
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            <Coins className="text-yellow-500 animate-bounce" size={20} />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {battle.pot.toLocaleString()} $GUI
            </span>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            Prize Pool • {totalVotes} votes cast
          </div>
        </div>
      </div>

      {/* Vote Progress Bar */}
      <div className="mb-4 sm:mb-6 bg-gray-200 dark:bg-gray-700 rounded-full h-3 sm:h-4 relative overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 sm:h-4 rounded-full transition-all duration-1000 relative"
          style={{
            width: `${getVotePercentage(voteCounts.pet1, totalVotes)}%`,
          }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-lg">
          {voteCounts.pet1} vs {voteCounts.pet2}
        </div>
      </div>

      {/* Battle Arena */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-12 mb-6 lg:mb-8 relative">
        {/* Pet 1 */}
        <div className="text-center group/pet flex-1 max-w-xs w-full">
          <div className="relative mb-4">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-4xl sm:text-5xl md:text-7xl shadow-2xl border-4 border-white/50 hover:animate-bounce transition-all cursor-pointer group-hover/pet:scale-110 mx-auto`}
            >
              {battle.pet1.avatar}
            </div>

            {/* Level & Power */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center text-xs font-bold shadow-lg">
              {battle.pet1.level}
            </div>

            {/* Streak Indicator */}
            {battle.pet1.streak > 0 && (
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center shadow-lg">
                <Flame size={12} />
              </div>
            )}

            {/* Vote Count */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full px-2 sm:px-3 py-1 shadow-lg border">
              <div className="flex items-center space-x-1 text-xs font-bold">
                <ThumbsUp size={12} className="text-blue-500" />
                <span className="text-blue-600 dark:text-blue-400">
                  {voteCounts.pet1}
                </span>
              </div>
            </div>
          </div>

          <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
            {battle.pet1.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2">
            @{battle.pet1.owner}
          </p>

          {/* Pet Stats */}
          <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
            {battle.pet1.badges.map((badge, i) => (
              <span
                key={i}
                className="text-base sm:text-lg animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-4">
            <div>
              Power: <span className="font-bold text-blue-500">{battle.pet1.power}</span>
            </div>
            <div>
              Win Rate: <span className="font-bold text-green-500">{battle.pet1.winRate}%</span>
            </div>
          </div>

          {/* Supporter Reactions */}
          <div className="flex justify-center space-x-1 mb-2 sm:mb-4">
            {battle.pet1.supporters.map((reaction, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm animate-bounce"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {reaction}
              </span>
            ))}
          </div>

          <button
            onClick={() => handleVote(battle, battle.pet1)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2 mx-auto group relative overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Coins size={16} className="relative z-10" />
            <span className="relative z-10 text-xs sm:text-sm md:text-base">Vote</span>
          </button>
        </div>

        {/* VS Divider */}
        <div className="text-center flex-shrink-0 my-4 lg:my-0">
          <div className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent animate-pulse mb-1 sm:mb-2">
            ⚡VS⚡
          </div>
          <div className="w-1 h-8 sm:h-12 md:h-20 bg-gradient-to-b from-red-500 to-orange-500 mx-auto rounded-full shadow-lg animate-pulse" />
        </div>

        {/* Pet 2 */}
        <div className="text-center group/pet flex-1 max-w-xs w-full">
          <div className="relative mb-4">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-4xl sm:text-5xl md:text-7xl shadow-2xl border-4 border-white/50 hover:animate-bounce transition-all cursor-pointer group-hover/pet:scale-110 mx-auto`}
            >
              {battle.pet2.avatar}
            </div>

            {/* Level & Power */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center text-xs font-bold shadow-lg">
              {battle.pet2.level}
            </div>

            {/* Streak Indicator */}
            {battle.pet2.streak > 0 && (
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center shadow-lg">
                <Flame size={12} />
              </div>
            )}

            {/* Vote Count */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-full px-2 sm:px-3 py-1 shadow-lg border">
              <div className="flex items-center space-x-1 text-xs font-bold">
                <ThumbsUp size={12} className="text-purple-500" />
                <span className="text-purple-600 dark:text-purple-400">
                  {voteCounts.pet2}
                </span>
              </div>
            </div>
          </div>

          <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
            {battle.pet2.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-2">
            @{battle.pet2.owner}
          </p>

          {/* Pet Stats */}
          <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-3">
            {battle.pet2.badges.map((badge, i) => (
              <span
                key={i}
                className="text-base sm:text-lg animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-4">
            <div>
              Power: <span className="font-bold text-purple-500">{battle.pet2.power}</span>
            </div>
            <div>
              Win Rate: <span className="font-bold text-green-500">{battle.pet2.winRate}%</span>
            </div>
          </div>

          {/* Supporter Reactions */}
          <div className="flex justify-center space-x-1 mb-2 sm:mb-4">
            {battle.pet2.supporters.map((reaction, i) => (
              <span
                key={i}
                className="text-xs sm:text-sm animate-bounce"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {reaction}
              </span>
            ))}
          </div>

          <button
            onClick={() => handleVote(battle, battle.pet2)}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2 mx-auto group relative overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Coins size={16} className="relative z-10" />
            <span className="relative z-10 text-xs sm:text-sm md:text-base">Vote</span>
          </button>
        </div>
      </div>

      {/* Battle Actions */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
        <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 sm:py-3 px-3 sm:px-4 md:py-4 md:px-6 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center space-x-2 group relative overflow-hidden w-full sm:w-auto">
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Eye size={20} className="relative z-10" />
          <span className="relative z-10 text-xs sm:text-sm md:text-base">🎉 Spectate</span>
        </button>

        <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 sm:py-3 px-3 sm:px-4 md:py-4 md:px-6 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2 group relative overflow-hidden w-full sm:w-auto">
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <BarChart3 size={20} className="relative z-10" />
          <span className="relative z-10 text-xs sm:text-sm md:text-base">Stats</span>
        </button>
      </div>
    </div>
  );
};

export default BattleCard;
