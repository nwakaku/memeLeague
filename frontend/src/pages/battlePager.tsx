import { useState, useEffect } from "react";
import BattleHeader from "@/components/battleHeader";
import BattleCard from "@/components/battleCard";   
import BattleStats from "@/components/battleStats";
import BattleModals from "@/components/battleModal";
import DefaultLayout from "@/layouts/default";

// Enhanced mock battle data
const mockBattles = [
  {
    id: 1,
    type: "ranked",
    timeLeft: 285, // 4:45
    pot: 1250,
    votes: 47,
    spectators: 89,
    battleRound: "Quarter Finals",
    pet1: {
      id: 1,
      avatar: "🐕",
      name: "CryptoWoof",
      owner: "memekingeth",
      level: 12,
      rank: "Meme Lord",
      wins: 89,
      winRate: 78,
      power: 1340,
      votes: 28,
      supporters: ["🔥", "💪", "👑"],
      stats: { strength: 85, agility: 92, charm: 88 },
      streak: 5,
      badges: ["👑", "💎", "🔥"],
    },
    pet2: {
      id: 2,
      avatar: "🐱",
      name: "WhiskerMoon",
      owner: "catdaddy.eth",
      level: 10,
      rank: "Meme Noble",
      wins: 72,
      winRate: 71,
      power: 1180,
      votes: 19,
      supporters: ["✨", "🌙", "💫"],
      stats: { strength: 75, agility: 95, charm: 91 },
      streak: 3,
      badges: ["✨", "🎭", "💫"],
    },
    status: "active",
    intensity: "high",
  },
  {
    id: 2,
    type: "casual",
    timeLeft: 156, // 2:36
    pot: 680,
    votes: 23,
    spectators: 34,
    battleRound: "Friendly Match",
    pet1: {
      id: 3,
      avatar: "🦊",
      name: "FoxyFlex",
      owner: "cleverfox",
      level: 9,
      rank: "Meme Knight",
      wins: 64,
      winRate: 69,
      power: 980,
      votes: 15,
      supporters: ["🦊", "⚡", "🎯"],
      stats: { strength: 82, agility: 89, charm: 74 },
      streak: 2,
      badges: ["🏆", "⚡", "🎯"],
    },
    pet2: {
      id: 4,
      avatar: "🐸",
      name: "PepePrime",
      owner: "frogmaster",
      level: 8,
      rank: "Meme Warrior",
      wins: 58,
      winRate: 66,
      power: 890,
      votes: 8,
      supporters: ["🐸", "💚", "🌟"],
      stats: { strength: 78, agility: 71, charm: 85 },
      streak: 1,
      badges: ["🐸", "💚", "🌟"],
    },
    status: "active",
    intensity: "medium",
  },
  {
    id: 3,
    type: "tournament",
    timeLeft: 420, // 7:00
    pot: 2100,
    votes: 78,
    spectators: 156,
    battleRound: "Semi Finals",
    pet1: {
      id: 5,
      avatar: "🦄",
      name: "UniMagic",
      owner: "rainbowrider",
      level: 11,
      rank: "Meme Noble",
      wins: 67,
      winRate: 74,
      power: 1290,
      votes: 45,
      supporters: ["🌈", "✨", "🦄"],
      stats: { strength: 79, agility: 88, charm: 96 },
      streak: 4,
      badges: ["🌈", "✨", "🦄"],
    },
    pet2: {
      id: 6,
      avatar: "🐲",
      name: "DragonDoge",
      owner: "firebreather",
      level: 13,
      rank: "Meme Lord",
      wins: 94,
      winRate: 81,
      power: 1480,
      votes: 33,
      supporters: ["🐲", "🔥", "⚔️"],
      stats: { strength: 94, agility: 86, charm: 77 },
      streak: 7,
      badges: ["🐲", "🔥", "⚔️"],
    },
    status: "starting_soon",
    intensity: "extreme",
  },
  {
    id: 4,
    type: "ranked",
    timeLeft: 320, // 5:20
    pot: 950,
    votes: 35,
    spectators: 67,
    battleRound: "Elite Match",
    pet1: {
      id: 7,
      avatar: "🐺",
      name: "WolfPack",
      owner: "alphatrader",
      level: 10,
      rank: "Meme Noble",
      wins: 55,
      winRate: 73,
      power: 1150,
      votes: 22,
      supporters: ["🐺", "🌙", "⚔️"],
      stats: { strength: 88, agility: 85, charm: 80 },
      streak: 3,
      badges: ["🐺", "🌙", "⚔️"],
    },
    pet2: {
      id: 8,
      avatar: "🐼",
      name: "PandaPower",
      owner: "bamboolover",
      level: 9,
      rank: "Meme Knight",
      wins: 41,
      winRate: 68,
      power: 1020,
      votes: 13,
      supporters: ["🐼", "🎋", "💚"],
      stats: { strength: 76, agility: 90, charm: 92 },
      streak: 2,
      badges: ["🐼", "🎋", "💚"],
    },
    status: "active",
    intensity: "high",
  },
];

const BattlePage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [userBalance] = useState(5000);

  // Modal states
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showCreateBattle, setShowCreateBattle] = useState(false);
  const [showSpectateModal, setShowSpectateModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [voteAmount, setVoteAmount] = useState("");

  useEffect(() => {
    setIsLoaded(true);

    // Auto-refresh battle data every 10 seconds
    const interval = setInterval(() => {
      if (autoRefresh) {
        // Simulate battle updates
        console.log("Refreshing battle data...");
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleVote = (battle, pet) => {
    setSelectedBattle(battle);
    setSelectedPet(pet);
    setShowVoteModal(true);
  };

  const handleSpectate = (battle) => {
    setSelectedBattle(battle);
    setShowSpectateModal(true);
  };

  const handleStats = (battle) => {
    setSelectedBattle(battle);
    setShowStatsModal(true);
  };

  const handleSubmitVote = () => {
    if (voteAmount && selectedPet && selectedBattle) {
      console.log(
        `Voting ${voteAmount} $GUI for ${selectedPet.name} in battle ${selectedBattle.id}`
      );
      // Handle successful vote submission
      setShowVoteModal(false);
      setVoteAmount("");
      setSelectedPet(null);
      setSelectedBattle(null);
    }
  };

  const filteredBattles =
    activeFilter === "all"
      ? mockBattles
      : mockBattles.filter((battle) => battle.type === activeFilter);

  return (
    <DefaultLayout showSidebar={true}>
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-50 to-yellow-100 dark:from-red-900 dark:via-gray-900 dark:to-orange-900 p-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Battle Header Component */}
          <BattleHeader
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            autoRefresh={autoRefresh}
            setAutoRefresh={setAutoRefresh}
            setShowCreateBattle={setShowCreateBattle}
            mockBattles={mockBattles}
            isLoaded={isLoaded}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Battle Cards */}
            <div className="xl:col-span-2 space-y-6">
              {filteredBattles.map((battle, index) => (
                <BattleCard
                  key={battle.id}
                  battle={battle}
                  index={index}
                  isLoaded={isLoaded}
                  handleVote={handleVote}
                  handleSpectate={handleSpectate}
                  handleStats={handleStats}
                />
              ))}

              {/* No Battles State */}
              {filteredBattles.length === 0 && (
                <div
                  className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-12 text-center shadow-2xl border border-white/20 transition-all duration-700 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                >
                  <div className="text-8xl mb-6">⚔️</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    No {activeFilter === "all" ? "" : activeFilter} battles
                    right now
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Be the first to start an epic battle in the arena!
                  </p>
                  <button
                    onClick={() => setShowCreateBattle(true)}
                    className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Create Battle
                  </button>
                </div>
              )}

              {/* Enter Battle CTA */}
              <div
                className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 text-center shadow-2xl border border-white/20 relative overflow-hidden transition-all duration-700 delay-600 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-red-400/10 animate-pulse rounded-3xl" />

                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl">
                    <span className="text-3xl animate-bounce">⚔️</span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Ready to Join the Battle?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Create your meme pet warrior and compete for $GUI glory in
                    the ultimate battle arena!
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => setShowCreateBattle(true)}
                      className="bg-gradient-to-r from-red-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2 group"
                    >
                      <span className="text-xl">🚀</span>
                      <span>Enter Arena</span>
                      <span className="text-xl group-hover:animate-bounce">
                        ⚔️
                      </span>
                    </button>

                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2">
                      <span className="text-xl">📚</span>
                      <span>Learn Rules</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Battle Stats */}
            <div className="xl:col-span-1">
              <BattleStats battles={filteredBattles} isLoaded={isLoaded} />
            </div>
          </div>

          {/* Battle Modals */}
          <BattleModals
            showVoteModal={showVoteModal}
            setShowVoteModal={setShowVoteModal}
            showCreateBattle={showCreateBattle}
            setShowCreateBattle={setShowCreateBattle}
            showSpectateModal={showSpectateModal}
            setShowSpectateModal={setShowSpectateModal}
            showStatsModal={showStatsModal}
            setShowStatsModal={setShowStatsModal}
            selectedBattle={selectedBattle}
            selectedPet={selectedPet}
            voteAmount={voteAmount}
            setVoteAmount={setVoteAmount}
            handleSubmitVote={handleSubmitVote}
            userBalance={userBalance}
          />
        </div>

        {/* Background Animations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-300/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-orange-300/20 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-2000" />
          <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-red-300/20 rounded-full blur-xl animate-pulse delay-3000" />
        </div>

        {/* Custom CSS for marquee animation */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
          .shadow-3xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
          }
        `}</style>
      </div>
    </DefaultLayout>
  );
};

export default BattlePage;
