import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  Progress,

  Chip,
  Image,
} from "@heroui/react";
import {
  Trophy,
  Coins,
  Zap,
  Crown,
  Rocket,
  Heart,
  TrendingUp,
  Shield,
  Gamepad2,
  Sparkles,
} from "lucide-react";
import DefaultLayout from "@/layouts/default";
import { useNavigate } from "react-router-dom";

const MemePetLeagueLanding = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Adopt Your Meme Pet",
      description:
        "Choose your digital meme pet and start nurturing it with $GUI. Each action—feeding, styling, or evolving—costs tokens, making your pet stronger and more meme-worthy.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Flex It. Tip It. Rank It.",
      description:
        "Join public flex-offs where users tip their favorite meme pets with $GUI to boost their visibility and meme rank. The more you're tipped, the higher your pet climbs the leaderboard.",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Compete in Meme Leagues",
      description:
        "Enter seasonal meme battles judged by the community. Winners take home $GUI prizes, social clout, and bragging rights.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Vote with Your Tokens",
      description:
        "Use staked $GUI to vote on how pets evolve, what contests run next, and what traits get featured. This is DAO culture meets meme evolution.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Unlock AI Add-ons",
      description:
        "Want your pet to talk, meme, or write posts? Use $GUI to activate AI-generated personality packs for your pet.",
    },
  ];

  const coreFeatures = [
    {
      icon: <Crown className="w-5 h-5" />,
      text: "Meme Pet NFTs",
      desc: "Unique evolving meme avatars",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Tipping Battles",
      desc: "Compete socially for leaderboard clout",
    },
    {
      icon: <Coins className="w-5 h-5" />,
      text: "$GUI Staking DAO",
      desc: "Token-holders control evolution & rules",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      text: "Seasonal Meme Leagues",
      desc: "Ongoing contests with real rewards",
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      text: "AI Meme Personalities",
      desc: "Optional upgrades that make your pet talk back",
    },
  ];

  return (
    <DefaultLayout showSidebar={false}>
      <>
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-screen max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 ">
            <div className="flex flex-col justify-center md:col-span-3">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 flex flex-col items-center md:items-start">
                <div className="flex items-center mb-2">
                 
                  <span className="md:text-8xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Welcome to
                  </span>
                </div>
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent text-center md:text-left">
                  Meme Pet League
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto md:mx-0 leading-relaxed text-center md:text-left">
                The Viral Social Arena Where{" "}
                <span className="text-yellow-500 dark:text-yellow-400 font-bold">
                  $GUI
                </span>{" "}
                Becomes Your Meme Pet's Power Source. it’s a decentralized
                playground where every meme is powered
                by $GUI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-12">
                <Button
                  size="lg" onPress={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 dark:from-pink-400 dark:to-purple-500 hover:from-pink-600 hover:to-purple-700 dark:hover:from-pink-500 dark:hover:to-purple-600 text-white font-bold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Start
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-2 border-purple-500 dark:border-purple-400 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-400/10 font-bold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center items-center md:col-span-2">
              <Image
                src="https://i.giphy.com/ykvRcYBJBiQwg.webp"
                width={300}
                alt="kk"
              />
            </div>
          </div>

          <div className="max-w-6xl mx-auto text-center">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto px-4">
              <Card className="backdrop-blur-lg border border-white/10 dark:bg-gray-800/50 bg-white/80 transition-all duration-300 hover:scale-105">
                <CardBody className="text-center py-6">
                  <div className="text-3xl font-bold text-pink-400 dark:text-pink-300 mb-2">
                    10K+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Active Pets
                  </div>
                </CardBody>
              </Card>
              <Card className="backdrop-blur-lg border border-white/10 dark:bg-gray-800/50 bg-white/80 transition-all duration-300 hover:scale-105">
                <CardBody className="text-center py-6">
                  <div className="text-3xl font-bold text-purple-400 dark:text-purple-300 mb-2">
                    50K+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    $GUI Staked
                  </div>
                </CardBody>
              </Card>
              <Card className="backdrop-blur-lg border border-white/10 dark:bg-gray-800/50 bg-white/80 transition-all duration-300 hover:scale-105">
                <CardBody className="text-center py-6">
                  <div className="text-3xl font-bold text-blue-400 dark:text-blue-300 mb-2">
                    1000+
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    Daily Battles
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* What is Meme Pet League */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400 ">
                🌐 What is Meme Pet League?
              </h2>
              <div className="max-w-4xl mx-auto">
                <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-lg border border-white/10">
                  <CardBody className="p-8">
                    <p className="text-lg text-gray-200 leading-relaxed mb-6">
                      Meme Pet League is a social-first, blockchain-powered game
                      where users raise, evolve, and flex unique meme pets by
                      spending and staking $GUI. Built for the GUI INU
                      community, it's a decentralized playground where every pet
                      is a meme, and every meme is powered by $GUI.
                    </p>
                    <p className="text-xl font-semibold text-purple-300">
                      Think of it as{" "}
                      <span className="text-pink-400">Tamagotchi</span> meets{" "}
                      <span className="text-blue-400">social tokens</span>,
                      governed by a <span className="text-yellow-400">DAO</span>{" "}
                      and fueled by{" "}
                      <span className="text-green-400">internet culture</span>.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-green-400 ">
                🧩 How It Works
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      activeFeature === index
                        ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-400/50 dark:from-purple-400/20 dark:to-pink-400/20"
                        : "bg-white/80 hover:bg-white/90 dark:bg-gray-800/50 dark:hover:bg-gray-800/70 border-gray-200/50 dark:border-white/10"
                    } backdrop-blur-lg border`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <CardBody className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`p-3 rounded-xl ${
                            activeFeature === index
                              ? "bg-purple-500 dark:bg-purple-400"
                              : "bg-gray-200 dark:bg-gray-700"
                          } transition-colors duration-300`}
                        >
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                        <div
                          className={`text-2xl font-bold ${
                            activeFeature === index
                              ? "text-purple-500 dark:text-purple-400"
                              : "text-gray-400 dark:text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-lg border border-purple-400/30">
                  <CardBody className="p-8 text-center">
                    <div className="text-6xl mb-6 animate-bounce">
                      {activeFeature === 0 && "🐕"}
                      {activeFeature === 1 && "⚡"}
                      {activeFeature === 2 && "🏆"}
                      {activeFeature === 3 && "🗳️"}
                      {activeFeature === 4 && "🤖"}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-purple-200">
                      {features[activeFeature].title}
                    </h3>
                    <Progress
                      value={(activeFeature + 1) * 20}
                      className="mb-4"
                      color="secondary"
                    />
                    <p className="text-gray-300">
                      Step {activeFeature + 1} of 5
                    </p>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* $GUI Utility Loop */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r text-orange-400 ">
                💸 The $GUI Utility Loop
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white/80 dark:bg-gradient-to-br dark:from-red-600/20 dark:to-pink-600/20 backdrop-blur-lg border border-red-200 dark:border-red-400/30 hover:scale-105 transition-all duration-300">
                <CardBody className="p-6 text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-bold mb-3 text-red-500 dark:text-red-300">
                    Spend
                  </h3>
                  <p className="text-sm text-default-600 dark:text-default-300">
                    Feed, evolve, style, and compete
                  </p>
                </CardBody>
              </Card>

              <Card className="bg-white/80 dark:bg-gradient-to-br dark:from-green-600/20 dark:to-emerald-600/20 backdrop-blur-lg border border-green-200 dark:border-green-400/30 hover:scale-105 transition-all duration-300">
                <CardBody className="p-6 text-center">
                  <div className="text-4xl mb-4">💎</div>
                  <h3 className="text-xl font-bold mb-3 text-green-500 dark:text-green-300">
                    Earn
                  </h3>
                  <p className="text-sm text-default-600 dark:text-default-300">
                    Win leagues, get tips, gain seasonal rewards
                  </p>
                </CardBody>
              </Card>

              <Card className="bg-white/80 dark:bg-gradient-to-br dark:from-blue-600/20 dark:to-cyan-600/20 backdrop-blur-lg border border-blue-200 dark:border-blue-400/30 hover:scale-105 transition-all duration-300">
                <CardBody className="p-6 text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold mb-3 text-blue-500 dark:text-blue-300">
                    Stake
                  </h3>
                  <p className="text-sm text-default-600 dark:text-default-300">
                    Vote on rules, new features, and community lore
                  </p>
                </CardBody>
              </Card>

              <Card className="bg-white/80 dark:bg-gradient-to-br dark:from-purple-600/20 dark:to-indigo-600/20 backdrop-blur-lg border border-purple-200 dark:border-purple-400/30 hover:scale-105 transition-all duration-300">
                <CardBody className="p-6 text-center">
                  <div className="text-4xl mb-4">🔥</div>
                  <h3 className="text-xl font-bold mb-3 text-purple-500 dark:text-purple-300">
                    Burn
                  </h3>
                  <p className="text-sm text-default-600 dark:text-default-300">
                    Every action is a deflationary interaction
                  </p>
                </CardBody>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-lg border border-white/10 max-w-2xl mx-auto">
                <CardBody className="p-6">
                  <p className="text-lg font-semibold text-purple-200">
                    Meme Pet League isn't just play—it's{" "}
                    <span className="text-yellow-400">
                      participation in the $GUI culture economy.
                    </span>
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r text-purple-400 ">
                🎮 Core Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300"
                >
                  <CardBody className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2 text-gray-500">
                          {feature.text}
                        </h3>
                        <p className="text-sm text-gray-300">{feature.desc}</p>
                      </div>
                    </div>
                    <Chip
                      className="mt-4 bg-green-500/20 text-green-300"
                      size="sm"
                    >
                      ✅ Available
                    </Chip>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Who's It For */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r text-cyan-400 ">
                👥 Who's It For?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "💎",
                  title: "$GUI holders",
                  desc: "who want more utility",
                },
                {
                  icon: "🌐",
                  title: "Crypto communities",
                  desc: "seeking cultural expression",
                },
                {
                  icon: "🖼️",
                  title: "NFT lovers",
                  desc: "who miss real social interaction",
                },
                {
                  icon: "🎭",
                  title: "Meme creators",
                  desc: "looking for new stages to shine",
                },
                {
                  icon: "🚀",
                  title: "Web3 social platforms",
                  desc: "seeking integration",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-lg border border-indigo-400/30 hover:scale-105 transition-transform duration-300"
                >
                  <CardBody className="p-6 text-center">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-indigo-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-blue-900/50 backdrop-blur-lg border border-purple-400/30">
              <CardBody className="p-12">
                <div className="text-6xl mb-6">🏆</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-yellow-400 ">
                  🎯 Ready to Join the League?
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
                  <div>🔥 Raise a pet</div>
                  <div>💬 Join the flex</div>
                  <div>🗳️ Shape the culture</div>
                  <div>🎁 Win real $GUI</div>
                </div>

                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-bold px-12 py-6 text-xl transform hover:scale-110 transition-all duration-300 shadow-2xl"
                >
                  <Gamepad2 className="w-6 h-6 mr-3" />
                  Start Your Pet Journey Now
                </Button>

                <p className="text-sm text-gray-400 mt-6">
                  Built for the GUI INU Ideathon • Join the meme revolution
                </p>
              </CardBody>
            </Card>
          </div>
        </section>
      </>
    </DefaultLayout>
  );
};

export default MemePetLeagueLanding;
