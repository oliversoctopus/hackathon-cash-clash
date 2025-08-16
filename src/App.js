import React, { useState, useEffect } from 'react';
import { ChevronRight, Trophy, Users, TrendingUp, DollarSign, Target, Zap, Home, Gamepad2, User } from 'lucide-react';

// Main App Component with Navigation
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userScore, setUserScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Mock user data - in production, this would come from a backend
  const [userData, setUserData] = useState({
    username: 'Player1',
    totalXP: 0,
    level: 1,
    streakDays: 0,
    friendSquads: ['Squad Alpha', 'Teen Investors'],
  });

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'budget', label: 'Budget Builder', icon: DollarSign },
    { id: 'moneymatch', label: 'Money Match', icon: Target },
    { id: 'investing', label: 'Invest Sim', icon: TrendingUp },
    { id: 'social', label: 'Squads', icon: Users },
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage userData={userData} setCurrentPage={setCurrentPage} />;
      case 'budget':
        return <BudgetBuilderGame userData={userData} setUserData={setUserData} />;
      case 'moneymatch':
        return <MoneyMatchGame userData={userData} setUserData={setUserData} />;
      case 'investing':
        return <InvestingGame userData={userData} setUserData={setUserData} />;
      case 'social':
        return <SocialPage userData={userData} />;
      default:
        return <HomePage userData={userData} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-teal-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-700">FinLit Champions</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="font-semibold">{userData.streakDays} day streak</span>
            </div>
            <div className="bg-teal-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium">Level {userData.level}</span>
            </div>
            <div className="bg-purple-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium">{userData.totalXP} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-1">
            {navigation.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors ${
                    currentPage === item.id 
                      ? 'text-teal-600 border-b-2 border-teal-600' 
                      : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
}

// Home Page Component
function HomePage({ userData, setCurrentPage }) {
  const games = [
    {
      id: 'budget',
      title: 'Budget Builder Challenge',
      description: 'Master the art of budgeting with real-world scenarios',
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      id: 'moneymatch',
      title: 'Money Match',
      description: 'Swipe your way to better financial decisions',
      icon: Target,
      color: 'bg-blue-500',
    },
    {
      id: 'investing',
      title: 'Investment Simulator',
      description: 'Learn investing through a 50-year journey',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome back, {userData.username}! 🚀
        </h2>
        <p className="text-gray-600 mb-6">
          Ready to level up your financial skills? Choose a game to start earning XP!
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Today's Goal</p>
            <p className="text-2xl font-bold text-teal-700">Complete 3 games</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Squad Rank</p>
            <p className="text-2xl font-bold text-purple-700">#12</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Global Rank</p>
            <p className="text-2xl font-bold text-orange-700">#156</p>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {games.map(game => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              onClick={() => setCurrentPage(game.id)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className={`${game.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <button className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700">
                Play Now <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Budget Builder Game Component
function BudgetBuilderGame({ userData, setUserData }) {
  const [gameState, setGameState] = useState('ready');
  const [budget, setBudget] = useState(3000);
  const [allocations, setAllocations] = useState({
    rent: 0,
    food: 0,
    transportation: 0,
    entertainment: 0,
    savings: 0,
  });
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);

  const categories = [
    { id: 'rent', label: 'Rent/Housing', recommended: 900, icon: '🏠' },
    { id: 'food', label: 'Food & Groceries', recommended: 600, icon: '🍕' },
    { id: 'transportation', label: 'Transportation', recommended: 450, icon: '🚗' },
    { id: 'entertainment', label: 'Entertainment', recommended: 300, icon: '🎮' },
    { id: 'savings', label: 'Savings', recommended: 750, icon: '💰' },
  ];

  const startGame = () => {
    setGameState('playing');
    setTimeLeft(60);
    setAllocations({ rent: 0, food: 0, transportation: 0, entertainment: 0, savings: 0 });
  };

  const handleAllocation = (category, amount) => {
    const newAllocations = { ...allocations };
    newAllocations[category] = Math.max(0, Math.min(budget, amount));
    setAllocations(newAllocations);
  };

  const calculateScore = () => {
    let points = 0;
    categories.forEach(cat => {
      const diff = Math.abs(allocations[cat.id] - cat.recommended);
      points += Math.max(0, 100 - diff / 10);
    });
    
    // Bonus for savings
    if (allocations.savings >= 750) points += 200;
    
    return Math.round(points);
  };

  const submitBudget = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setGameState('complete');
    
    // Update user data
    setUserData(prev => ({
      ...prev,
      totalXP: prev.totalXP + finalScore,
      level: Math.floor((prev.totalXP + finalScore) / 1000) + 1,
    }));
  };

  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);
  const remaining = budget - totalAllocated;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Budget Builder Challenge</h2>
      
      {gameState === 'ready' && (
        <div className="text-center py-12">
          <h3 className="text-2xl mb-4">Ready to Budget?</h3>
          <p className="text-gray-600 mb-8">
            You have $3,000 monthly income. Allocate it wisely across different categories!
          </p>
          <button
            onClick={startGame}
            className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700"
          >
            Start Challenge
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div>
          <div className="flex justify-between mb-6">
            <div className="text-lg">
              <span className="font-semibold">Budget:</span> ${budget}
            </div>
            <div className={`text-lg font-semibold ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
              Remaining: ${remaining}
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {categories.map(cat => (
              <div key={cat.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium flex items-center gap-2">
                    <span className="text-2xl">{cat.icon}</span>
                    {cat.label}
                  </span>
                  <span className="text-sm text-gray-500">Recommended: ${cat.recommended}</span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max={budget}
                    value={allocations[cat.id]}
                    onChange={(e) => handleAllocation(cat.id, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <input
                    type="number"
                    value={allocations[cat.id]}
                    onChange={(e) => handleAllocation(cat.id, parseInt(e.target.value) || 0)}
                    className="w-24 px-2 py-1 border rounded"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={submitBudget}
            disabled={remaining !== 0}
            className={`w-full py-3 rounded-lg font-semibold ${
              remaining === 0 
                ? 'bg-teal-600 text-white hover:bg-teal-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {remaining === 0 ? 'Submit Budget' : `Balance your budget (${remaining > 0 ? '+' : ''}$${remaining})`}
          </button>
        </div>
      )}

      {gameState === 'complete' && (
        <div className="text-center py-12">
          <h3 className="text-3xl font-bold mb-4">Great Job! 🎉</h3>
          <p className="text-5xl font-bold text-teal-600 mb-4">{score} XP</p>
          <p className="text-gray-600 mb-8">
            You've earned {score} experience points for your budgeting skills!
          </p>
          <button
            onClick={startGame}
            className="bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

// Money Match Game Component
function MoneyMatchGame({ userData, setUserData }) {
  const [currentCard, setCurrentCard] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const scenarios = [
    {
      id: 1,
      scenario: "Buy the latest iPhone on a payment plan",
      isGood: false,
      explanation: "Payment plans can lead to overspending and debt. Save up and buy it outright instead!"
    },
    {
      id: 2,
      scenario: "Start an emergency fund with $20/month",
      isGood: true,
      explanation: "Great choice! Even small amounts add up. Emergency funds protect you from unexpected expenses."
    },
    {
      id: 3,
      scenario: "Invest in your friend's 'guaranteed' crypto scheme",
      isGood: false,
      explanation: "If it sounds too good to be true, it probably is. Never invest in unregulated schemes."
    },
    {
      id: 4,
      scenario: "Open a high-yield savings account",
      isGood: true,
      explanation: "Smart move! High-yield accounts help your money grow faster than regular savings."
    },
    {
      id: 5,
      scenario: "Max out credit card for spring break trip",
      isGood: false,
      explanation: "Credit card debt has high interest rates. Save up for trips to avoid financial stress."
    },
  ];

  const handleSwipe = (direction) => {
    const current = scenarios[currentCard];
    const correct = (direction === 'right' && current.isGood) || (direction === 'left' && !current.isGood);
    
    if (correct) {
      setScore(score + 100);
    }

    if (currentCard < scenarios.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setGameComplete(true);
      setUserData(prev => ({
        ...prev,
        totalXP: prev.totalXP + score + (correct ? 100 : 0),
      }));
    }
  };

  const resetGame = () => {
    setCurrentCard(0);
    setScore(0);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Game Complete! 🎉</h2>
        <p className="text-5xl font-bold text-purple-600 mb-4">{score} XP</p>
        <p className="text-gray-600 mb-8">
          You've mastered financial decision-making!
        </p>
        <button
          onClick={resetGame}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Money Match</h2>
      
      <div className="mb-4 flex justify-between">
        <span className="text-lg font-semibold">Score: {score}</span>
        <span className="text-lg">{currentCard + 1} / {scenarios.length}</span>
      </div>

      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8 mb-8 min-h-[200px] flex items-center justify-center">
        <p className="text-xl text-center font-medium">
          {scenarios[currentCard].scenario}
        </p>
      </div>

      <div className="flex justify-center gap-8">
        <button
          onClick={() => handleSwipe('left')}
          className="bg-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-600 flex items-center gap-2"
        >
          ❌ Bad Choice
        </button>
        <button
          onClick={() => handleSwipe('right')}
          className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 flex items-center gap-2"
        >
          ✅ Good Choice
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Tip:</strong> {scenarios[currentCard].explanation}
        </p>
      </div>
    </div>
  );
}

// Investing Game Component
function InvestingGame({ userData, setUserData }) {
  const [year, setYear] = useState(0);
  const [principal, setPrincipal] = useState(1000);
  const [portfolio, setPortfolio] = useState({
    bank: 0,
    index: 0,
    risky: 0,
  });
  const [history, setHistory] = useState([]);
  const [gameState, setGameState] = useState('setup');

  const investments = [
    { id: 'bank', name: 'Savings Account', rate: 0.02, risk: 'No risk', color: 'bg-green-500' },
    { id: 'index', name: 'Index Fund', rate: 0.08, risk: 'Moderate risk', color: 'bg-blue-500' },
    { id: 'risky', name: 'Growth Stocks', rate: 0.15, risk: 'High risk', color: 'bg-red-500' },
  ];

  const allocateFunds = (type, amount) => {
    const total = Object.values(portfolio).reduce((a, b) => a + b, 0) - portfolio[type] + amount;
    if (total <= principal) {
      setPortfolio(prev => ({ ...prev, [type]: amount }));
    }
  };

  const simulateYear = () => {
    const newPortfolio = { ...portfolio };
    
    // Apply returns with some randomness
    newPortfolio.bank *= 1.02;
    newPortfolio.index *= (1 + (0.08 + (Math.random() - 0.5) * 0.1));
    newPortfolio.risky *= (1 + (0.15 + (Math.random() - 0.5) * 0.3));

    setPortfolio(newPortfolio);
    setYear(year + 1);
    
    const total = Object.values(newPortfolio).reduce((a, b) => a + b, 0);
    setHistory([...history, { year: year + 1, total }]);
  };

  const startSimulation = () => {
    if (Object.values(portfolio).reduce((a, b) => a + b, 0) === principal) {
      setGameState('running');
      setHistory([{ year: 0, total: principal }]);
    }
  };

  const totalValue = Object.values(portfolio).reduce((a, b) => a + b, 0);
  const totalAllocated = gameState === 'setup' ? totalValue : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Investment Simulator</h2>
      
      {gameState === 'setup' && (
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Allocate Your $1,000</h3>
            <p className="text-gray-600">Choose how to invest your money across different risk levels</p>
          </div>

          <div className="space-y-4 mb-6">
            {investments.map(inv => (
              <div key={inv.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">{inv.name}</span>
                    <span className="ml-2 text-sm text-gray-500">({inv.rate * 100}% avg return)</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs text-white ${inv.color}`}>
                    {inv.risk}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max={principal}
                    value={portfolio[inv.id]}
                    onChange={(e) => allocateFunds(inv.id, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-20 text-right">${portfolio[inv.id]}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6 text-center">
            <p className="text-lg">
              Allocated: ${totalAllocated} / $1,000
            </p>
          </div>

          <button
            onClick={startSimulation}
            disabled={totalAllocated !== principal}
            className={`w-full py-3 rounded-lg font-semibold ${
              totalAllocated === principal
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Start Simulation
          </button>
        </div>
      )}

      {gameState === 'running' && (
        <div>
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Year {year}</p>
                <p className="text-3xl font-bold">${Math.round(totalValue)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Growth</p>
                <p className={`text-2xl font-bold ${totalValue > principal ? 'text-green-600' : 'text-red-600'}`}>
                  {((totalValue / principal - 1) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {investments.map(inv => (
              <div key={inv.id} className="flex justify-between p-2 bg-gray-50 rounded">
                <span>{inv.name}</span>
                <span className="font-semibold">${Math.round(portfolio[inv.id])}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={simulateYear}
              disabled={year >= 50}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
            >
              Simulate Next Year
            </button>
            <button
              onClick={() => {
                for(let i = 0; i < 5; i++) {
                  if (year < 50) simulateYear();
                }
              }}
              disabled={year >= 50}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Skip 5 Years
            </button>
          </div>

          {year >= 50 && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
              <p className="text-lg font-semibold text-green-800">
                Simulation Complete! Your $1,000 grew to ${Math.round(totalValue)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Social Page Component
function SocialPage({ userData }) {
  const friendGroups = [
    { name: 'Squad Alpha', members: 12, yourRank: 3, topScore: 15420 },
    { name: 'Teen Investors', members: 8, yourRank: 5, topScore: 12300 },
  ];

  const globalLeaderboard = [
    { rank: 1, name: 'Sarah M.', score: 28500, level: 15 },
    { rank: 2, name: 'Mike T.', score: 26100, level: 14 },
    { rank: 3, name: 'Ashley K.', score: 24800, level: 13 },
    { rank: 4, name: 'James L.', score: 23200, level: 12 },
    { rank: 5, name: 'Emma R.', score: 22100, level: 12 },
  ];

  return (
    <div className="space-y-6">
      {/* Friend Groups */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Money Squads</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {friendGroups.map(group => (
            <div key={group.name} className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">{group.name}</h3>
              <div className="space-y-1 text-sm">
                <p>Members: {group.members}</p>
                <p>Your Rank: #{group.yourRank}</p>
                <p>Top Score: {group.topScore}</p>
              </div>
              <button className="mt-3 text-teal-600 font-semibold text-sm hover:text-teal-700">
                View Squad →
              </button>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700">
          Create New Squad
        </button>
      </div>

      {/* Global Leaderboard */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Global Leaderboard</h2>
        <div className="space-y-2">
          {globalLeaderboard.map(player => (
            <div key={player.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                  player.rank === 1 ? 'bg-yellow-500' :
                  player.rank === 2 ? 'bg-gray-400' :
                  player.rank === 3 ? 'bg-orange-600' :
                  'bg-teal-500'
                }`}>
                  {player.rank}
                </div>
                <div>
                  <p className="font-semibold">{player.name}</p>
                  <p className="text-sm text-gray-500">Level {player.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{player.score.toLocaleString()}</p>
                <p className="text-xs text-gray-500">XP</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-teal-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Your Rank</span>
            <span className="text-xl font-bold text-teal-700">#156</span>
          </div>
        </div>
      </div>
    </div>
  );
}