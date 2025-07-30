import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Crown,
  Trophy,
  Coins,
  Activity,
  Users,
  Flame,
  Star,
  Target,
  Award,
  BarChart3,
  Eye,
  Clock,
  Zap,
  Heart,
  Gift,
} from "lucide-react";

const BattleStats = ({ battles, isLoaded }) => {
  const [liveMetrics, setLiveMetrics] = useState({
    totalViewers: 0,
    totalPrizePool: 0,
    averageBattleIntensity: 0,
    topPerformers: [],
  });

  const [realtimeData, setRealtimeData] = useState({
    newViewers: 0,
    recentTips: 0,
    hotBattles: 0,
  });

  useEffect(() => {
    if (battles?.length) {
      // Calculate live metrics
      const totalViewers = battles.reduce(
        (sum, battle) => sum + battle.spectators,
        0
      );
      const totalPrizePool = battles.reduce(
        (sum, battle) => sum + battle.pot,
        0
      );

      // Get top performers based on votes and win rate
      const allPets = battles.flatMap((battle) => [battle.pet1, battle.pet2]);
      const topPerformers = allPets
        .sort((a, b) => b.votes * b.winRate - a.votes * a.winRate)
        .slice(0, 3);

      setLiveMetrics({
        totalViewers,
        totalPrizePool,
        averageBattleIntensity: battles.filter(
          (b) => b.intensity === "high" || b.intensity === "extreme"
        ).length,
        topPerformers,
      });
    }
  }, [battles]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData((prev) => ({
        newViewers: prev.newViewers + Math.floor(Math.random() * 15),
        recentTips: prev.recentTips + Math.floor(Math.random() * 50),
        hotBattles: Math.floor(Math.random() * 3) + 1,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case "extreme":
        return "text-red-500";
      case "high":
        return "text-orange-500";
      case "medium":
        return "text-yellow-500";
      default:
        return "text-green-500";
    }
  };

  const getIntensityBg = (intensity) => {
    switch (intensity) {
      case "extreme":
        return "from-red-500/20 to-orange-500/20";
      case "high":
        return "from-orange-500/20 to-red-500/20";
      case "medium":
        return "from-yellow-500/20 to-orange-500/20";
      default:
        return "from-green-500/20 to-yellow-500/20";
    }
  };

  return (
    <div
      className={`space-y-6 transition-all duration-700 delay-600 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
    >
      {/* Real-time Activity Banner */}
      <div className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 rounded-2xl p-4 border border-red-200/50 dark:border-red-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="font-bold text-gray-900 dark:text-white">
              Live Arena Activity
            </span>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <Users className="text-blue-500" size={16} />
              <span className="text-gray-600 dark:text-gray-400">
                +{realtimeData.newViewers} viewers
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Gift className="text-green-500" size={16} />
              <span className="text-gray-600 dark:text-gray-400">
                +{realtimeData.recentTips} $GUI tips
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Flame className="text-red-500 animate-bounce" size={16} />
              <span className="text-gray-600 dark:text-gray-400">
                {realtimeData.hotBattles} trending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Prize Pool */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Coins className="text-yellow-500" size={24} />
              <div className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 px-2 py-1 rounded-full">
                Live
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {liveMetrics.totalPrizePool.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              $GUI Prize Pool
            </p>
          </div>
        </div>

        {/* Total Viewers */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Eye className="text-blue-500" size={24} />
              <div className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-1 rounded-full">
                Watching
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {liveMetrics.totalViewers + realtimeData.newViewers}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Live Spectators
            </p>
          </div>
        </div>

        {/* Active Battles */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Zap className="text-red-500 animate-pulse" size={24} />
              <div className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 px-2 py-1 rounded-full">
                Active
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {battles?.length || 0}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Live Battles
            </p>
          </div>
        </div>

        {/* Hot Battles */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <Flame className="text-orange-500 animate-bounce" size={24} />
              <div className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-2 py-1 rounded-full">
                Hot
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {liveMetrics.averageBattleIntensity}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              High Intensity
            </p>
          </div>
        </div>
      </div>

      {/* Battle Intensity Distribution */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <BarChart3 className="text-blue-500" size={20} />
            <span>Battle Intensity Levels</span>
          </h3>
          <div className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
            Real-time
          </div>
        </div>

        <div className="space-y-4">
          {battles?.map((battle) => (
            <div key={battle.id} className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-lg">{battle.pet1.avatar}</div>
                <div className="text-xs text-gray-500">vs</div>
                <div className="text-lg">{battle.pet2.avatar}</div>
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {battle.battleRound}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-bold ${getIntensityColor(battle.intensity)}`}
                    >
                      {battle.intensity.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {battle.spectators} viewers
                    </span>
                  </div>
                </div>

                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${getIntensityBg(battle.intensity)} h-2 rounded-full transition-all duration-1000`}
                    style={{
                      width: `${Math.min((battle.spectators / Math.max(...battles.map((b) => b.spectators))) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <div className="text-sm font-bold text-yellow-600">
                  {battle.pot} $GUI
                </div>
                <div className="text-xs text-gray-500">
                  {Math.floor(battle.timeLeft / 60)}:
                  {String(battle.timeLeft % 60).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Crown className="text-yellow-500" size={20} />
            <span>Arena Champions</span>
          </h3>
          <div className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 px-3 py-1 rounded-full">
            Live Rankings
          </div>
        </div>

        <div className="space-y-3">
          {liveMetrics.topPerformers.map((pet, index) => (
            <div
              key={pet.id}
              className="flex items-center space-x-4 p-3 rounded-xl bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-700/50 dark:to-gray-800/50 hover:scale-105 transition-transform"
            >
              <div className="flex-shrink-0 relative">
                <div className="text-3xl">{pet.avatar}</div>
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown size={12} className="text-white" />
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                    <Award size={12} className="text-white" />
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <Star size={12} className="text-white" />
                  </div>
                )}
              </div>

              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {pet.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      @{pet.owner}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Trophy className="text-yellow-500" size={12} />
                        <span className="text-green-600 font-bold">
                          {pet.winRate}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="text-red-500" size={12} />
                        <span className="text-blue-600 font-bold">
                          {pet.votes}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Flame className="text-orange-500" size={12} />
                        <span className="text-purple-600 font-bold">
                          {pet.streak}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Badges */}
                <div className="flex items-center space-x-1 mt-2">
                  {pet.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="text-sm animate-pulse"
                      style={{ animationDelay: `${i * 200}ms` }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Battle Activity Timeline */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Activity className="text-green-500" size={20} />
            <span>Recent Activity</span>
          </h3>
          <div className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-3 py-1 rounded-full animate-pulse">
            Live Feed
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {/* Simulated activity feed */}
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/20">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <div className="flex-grow">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-bold text-blue-600">CryptoWoof</span>{" "}
                received 50 $GUI votes
              </p>
              <p className="text-xs text-gray-500">2 seconds ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-green-50/50 dark:bg-green-900/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="flex-grow">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                New battle started:{" "}
                <span className="font-bold text-green-600">
                  Tournament Finals
                </span>
              </p>
              <p className="text-xs text-gray-500">15 seconds ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-yellow-50/50 dark:bg-yellow-900/20">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <div className="flex-grow">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-bold text-yellow-600">DragonDoge</span> is
                on a 7-win streak! 🔥
              </p>
              <p className="text-xs text-gray-500">32 seconds ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-purple-50/50 dark:bg-purple-900/20">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <div className="flex-grow">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-bold text-purple-600">UniMagic</span>{" "}
                received epic tip of 200 $GUI!
              </p>
              <p className="text-xs text-gray-500">1 minute ago</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-red-50/50 dark:bg-red-900/20">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <div className="flex-grow">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Battle intensity upgraded to{" "}
                <span className="font-bold text-red-600">EXTREME</span>
              </p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleStats;
