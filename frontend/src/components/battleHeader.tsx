import React, { useState, useEffect } from "react";
import {
  Sword,
  Timer,
  Zap,
  Trophy,
  Coins,
  Crown,
  Target,
  Flame,
  Star,
  Users,
  TrendingUp,
  Volume2,
  VolumeX,
  Play,
  Activity,
  Eye,
  Gift,
  Sparkles,
  Award,
  AlertTriangle,
  Clock,
  BarChart3,
} from "lucide-react";

const battleTypes = [
  {
    id: "all",
    label: "All Battles",
    icon: "⚔️",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "ranked",
    label: "Ranked",
    icon: "🏆",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "casual",
    label: "Casual",
    icon: "🎮",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "tournament",
    label: "Tournament",
    icon: "👑",
    color: "from-purple-500 to-pink-500",
  },
];

const BattleHeader = ({
  activeFilter,
  setActiveFilter,
  soundEnabled,
  setSoundEnabled,
  autoRefresh,
  setAutoRefresh,
  setShowCreateBattle,
  mockBattles,
  isLoaded,
}) => {
  return (
    <>
      {/* Hero Section */}
      <div
        className={`mb-8 text-center transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 mb-6 shadow-2xl relative">
          <Sword size={36} className="text-white animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-spin rounded-full" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-3">
          ⚔️ Battle Arena ⚔️
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto">
          Where legends clash and $GUI flows like water! Choose your champion
          and stake your claim to glory!
        </p>

        {/* Live Stats Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm">
          <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg">
            <Activity className="text-green-500 animate-pulse" size={16} />
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-bold text-green-500">
                {mockBattles.length}
              </span>{" "}
              Live Battles
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg">
            <Users className="text-blue-500" size={16} />
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-bold text-blue-500">
                {mockBattles.reduce(
                  (sum, battle) => sum + battle.spectators,
                  0
                )}
              </span>{" "}
              Spectators
            </span>
          </div>
          <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg">
            <Coins className="text-yellow-500 animate-bounce" size={16} />
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-bold text-yellow-500">
                {mockBattles
                  .reduce((sum, battle) => sum + battle.pot, 0)
                  .toLocaleString()}
              </span>{" "}
              $GUI
            </span>
          </div>
        </div>

        {/* Real-time Battle Announcements */}
        <div className="mt-4 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-4 text-red-500 font-bold">
              🔥 EPIC BATTLE: DragonDoge vs UniMagic - 2100 $GUI Prize!
            </span>
            <span className="mx-4 text-orange-500 font-bold">
              ⚡ CryptoWoof on a 5-win streak!
            </span>
            <span className="mx-4 text-purple-500 font-bold">
              👑 Tournament Finals starting in 7 minutes!
            </span>
          </div>
        </div>
      </div>

      {/* Battle Type Filters */}
      <div
        className={`mb-8 transition-all duration-700 delay-200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-2 flex shadow-xl border border-white/20 overflow-x-auto">
          {battleTypes.map(({ id, label, icon, color }) => (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              className={`flex-shrink-0 flex items-center space-x-2 py-3 px-6 rounded-xl font-semibold transition-all relative overflow-hidden group ${
                activeFilter === id
                  ? `bg-gradient-to-r ${color} text-white shadow-lg transform scale-105`
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50"
              }`}
            >
              {activeFilter === id && (
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-xl" />
              )}
              <span className="text-xl relative z-10">{icon}</span>
              <span className="relative z-10 whitespace-nowrap">{label}</span>
              {activeFilter === id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-bounce" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Settings & Action Bar */}
      <div
        className={`mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl px-4 py-2 shadow-lg hover:scale-105 transition-transform"
          >
            {soundEnabled ? (
              <Volume2 className="text-blue-500" size={16} />
            ) : (
              <VolumeX className="text-gray-500" size={16} />
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
              {soundEnabled ? "Sound On" : "Sound Off"}
            </span>
          </button>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center space-x-2 backdrop-blur-lg rounded-xl px-4 py-2 shadow-lg hover:scale-105 transition-transform ${
              autoRefresh
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-white/80 dark:bg-gray-800/80"
            }`}
          >
            <Activity
              className={
                autoRefresh ? "text-green-500 animate-pulse" : "text-gray-500"
              }
              size={16}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
              Auto Refresh
            </span>
          </button>

          {/* Battle Intensity Indicator */}
          <div className="flex items-center space-x-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl px-3 py-2 shadow-lg">
            <Flame className="text-red-500 animate-pulse" size={16} />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              High Activity
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Trophy className="text-yellow-500" size={16} />
            <span>Your Rank: #47</span>
          </div>

          <button
            onClick={() => setShowCreateBattle(true)}
            className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Play size={18} className="relative z-10" />
            <span className="relative z-10">Enter Battle</span>
            <Sparkles size={16} className="relative z-10 animate-pulse" />
          </button>
        </div>
      </div>
    </>
  );
};

export default BattleHeader;
