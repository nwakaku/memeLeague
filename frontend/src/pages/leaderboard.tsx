import { useState } from "react";
import {
  Trophy,
  Crown,
  Coins,
  
  Star,
  Sparkles,
  TrendingUp,
  Calendar,
  Filter,
  X,
  Gift,
  ChevronDown,
  Flame,
  Award,
  Medal,
  Target,
} from "lucide-react";
import DefaultLayout from "@/layouts/default";

// Mock leaderboard data with enhanced details
const mockLeaderboardData = {
  tips: [
    {
      id: 1,
      avatar: "🐕",
      name: "CryptoWoof",
      owner: "memekingeth",
      tips: 15420,
      rank: "Meme Lord",
      badges: ["👑", "💎", "🔥"],
      level: 12,
      wins: 89,
      style: 95,
      reactions: ["😍", "🚀", "💰"],
      streak: 7,
      growth: "+23%",
    },
    {
      id: 2,
      avatar: "🐱",
      name: "WhiskerMoon",
      owner: "catdaddy.eth",
      tips: 12850,
      rank: "Meme Noble",
      badges: ["✨", "🎭", "💫"],
      level: 10,
      wins: 72,
      style: 88,
      reactions: ["🥰", "⭐", "🎉"],
      streak: 5,
      growth: "+18%",
    },
    {
      id: 3,
      avatar: "🦊",
      name: "FoxyFlex",
      owner: "cleverfox",
      tips: 9630,
      rank: "Meme Knight",
      badges: ["🏆", "⚡", "🎯"],
      level: 9,
      wins: 64,
      style: 82,
      reactions: ["🔥", "💪", "🎊"],
      streak: 3,
      growth: "+12%",
    },
    {
      id: 4,
      avatar: "🐸",
      name: "PepePrime",
      owner: "frogmaster",
      tips: 8200,
      rank: "Meme Warrior",
      badges: ["🐸", "💚", "🌟"],
      level: 8,
      wins: 58,
      style: 76,
      reactions: ["😂", "👌", "🚀"],
      streak: 2,
      growth: "+8%",
    },
    {
      id: 5,
      avatar: "🦄",
      name: "UniMagic",
      owner: "rainbowrider",
      tips: 7100,
      rank: "Meme Squire",
      badges: ["🌈", "✨", "🦄"],
      level: 7,
      wins: 45,
      style: 91,
      reactions: ["🦄", "✨", "💖"],
      streak: 4,
      growth: "+15%",
    },
    {
      id: 6,
      avatar: "🐲",
      name: "DragonDoge",
      owner: "firebreather",
      tips: 6500,
      rank: "Meme Rookie",
      badges: ["🐲", "🔥", "⚔️"],
      level: 6,
      wins: 41,
      style: 73,
      reactions: ["🐲", "🔥", "💥"],
      streak: 1,
      growth: "+5%",
    },
  ],
};

const timeFilters = [
  { id: "week", label: "This Week", icon: "📅" },
  { id: "month", label: "This Month", icon: "🗓️" },
  { id: "alltime", label: "All Time", icon: "♾️" },
];

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState("tips");
  const [timeFilter, setTimeFilter] = useState("week");
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [tipAmount, setTipAmount] = useState("");
  const [tipMessage, setTipMessage] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState("");
  const [currentPage, setCurrentPage] = useState("leaderboard");

  const tabs = [
    {
      id: "tips",
      label: "Top Tipped",
      icon: "💰",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "wins",
      label: "Most Wins",
      icon: "🏆",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "style",
      label: "Most Stylish",
      icon: "✨",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const getRankColor = (rank: any) => {
    switch (rank) {
      case "Meme Lord":
        return "from-yellow-400 to-orange-500";
      case "Meme Noble":
        return "from-purple-400 to-pink-500";
      case "Meme Knight":
        return "from-blue-400 to-cyan-500";
      case "Meme Warrior":
        return "from-green-400 to-emerald-500";
      case "Meme Squire":
        return "from-indigo-400 to-purple-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getPositionIcon = (index: any) => {
    switch (index) {
      case 0:
        return <Crown className="text-yellow-500 animate-pulse" size={20} />;
      case 1:
        return <Medal className="text-gray-400" size={18} />;
      case 2:
        return <Award className="text-orange-500" size={18} />;
      default:
        return <Target className="text-gray-500" size={16} />;
    }
  };

  const handleTip = () => {
    if (tipAmount && selectedPet) {
      // Handle tip logic here
      console.log(
        `Tipping ${tipAmount} $GUI to ${selectedPet.name}: ${tipMessage}`
      );
      setShowTipModal(false);
      setTipAmount("");
      setTipMessage("");
      setSelectedReaction("");
    }
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    // Here you would typically handle navigation logic
    console.log(`Navigating to: ${page}`);
  };

  const sortedData = mockLeaderboardData.tips.sort((a, b) => {
    switch (activeTab) {
      case "wins":
        return b.wins - a.wins;
      case "style":
        return b.style - a.style;
      default:
        return b.tips - a.tips;
    }
  });

  return (
    <DefaultLayout
      currentPage={currentPage}
      onPageChange={handlePageChange}
      showSidebar={true}
    >
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 dark:from-purple-900 dark:via-gray-900 dark:to-indigo-900 p-4 pb-20">
        {/* Header Section */}
        <div
          className="mb-8 text-center transition-all duration-300"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-4 shadow-2xl animate-pulse">
            <Trophy size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            The hall of meme legends 🏆
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className="mb-6 transition-all duration-300"
        >
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-2 flex shadow-xl border border-white/20">
            {tabs.map(({ id, label, icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 py-4 px-4 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 relative overflow-hidden group ${
                  activeTab === id
                    ? `bg-gradient-to-r ${color} text-white shadow-lg transform scale-105`
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
              >
                {activeTab === id && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-xl" />
                )}
                <span className="text-xl relative z-10">{icon}</span>
                <span className="text-sm relative z-10">{label}</span>
                {activeTab === id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-bounce" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div
          className="mb-6 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-500" size={20} />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Time Period:
              </span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl px-4 py-2 shadow-lg hover:scale-105 transition-transform"
            >
              <Calendar className="text-blue-500" size={16} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {timeFilters.find((f) => f.id === timeFilter)?.label}
              </span>
              <ChevronDown
                className={`text-gray-500 transition-transform ${showFilters ? "rotate-180" : ""}`}
                size={16}
              />
            </button>
          </div>

          {showFilters && (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-xl p-4 shadow-xl border border-white/20 animate-fadeIn">
              <div className="grid grid-cols-3 gap-2">
                {timeFilters.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setTimeFilter(id);
                      setShowFilters(false);
                    }}
                    className={`p-3 rounded-lg text-center transition-all hover:scale-105 ${
                      timeFilter === id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="text-xs font-medium">{label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard Cards */}
        <div className="space-y-4">
          {sortedData.map((pet, index) => (
            <div
              key={pet.id}
              className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden group ${
                index === 0
                  ? "border-yellow-400 shadow-yellow-200/50 dark:shadow-yellow-500/20"
                  : "border-white/20 hover:border-purple-300/50"
              }`}
              style={{ transitionDelay: `${(index + 1) * 50}ms` }}
            >
              {/* Background Animation for Top 3 */}
              {index < 3 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse rounded-2xl" />
              )}

              {/* Rank Badge */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                {getPositionIcon(index)}
                <span
                  className={`text-2xl font-bold ${
                    index === 0
                      ? "text-yellow-500"
                      : index === 1
                        ? "text-gray-400"
                        : index === 2
                          ? "text-orange-500"
                          : "text-gray-500"
                  }`}
                >
                  #{index + 1}
                </span>
              </div>

              {/* Growth Indicator */}
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
                  <TrendingUp size={12} />
                  <span>{pet.growth}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 mt-8">
                {/* Pet Avatar */}
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${getRankColor(pet.rank)} flex items-center justify-center text-4xl shadow-lg border-4 border-white/50 ${index === 0 ? "animate-bounce" : "hover:animate-pulse"} transition-transform hover:scale-110`}
                  >
                    {pet.avatar}
                  </div>

                  {/* Level Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg">
                    {pet.level}
                  </div>

                  {/* Streak Indicator */}
                  {pet.streak > 0 && (
                    <div className="absolute -top-2 -left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                      <Flame size={12} />
                    </div>
                  )}
                </div>

                {/* Pet Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {pet.name}
                    </h3>
                    <div className="flex space-x-1">
                      {pet.badges.map((badge, i) => (
                        <span
                          key={i}
                          className="text-lg animate-pulse"
                          style={{ animationDelay: `${i * 200}ms` }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                    <span className="mr-2">👤</span>@{pet.owner}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center space-x-6 mb-3">
                    <div className="flex items-center space-x-2">
                      <Coins className="text-yellow-500" size={16} />
                      <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                        {pet.tips.toLocaleString()} $GUI
                      </span>
                    </div>

                    {activeTab === "wins" && (
                      <div className="flex items-center space-x-2">
                        <Trophy className="text-purple-500" size={16} />
                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {pet.wins} wins
                        </span>
                      </div>
                    )}

                    {activeTab === "style" && (
                      <div className="flex items-center space-x-2">
                        <Sparkles className="text-pink-500" size={16} />
                        <span className="text-sm font-semibold text-pink-600 dark:text-pink-400">
                          {pet.style}/100 style
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Rank Badge */}
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${getRankColor(pet.rank)} text-white shadow-lg`}
                  >
                    <Star className="mr-1" size={12} />
                    {pet.rank}
                  </div>

                  {/* Reaction Trail */}
                  <div className="flex items-center space-x-1 mt-3">
                    <span className="text-xs text-gray-500 mr-2">
                      Recent reactions:
                    </span>
                    {pet.reactions.map((reaction, i) => (
                      <span
                        key={i}
                        className="text-lg animate-bounce cursor-pointer hover:scale-125 transition-transform"
                        style={{ animationDelay: `${i * 300}ms` }}
                      >
                        {reaction}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tip Button */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      setSelectedPet(pet);
                      setShowTipModal(true);
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <Coins size={18} className="relative z-10" />
                    <span className="relative z-10">Tip Now</span>
                  </button>

                  {pet.streak > 2 && (
                    <div className="text-center">
                      <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full font-semibold">
                        🔥 {pet.streak} day streak!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tip Modal */}
        {showTipModal && selectedPet && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-blue-400/10 to-purple-400/10 animate-pulse rounded-3xl" />

              <div className="relative z-10">
                {/* Close Button */}
                <button
                  onClick={() => setShowTipModal(false)}
                  className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Modal Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-3xl shadow-lg">
                    {selectedPet.avatar}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Tip {selectedPet.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Show your appreciation with $GUI
                  </p>
                </div>

                {/* Tip Amount Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Amount ($GUI)
                  </label>
                  <div className="relative">
                    <Coins
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500"
                      size={20}
                    />
                    <input
                      type="number"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(e.target.value)}
                      placeholder="Enter amount..."
                      className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTipAmount(amount.toString())}
                      className="py-2 px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-semibold hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                {/* Message Input */}
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    value={tipMessage}
                    onChange={(e) => setTipMessage(e.target.value)}
                    placeholder="Add a nice message..."
                    rows="2"
                    className="w-full p-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                {/* Reaction Selector */}
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                    Add a reaction
                  </label>
                  <div className="flex space-x-2">
                    {["😍", "🚀", "💎", "🔥", "⭐", "🎉", "💪", "👑"].map(
                      (emoji) => (
                        <button
                          key={emoji}
                          onClick={() =>
                            setSelectedReaction(
                              selectedReaction === emoji ? "" : emoji
                            )
                          }
                          className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all hover:scale-110 ${
                            selectedReaction === emoji
                              ? "bg-green-100 dark:bg-green-900/30 shadow-lg"
                              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          {emoji}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowTipModal(false)}
                    className="flex-1 py-3 px-4 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleTip}
                    disabled={!tipAmount}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    <Gift size={18} />
                    <span>Send Tip</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default LeaderboardPage;
