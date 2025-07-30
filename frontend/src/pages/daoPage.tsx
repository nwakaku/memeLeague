import { useState, useEffect } from "react";
import {
  Vote,
  Clock,
  Users,
  ChevronRight,
  Flame,
} from "lucide-react";
import DefaultLayout from "@/layouts/default";

// Mock proposals data
const mockProposals = [
  {
    id: 1,
    title: "🚀 Add 'Laser Eyes' Trait to All Pet Classes",
    description:
      "Introduce the legendary Laser Eyes trait that increases battle power by 15% and adds epic visual effects during combat. This trait would be available through special evolution paths.",
    category: "Pet Enhancement",
    author: "memekingeth",
    createdAt: "2025-01-20",
    endsAt: "2025-01-27",
    timeLeft: 86400, // 1 day in seconds
    votes: { yes: 1247, no: 342 },
    totalVoters: 1589,
    stakeRequired: 100,
    quorum: 2000,
    status: "active",
    tags: ["enhancement", "traits", "combat"],
    discussionCount: 89,
    impact: "high",
    trending: true,
  },
  {
    id: 2,
    title: "🌟 New Pet Class: Astro Cats from Space",
    description:
      "Launch a new premium pet class featuring cosmic felines with unique space-themed abilities, star-dust evolution materials, and exclusive galactic battle arenas.",
    category: "New Content",
    author: "spacecatdao",
    createdAt: "2025-01-18",
    endsAt: "2025-01-25",
    timeLeft: 172800, // 2 days
    votes: { yes: 2134, no: 567 },
    totalVoters: 2701,
    stakeRequired: 250,
    quorum: 3000,
    status: "active",
    tags: ["new-class", "premium", "space"],
    discussionCount: 156,
    impact: "major",
    trending: true,
  },
  {
    id: 3,
    title: "⚡ Reduce Battle Cooldown from 6h to 4h",
    description:
      "Speed up the battle system by reducing cooldown periods, allowing more frequent battles and increased $GUI earning opportunities for active players.",
    category: "Game Balance",
    author: "battlemaster.eth",
    createdAt: "2025-01-15",
    endsAt: "2025-01-29",
    timeLeft: 345600, // 4 days
    votes: { yes: 892, no: 1204 },
    totalVoters: 2096,
    stakeRequired: 50,
    quorum: 2500,
    status: "active",
    tags: ["balance", "battles", "economy"],
    discussionCount: 203,
    impact: "medium",
    trending: false,
  },
  {
    id: 4,
    title: "🎭 Monthly Meme Contest with 10K $GUI Prize",
    description:
      "Establish a monthly community meme contest where pet owners submit original memes featuring their pets, with winners receiving $GUI rewards and exclusive badges.",
    category: "Community",
    author: "mememaster",
    createdAt: "2025-01-22",
    endsAt: "2025-01-30",
    timeLeft: 518400, // 6 days
    votes: { yes: 1756, no: 234 },
    totalVoters: 1990,
    stakeRequired: 75,
    quorum: 2200,
    status: "active",
    tags: ["community", "contests", "rewards"],
    discussionCount: 67,
    impact: "medium",
    trending: false,
  },
];

// Mock past proposals
const pastProposals = [
  {
    id: 101,
    title: "🔥 Double XP Weekend Events",
    votes: { yes: 3245, no: 456 },
    outcome: "passed",
    implementedAt: "2025-01-10",
    category: "Events",
  },
  {
    id: 102,
    title: "💎 Premium Pet Breeding System",
    votes: { yes: 1234, no: 2876 },
    outcome: "rejected",
    implementedAt: "2025-01-05",
    category: "Features",
  },
  {
    id: 103,
    title: "🏆 Seasonal Championship Tournaments",
    votes: { yes: 4567, no: 234 },
    outcome: "passed",
    implementedAt: "2024-12-20",
    category: "Tournaments",
  },
];

// Mock user governance stats
const userStats = {
  totalVotes: 23,
  proposalsCreated: 2,
  govPower: 1250,
  badges: ["🗳️", "👑", "🔥"],
  rank: "DAO Legend",
  streak: 8,
};

const DAOPage = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [voteChoice, setVoteChoice] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [sortBy, setSortBy] = useState("trending");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const formatTimeLeft = (seconds) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "from-green-500 to-emerald-600";
      case "passing":
        return "from-blue-500 to-indigo-600";
      case "failing":
        return "from-red-500 to-rose-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case "high":
        return "🚀";
      case "major":
        return "💫";
      case "medium":
        return "⚡";
      default:
        return "📝";
    }
  };

  const handleVote = (proposal, choice) => {
    setSelectedProposal(proposal);
    setVoteChoice(choice);
    setShowVoteModal(true);
  };

  const filteredProposals = mockProposals.filter((proposal) => {
    if (filterCategory === "all") return true;
    return proposal.category
      .toLowerCase()
      .includes(filterCategory.toLowerCase());
  });

  return (
    <DefaultLayout showSidebar={true}>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:from-indigo-900 dark:via-gray-900 dark:to-purple-900 p-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div
            className={`transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 mb-8 text-center shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-indigo-400/10 animate-pulse rounded-3xl" />

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                  <Vote size={32} className="text-white" />
                </div>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                  🗳️ League Governance
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto mb-6">
                  Shape the future of Meme Pet League! Your voice matters in
                  building the ultimate meme-gaming experience.
                </p>

                {/* User Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl p-4">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {userStats.totalVotes}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Total Votes
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {userStats.govPower}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Gov Power
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {userStats.streak}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Vote Streak
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4">
                    <div className="text-xl text-yellow-600 dark:text-yellow-400">
                      {userStats.badges.join("")}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {userStats.rank}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            className={`transition-all duration-700 delay-200 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-2 mb-8 shadow-xl border border-white/20">
              <div className="flex flex-wrap gap-2">
                {["active", "past", "trending"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {tab === "active" && "🔥"} {tab === "past" && "📚"}{" "}
                    {tab === "trending" && "⭐"}
                    {" " + tab.charAt(0).toUpperCase() + tab.slice(1)} Proposals
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div
            className={`transition-all duration-700 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 mb-8 shadow-xl border border-white/20">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white border-0 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="pet enhancement">Pet Enhancement</option>
                    <option value="new content">New Content</option>
                    <option value="game balance">Game Balance</option>
                    <option value="community">Community</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white border-0 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="trending">🔥 Trending</option>
                    <option value="newest">🆕 Newest</option>
                    <option value="ending">⏰ Ending Soon</option>
                    <option value="votes">📊 Most Votes</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Vote size={20} />
                  Create Proposal
                  <span className="text-lg">✨</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Proposals */}
          {activeTab === "active" && (
            <div className="space-y-6">
              {filteredProposals.map((proposal, index) => (
                <div
                  key={proposal.id}
                  className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20 relative overflow-hidden transition-all duration-700 hover:shadow-3xl hover:scale-[1.02] ${
                    proposal.trending ? "ring-2 ring-yellow-400/50" : ""
                  } ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  {/* Trending Badge */}
                  {proposal.trending && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 animate-pulse">
                      <Flame size={16} />
                      Trending
                    </div>
                  )}

                  {/* Active Status */}
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400 text-sm font-semibold mb-4 border border-green-500/30">
                    <Clock size={16} className="inline mr-2" />
                    {formatTimeLeft(proposal.timeLeft)}
                  </div>

                  {/* Proposal Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg">
                      {getImpactIcon(proposal.impact)}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer">
                        {proposal.title}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                          {proposal.category}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                          {proposal.impact} impact
                        </span>
                        {proposal.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span>by @{proposal.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users size={14} />
                          {proposal.totalVoters} voters
                        </span>
                        <span>•</span>
                        <span>{proposal.discussionCount} comments</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {proposal.description}
                  </p>

                  {/* Voting Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-4">
                        <span className="text-green-600 dark:text-green-400 font-semibold flex items-center gap-2">
                          <span className="text-lg">👍</span>
                          YES: {proposal.votes.yes.toLocaleString()}
                        </span>
                        <span className="text-red-600 dark:text-red-400 font-semibold flex items-center gap-2">
                          <span className="text-lg">👎</span>
                          NO: {proposal.votes.no.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {Math.round(
                          (proposal.totalVoters / proposal.quorum) * 100
                        )}
                        % of quorum
                      </div>
                    </div>

                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <div className="flex h-full">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-1000 ease-out"
                          style={{
                            width: `${(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no)) * 100}%`,
                          }}
                        />
                        <div
                          className="bg-gradient-to-r from-red-500 to-rose-600 transition-all duration-1000 ease-out"
                          style={{
                            width: `${(proposal.votes.no / (proposal.votes.yes + proposal.votes.no)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                      Quorum: {proposal.totalVoters.toLocaleString()} /{" "}
                      {proposal.quorum.toLocaleString()} voters
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleVote(proposal, "yes")}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                    >
                      <span className="text-2xl group-hover:animate-bounce">
                        👍
                      </span>
                      Vote YES
                      <ChevronRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>

                    <button
                      onClick={() => handleVote(proposal, "no")}
                      className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                    >
                      <span className="text-2xl group-hover:animate-bounce">
                        👎
                      </span>
                      Vote NO
                      <ChevronRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>

                    <button className="sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-2xl font-bold hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                      <Users size={20} />
                      Discuss
                    </button>
                  </div>

                  <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 bg-gradient-to-r from-purple-100/50 to-indigo-100/50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-3">
                    💰 Minimum stake required:{" "}
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {proposal.stakeRequired} $GUI
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past Proposals */}
          {activeTab === "past" && (
            <div className="space-y-4">
              {pastProposals.map((proposal, index) => (
                <div
                  key={proposal.id}
                  className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {proposal.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{proposal.category}</span>
                        <span>•</span>
                        <span>{proposal.implementedAt}</span>
                        <span>•</span>
                        <span>
                          {(
                            proposal.votes.yes + proposal.votes.no
                          ).toLocaleString()}{" "}
                          votes
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div
                        className={`px-4 py-2 rounded-full font-semibold ${
                          proposal.outcome === "passed"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                            : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {proposal.outcome === "passed"
                          ? "✅ Passed"
                          : "❌ Rejected"}
                      </div>

                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {Math.round(
                          (proposal.votes.yes /
                            (proposal.votes.yes + proposal.votes.no)) *
                            100
                        )}
                        % YES
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Vote Modal */}
          {showVoteModal && selectedProposal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {voteChoice === "yes" ? "👍 Vote YES" : "👎 Vote NO"}
                </h3>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {selectedProposal.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Minimum stake: {selectedProposal.stakeRequired} $GUI
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Stake Amount ($GUI)
                  </label>
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    min={selectedProposal.stakeRequired}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    placeholder={`Minimum ${selectedProposal.stakeRequired} $GUI`}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowVoteModal(false)}
                    className="flex-1 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    className={`flex-1 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all ${
                      voteChoice === "yes"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600"
                        : "bg-gradient-to-r from-red-500 to-rose-600"
                    }`}
                  >
                    Confirm Vote
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Create Proposal CTA */}
          <div
            className={`transition-all duration-700 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl p-8 text-center shadow-2xl border border-white/20 relative overflow-hidden mt-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-indigo-400/10 animate-pulse rounded-3xl" />

              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                  <span className="text-3xl animate-bounce">💡</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Have a Brilliant Idea?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                  Shape the future of Meme Pet League by creating your own
                  governance proposal!
                </p>

                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-3 mx-auto group"
                >
                  <Vote size={24} />
                  <span>Create New Proposal</span>
                  <span className="text-2xl group-hover:animate-bounce">
                    ✨
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Background Animations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-300/20 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-2000" />
          <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-3000" />
        </div>

        {/* Custom CSS for enhanced animations */}
        <style jsx>{`
          .shadow-3xl {
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
          }

          @keyframes glow {
            0%,
            100% {
              box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
            }
            50% {
              box-shadow: 0 0 40px rgba(168, 85, 247, 0.6);
            }
          }

          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </DefaultLayout>
  );
};

export default DAOPage;