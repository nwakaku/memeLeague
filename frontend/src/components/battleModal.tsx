import React, { useState, useEffect } from "react";
import {
  X,
  Coins,
  Gift,
  Sparkles,
  Star,
  Heart,
  Trophy,
  Target,
  Flame,
  Crown,
  Zap,
  Users,
  Timer,
  Play,
  Shield,
  Sword,
  Eye,
  Award,
  TrendingUp,
  Activity,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Loader,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";

const BattleModals = ({
  showVoteModal,
  setShowVoteModal,
  showCreateBattle,
  setShowCreateBattle,
  showSpectateModal,
  setShowSpectateModal,
  showStatsModal,
  setShowStatsModal,
  selectedBattle,
  selectedPet,
  voteAmount,
  setVoteAmount,
  handleSubmitVote,
  userBalance = 5000,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [tipAmount, setTipAmount] = useState("");
  const [selectedPetType, setSelectedPetType] = useState("dog");
  const [petName, setPetName] = useState("");
  const [battleType, setBattleType] = useState("casual");
  const [entryFee, setEntryFee] = useState(100);
  const [liveStats, setLiveStats] = useState({
    viewers: 0,
    chatMessages: [],
    reactions: {},
  });

  // Simulate live spectate data
  useEffect(() => {
    if (showSpectateModal && selectedBattle) {
      const interval = setInterval(() => {
        setLiveStats((prev) => ({
          ...prev,
          viewers: prev.viewers + Math.floor(Math.random() * 5) - 2,
          reactions: {
            fire: (prev.reactions.fire || 0) + (Math.random() > 0.8 ? 1 : 0),
            heart: (prev.reactions.heart || 0) + (Math.random() > 0.7 ? 1 : 0),
            star: (prev.reactions.star || 0) + (Math.random() > 0.9 ? 1 : 0),
          },
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [showSpectateModal, selectedBattle]);

  const handleVoteSubmit = async () => {
    if (!voteAmount || !selectedPet) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setVoteSuccess(true);

    setTimeout(() => {
      setVoteSuccess(false);
      setShowVoteModal(false);
      setVoteAmount("");
      handleSubmitVote();
    }, 2000);
  };

  const quickVoteAmounts = [10, 25, 50, 100, 250, 500];
  const petTypes = [
    { id: "dog", emoji: "🐕", name: "Doge Warrior" },
    { id: "cat", emoji: "🐱", name: "Crypto Cat" },
    { id: "frog", emoji: "🐸", name: "Pepe Fighter" },
    { id: "fox", emoji: "🦊", name: "Fox Legend" },
    { id: "dragon", emoji: "🐲", name: "Dragon Lord" },
    { id: "unicorn", emoji: "🦄", name: "Unicorn Magic" },
  ];

  const battleTypes_modal = [
    {
      id: "casual",
      name: "Casual Battle",
      fee: 50,
      desc: "Fun battles for beginners",
    },
    {
      id: "ranked",
      name: "Ranked Match",
      fee: 200,
      desc: "Compete for leaderboard points",
    },
    {
      id: "tournament",
      name: "Tournament",
      fee: 500,
      desc: "High-stakes championship battles",
    },
  ];

  // Vote Modal
  if (showVoteModal) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full mx-4 shadow-2xl border border-white/20 relative overflow-hidden">
          {voteSuccess && (
            <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center z-10 rounded-3xl">
              <div className="text-center text-white">
                <CheckCircle
                  size={64}
                  className="mx-auto mb-4 animate-bounce"
                />
                <h3 className="text-2xl font-bold mb-2">
                  Vote Cast Successfully! 🎉
                </h3>
                <p>
                  Your {voteAmount} $GUI vote for {selectedPet?.name} is
                  confirmed!
                </p>
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Coins className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Vote & Support
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Back your champion!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVoteModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {selectedPet && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{selectedPet.avatar}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {selectedPet.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      @{selectedPet.owner}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Trophy size={12} className="text-yellow-500" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {selectedPet.winRate}% win rate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Vote Amount ($GUI)
                </label>
                <span className="text-xs text-gray-500">
                  Balance: {userBalance.toLocaleString()} $GUI
                </span>
              </div>

              <div className="relative mb-4">
                <input
                  type="number"
                  value={voteAmount}
                  onChange={(e) => setVoteAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-lg font-medium text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Coins className="text-yellow-500" size={20} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickVoteAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setVoteAmount(amount.toString())}
                    className="py-2 px-3 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-sm font-medium transition-colors"
                  >
                    {amount}
                  </button>
                ))}
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3 mb-4">
                <div className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
                  <Star size={16} />
                  <span className="text-sm font-medium">
                    Higher votes = bigger rewards if your pet wins!
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleVoteSubmit}
                disabled={!voteAmount || isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>Casting Vote...</span>
                  </>
                ) : (
                  <>
                    <Coins size={20} />
                    <span>Cast Vote</span>
                    <Sparkles size={16} />
                  </>
                )}
              </button>

              <button
                onClick={() => setShowVoteModal(false)}
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create Battle Modal
  if (showCreateBattle) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-lg w-full mx-4 shadow-2xl border border-white/20 my-8">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <Sword className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Enter Battle Arena
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create your battle legend!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateBattle(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Pet Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Choose Your Fighter
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {petTypes.map((pet) => (
                    <button
                      key={pet.id}
                      onClick={() => setSelectedPetType(pet.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center hover:scale-105 ${
                        selectedPetType === pet.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-3xl mb-2">{pet.emoji}</div>
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {pet.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pet Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pet Name
                </label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="Enter epic name..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* Battle Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Battle Type
                </label>
                <div className="space-y-2">
                  {battleTypes_modal.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setBattleType(type.id);
                        setEntryFee(type.fee);
                      }}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        battleType === type.id
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/30"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {type.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {type.desc}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-yellow-600">
                            {type.fee} $GUI
                          </div>
                          <div className="text-xs text-gray-500">Entry Fee</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Entry Fee Display */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Coins className="text-yellow-500" size={20} />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Entry Fee
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-600">
                      {entryFee} $GUI
                    </div>
                    <div className="text-xs text-gray-500">
                      Balance: {userBalance.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  disabled={!petName || entryFee > userBalance}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-600 text-white py-4 px-6 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  onClick={() => {
                    // Handle battle creation
                    setShowCreateBattle(false);
                  }}
                >
                  <Play size={20} />
                  <span>Enter Arena</span>
                  <Sparkles size={16} />
                </button>

                <button
                  onClick={() => setShowCreateBattle(false)}
                  className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Spectate Modal
  if (showSpectateModal && selectedBattle) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full mx-4 shadow-2xl border border-white/20 max-h-[90vh] overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Eye className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Live Battle
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedBattle.battleRound} •{" "}
                    {liveStats.viewers + selectedBattle.spectators} watching
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSpectateModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Live Battle View */}
            <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl p-6 mb-6 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                <span>LIVE</span>
              </div>

              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-5xl mb-3 animate-bounce">
                    {selectedBattle.pet1.avatar}
                  </div>
                  <h4 className="font-bold">{selectedBattle.pet1.name}</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedBattle.pet1.votes} votes
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent animate-pulse mb-2">
                    ⚡VS⚡
                  </div>
                  <div className="text-sm font-mono bg-black text-green-400 px-3 py-1 rounded">
                    {Math.floor(selectedBattle.timeLeft / 60)}:
                    {String(selectedBattle.timeLeft % 60).padStart(2, "0")}
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-5xl mb-3 animate-bounce">
                    {selectedBattle.pet2.avatar}
                  </div>
                  <h4 className="font-bold">{selectedBattle.pet2.name}</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedBattle.pet2.votes} votes
                  </div>
                </div>
              </div>

              {/* Live Reactions */}
              <div className="flex items-center justify-center space-x-6">
                <button className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full px-4 py-2 hover:scale-105 transition-transform">
                  <span className="text-xl">🔥</span>
                  <span className="font-bold text-red-500">
                    {liveStats.reactions.fire || 0}
                  </span>
                </button>
                <button className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full px-4 py-2 hover:scale-105 transition-transform">
                  <span className="text-xl">❤️</span>
                  <span className="font-bold text-pink-500">
                    {liveStats.reactions.heart || 0}
                  </span>
                </button>
                <button className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full px-4 py-2 hover:scale-105 transition-transform">
                  <span className="text-xl">⭐</span>
                  <span className="font-bold text-yellow-500">
                    {liveStats.reactions.star || 0}
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setShowSpectateModal(false);
                  setShowVoteModal(true);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center space-x-2"
              >
                <Coins size={20} />
                <span>Vote Now</span>
              </button>

              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center space-x-2">
                <Gift size={20} />
                <span>Send Tip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Stats Modal
  if (showStatsModal && selectedBattle) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full mx-4 shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <BarChart3 className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Battle Statistics
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Detailed battle analysis
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowStatsModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Battle Overview */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-4">
                <h4 className="font-bold mb-3 text-gray-900 dark:text-white">
                  Battle Overview
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedBattle.pot.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Prize Pool ($GUI)
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedBattle.spectators}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Live Viewers
                    </div>
                  </div>
                </div>
              </div>

              {/* Pet Comparison */}
              <div className="grid grid-cols-2 gap-4">
                {[selectedBattle.pet1, selectedBattle.pet2].map(
                  (pet, index) => (
                    <div
                      key={pet.id}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4"
                    >
                      <div className="text-center mb-4">
                        <div className="text-4xl mb-2">{pet.avatar}</div>
                        <h5 className="font-bold text-gray-900 dark:text-white">
                          {pet.name}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          @{pet.owner}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Level
                          </span>
                          <span className="font-bold">{pet.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Power
                          </span>
                          <span className="font-bold text-blue-600">
                            {pet.power}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Win Rate
                          </span>
                          <span className="font-bold text-green-600">
                            {pet.winRate}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Votes
                          </span>
                          <span className="font-bold text-purple-600">
                            {pet.votes}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Streak
                          </span>
                          <span className="font-bold text-orange-600">
                            {pet.streak} 🔥
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Vote Distribution */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4">
                <h4 className="font-bold mb-3 text-gray-900 dark:text-white">
                  Vote Distribution
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{selectedBattle.pet1.name}</span>
                    <span>{selectedBattle.pet1.votes} votes</span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000"
                      style={{
                        width: `${(selectedBattle.pet1.votes / (selectedBattle.pet1.votes + selectedBattle.pet2.votes)) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{selectedBattle.pet2.name}</span>
                    <span>{selectedBattle.pet2.votes} votes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BattleModals;
