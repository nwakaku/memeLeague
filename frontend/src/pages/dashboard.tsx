//@ts-nocheck

import { useState, useEffect } from "react";
import {
  Gift,
  Zap,
  Trophy,
  ShoppingBag,
  Heart,
  Camera,
  Crown,
  Sparkles,
} from "lucide-react";
import DefaultLayout from "@/layouts/default";

// Enhanced mock data with more detailed pet information
const mockUserPet = {
  avatar: "🐕",
  name: "CryptoWoof",
  level: 5,
  xp: 750,
  maxXp: 1000,
  rarity: "Epic",
  age: 42,
  feedCount: 127,
  votesWon: 23,
  guiBalance: 2450,
  accessories: ["🎩", "🕶️", "🎀"],
  availableSkins: ["🐕", "🐱", "🦊", "🐸", "🦄", "🐲"],
  stats: {
    strength: 75,
    agility: 85,
    charm: 90,
    wisdom: 65,
  },
  achievements: ["First Battle", "Style Icon", "Generous Tipper"],
};

const inventoryItems = [
  { id: 1, icon: "🍖", name: "Premium Meat", count: 5, type: "food" },
  { id: 2, icon: "🎾", name: "Play Ball", count: 3, type: "toy" },
  { id: 3, icon: "🦴", name: "Golden Bone", count: 2, type: "food" },
  { id: 4, icon: "🏆", name: "Victory Trophy", count: 1, type: "trophy" },
  { id: 5, icon: "💎", name: "Rare Gem", count: 8, type: "currency" },
  { id: 6, icon: "⚡", name: "Energy Boost", count: 12, type: "potion" },
  { id: 7, icon: "🌟", name: "Star Fragment", count: 4, type: "currency" },
  { id: 8, icon: "🎭", name: "Comedy Mask", count: 1, type: "accessory" },
];

const recentTips = [
  { from: "MemeKing", amount: 50, message: "Awesome pet!", time: "2h ago" },
  { from: "CryptoQueen", amount: 25, message: "So cute! 🥰", time: "5h ago" },
  {
    from: "PetLover99",
    amount: 100,
    message: "Battle legend!",
    time: "1d ago",
  },
];

export default function MemePetDashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [userPet, setUserPet] = useState(mockUserPet);
  const [petAnimation, setPetAnimation] = useState("idle");
  const [selectedSkin, setSelectedSkin] = useState(mockUserPet.avatar);
  const [showSkinSelector, setShowSkinSelector] = useState(false);
  const [feedingAnimation, setFeedingAnimation] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<any>(null);

  // Idle animation cycle
  useEffect(() => {
    const animationCycle = setInterval(() => {
      if (petAnimation === "idle") {
        const animations = ["bounce", "pulse", "wiggle"];
        const randomAnimation =
          animations[Math.floor(Math.random() * animations.length)];
        setPetAnimation(randomAnimation);
        setTimeout(() => setPetAnimation("idle"), 1000);
      }
    }, 5000);

    return () => clearInterval(animationCycle);
  }, [petAnimation]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    // Here you would typically handle navigation logic
    console.log(`Navigating to: ${page}`);
  };

  const handleFeedPet = () => {
    if (userPet.guiBalance >= 10) {
      setFeedingAnimation(true);
      setPetAnimation("bounce");

      setTimeout(() => {
        setUserPet((prev) => ({
          ...prev,
          xp: Math.min(prev.maxXp, prev.xp + 50),
          guiBalance: prev.guiBalance - 10,
          feedCount: prev.feedCount + 1,
        }));
        setFeedingAnimation(false);
        setPetAnimation("idle");
      }, 1500);
    }
  };

  const handlePetClick = () => {
    setPetAnimation("bounce");
    setTimeout(() => setPetAnimation("idle"), 500);
  };

  const changeSkin = (newSkin: string) => {
    setSelectedSkin(newSkin);
    setUserPet((prev) => ({ ...prev, avatar: newSkin }));
    setShowSkinSelector(false);
    setPetAnimation("sparkle");
    setTimeout(() => setPetAnimation("idle"), 1000);
  };

  const getAnimationClass = () => {
    switch (petAnimation) {
      case "bounce":
        return "animate-bounce";
      case "pulse":
        return "animate-pulse";
      case "wiggle":
        return "animate-ping";
      case "sparkle":
        return "animate-spin";
      default:
        return "";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Epic":
        return "from-purple-400 to-pink-400";
      case "Legendary":
        return "from-yellow-400 to-orange-400";
      case "Rare":
        return "from-blue-400 to-cyan-400";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  return (
    <DefaultLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
      showSidebar={true}
    >
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 dark:from-purple-900 dark:via-gray-900 dark:to-indigo-900 p-4 mb-20 rounded-md">
        {/* Pet Avatar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 text-center shadow-2xl border border-white/20 relative overflow-hidden">
            {feedingAnimation && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 animate-pulse rounded-3xl" />
            )}

            <div className="relative inline-block mb-6">
              <div
                className={`w-40 h-40 rounded-full bg-gradient-to-br ${getRarityColor(userPet.rarity)} flex items-center justify-center text-8xl ${getAnimationClass()} shadow-2xl border-4 border-white/50 cursor-pointer hover:scale-105 transition-transform relative`}
                onClick={handlePetClick}
              >
                {userPet.avatar}
                {feedingAnimation && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="text-red-500 animate-ping" size={30} />
                  </div>
                )}
              </div>

              {/* Level Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg shadow-lg border-2 border-white">
                {userPet.level}
              </div>

              {/* Rarity Badge */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                {userPet.rarity}
              </div>

              {/* Accessories */}
              {userPet.accessories.map((accessory, index) => (
                <div
                  key={index}
                  className={`absolute ${
                    index === 0
                      ? "-top-6 left-12"
                      : index === 1
                        ? "top-6 -right-6"
                        : "bottom-2 left-2"
                  } text-3xl animate-pulse drop-shadow-lg`}
                >
                  {accessory}
                </div>
              ))}

              {/* Skin Selector Button */}
              <button
                onClick={() => setShowSkinSelector(!showSkinSelector)}
                className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-700/80 backdrop-blur rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
              >
                <Camera size={16} />
              </button>
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {userPet.name}
            </h2>

            {/* XP Progress Bar */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-3 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000 relative"
                style={{ width: `${(userPet.xp / userPet.maxXp) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              XP: {userPet.xp} / {userPet.maxXp} → Next Evolution
            </p>

            {/* Pet Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 rounded-xl p-3">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                  {userPet.age}
                </div>
                <div className="text-xs text-blue-500 dark:text-blue-400">
                  Days Old
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-900 rounded-xl p-3">
                <div className="text-2xl font-bold text-green-600 dark:text-green-300">
                  {userPet.feedCount}
                </div>
                <div className="text-xs text-green-500 dark:text-green-400">
                  Fed Times
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 rounded-xl p-3">
                <div className="flex items-center justify-center text-2xl font-bold text-purple-600 dark:text-purple-300">
                  <Crown className="text-purple-500 mr-1" size={18} />
                  {userPet.votesWon}
                </div>
                <div className="text-xs text-purple-500 dark:text-purple-400">
                  Rank
                </div>
              </div>
            </div>

            {/* Skin Selector Modal */}
            {showSkinSelector && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-white/20 z-10">
                <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-white">
                  Choose Your Pet
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {userPet.availableSkins.map((skin, index) => (
                    <button
                      key={index}
                      onClick={() => changeSkin(skin)}
                      className={`w-16 h-16 rounded-xl text-3xl flex items-center justify-center transition-all hover:scale-110 ${
                        selectedSkin === skin
                          ? "bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {skin}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pet Stats Panel */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center">
                <Trophy className="mr-3 text-yellow-500" size={24} />
                Pet Stats
              </h3>
              <button
                onClick={() => setShowStats(!showStats)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showStats ? "Hide" : "Show"}
              </button>
            </div>

            {showStats && (
              <div className="space-y-4">
                {Object.entries(userPet.stats).map(([stat, value]) => (
                  <div key={stat} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="capitalize text-gray-700 dark:text-gray-300 font-medium flex items-center">
                        {stat === "strength" && "💪"}
                        {stat === "agility" && "⚡"}
                        {stat === "charm" && "✨"}
                        {stat === "wisdom" && "🧠"}
                        <span className="ml-2">{stat}</span>
                      </span>
                      <span className="text-lg font-bold text-gray-800 dark:text-white">
                        {value}/100
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          stat === "strength"
                            ? "bg-gradient-to-r from-red-400 to-red-600"
                            : stat === "agility"
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                              : stat === "charm"
                                ? "bg-gradient-to-r from-pink-400 to-purple-500"
                                : "bg-gradient-to-r from-blue-400 to-indigo-500"
                        } group-hover:shadow-lg`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                Recent Achievements
              </h4>
              <div className="flex flex-wrap gap-2">
                {userPet.achievements.map((achievement, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    🏆 {achievement}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={handleFeedPet}
            disabled={userPet.guiBalance < 10}
            className="bg-gradient-to-r from-green-500 to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all disabled:cursor-not-allowed disabled:transform-none group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Gift size={24} className="relative z-10" />
            <div className="relative z-10">
              <span className="block">Feed Pet</span>
              <span className="text-xs opacity-80">10 $GUI</span>
            </div>
          </button>

          <button className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles size={24} className="relative z-10" />
            <div className="relative z-10">
              <span className="block">Style Pet</span>
              <span className="text-xs opacity-80">Customize</span>
            </div>
          </button>

          <button className="bg-gradient-to-r from-red-500 to-orange-600 text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all col-span-2 group relative overflow-hidden">
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Zap size={24} className="relative z-10 animate-pulse" />
            <div className="relative z-10">
              <span className="block text-lg">Enter Battle Arena</span>
              <span className="text-sm opacity-90">Compete for glory!</span>
            </div>
          </button>
        </div>

        {/* Inventory & Tips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Inventory */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center">
              <ShoppingBag className="mr-3 text-blue-500" size={24} />
              Inventory
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {inventoryItems.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4 text-center hover:scale-110 transition-all cursor-pointer shadow-md hover:shadow-lg group"
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="text-3xl mb-2 group-hover:animate-bounce">
                    {item.icon}
                  </div>
                  {item.count > 1 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {item.count}
                    </div>
                  )}
                  {hoveredItem?.id === item.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-10">
                      {item.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tips */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 flex items-center">
              <Heart className="mr-3 text-pink-500" size={24} />
              Recent Tips Received
            </h3>
            <div className="space-y-3">
              {recentTips.map((tip, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {tip.from[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">
                        {tip.from}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        "{tip.message}"
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 dark:text-green-400">
                      +{tip.amount} $GUI
                    </div>
                    <div className="text-xs text-gray-500">{tip.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
