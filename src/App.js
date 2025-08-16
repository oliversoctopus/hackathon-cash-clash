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
          <h1 className="text-2xl font-bold text-teal-700">Cash Clash</h1>
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
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total XP</p>
            <p className="text-2xl font-bold text-blue-700">{userData.totalXP}</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Current Level</p>
            <p className="text-2xl font-bold text-green-700">{userData.level}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Streak Days</p>
            <p className="text-2xl font-bold text-orange-700">{userData.streakDays}</p>
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {games.map(game => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              onClick={() => setCurrentPage(game.id)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className={`${game.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <button className="flex items-center gap-2 text-teal-600 font-semibold">
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
  const [budget, setBudget] = useState(2000);
  const [allocations, setAllocations] = useState({
    housing: 0,
    food: 0,
    transportation: 0,
    entertainment: 0,
    savings: 0,
  });
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const categories = [
    { id: 'housing', name: 'Housing', recommended: 30, icon: '🏠' },
    { id: 'food', name: 'Food', recommended: 15, icon: '🍔' },
    { id: 'transportation', name: 'Transportation', recommended: 15, icon: '🚗' },
    { id: 'entertainment', name: 'Entertainment', recommended: 10, icon: '🎮' },
    { id: 'savings', name: 'Savings', recommended: 20, icon: '💰' },
  ];

  const handleAllocation = (category, percentage) => {
    const newAllocations = { ...allocations, [category]: percentage };
    const total = Object.values(newAllocations).reduce((a, b) => a + b, 0);
    
    if (total <= 100) {
      setAllocations(newAllocations);
    }
  };

  const submitBudget = () => {
    const total = Object.values(allocations).reduce((a, b) => a + b, 0);
    if (total !== 100) {
      setFeedback('Your budget must equal exactly 100%!');
      return;
    }

    let newScore = 0;
    let feedbackText = '';

    categories.forEach(cat => {
      const diff = Math.abs(allocations[cat.id] - cat.recommended);
      if (diff <= 5) {
        newScore += 20;
        feedbackText += `✅ ${cat.name}: Great allocation! `;
      } else if (diff <= 10) {
        newScore += 10;
        feedbackText += `⚠️ ${cat.name}: Close, but could be better. `;
      } else {
        feedbackText += `❌ ${cat.name}: Consider adjusting this. `;
      }
    });

    setScore(newScore);
    setFeedback(feedbackText);
    setUserData(prev => ({
      ...prev,
      totalXP: prev.totalXP + newScore,
      level: Math.floor((prev.totalXP + newScore) / 100) + 1,
    }));
  };

  const totalAllocated = Object.values(allocations).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Budget Builder Challenge</h2>
      
      <div className="mb-6">
        <p className="text-lg mb-2">Monthly Income: <span className="font-bold">${budget}</span></p>
        <p className="text-sm text-gray-600">Allocate your budget across different categories</p>
      </div>

      <div className="space-y-4 mb-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-medium">{cat.name}</span>
                <span className="text-sm text-gray-500">(Recommended: {cat.recommended}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{allocations[cat.id]}%</span>
                <span className="text-gray-500">${Math.round(budget * allocations[cat.id] / 100)}</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={allocations[cat.id]}
              onChange={(e) => handleAllocation(cat.id, parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
          <span className="font-semibold">Total Allocated:</span>
          <span className={`font-bold text-xl ${totalAllocated === 100 ? 'text-green-600' : totalAllocated > 100 ? 'text-red-600' : 'text-orange-600'}`}>
            {totalAllocated}%
          </span>
        </div>
      </div>

      <button
        onClick={submitBudget}
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700"
      >
        Submit Budget
      </button>

      {feedback && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold mb-2">Feedback:</p>
          <p className="text-sm">{feedback}</p>
          {score > 0 && (
            <p className="mt-2 text-lg font-bold text-green-600">Score: {score} XP</p>
          )}
        </div>
      )}
    </div>
  );
}

// Money Match Game Component with Enhanced Feedback
function MoneyMatchGame({ userData, setUserData }) {
  const allScenarios = [
    {
      id: 1,
      scenario: "You got a $50 birthday gift. Put it all into savings?",
      correct: 'right',
      explanation: "Saving birthday money is a smart move! Starting to save early, even small amounts, builds great financial habits. The money you save now can grow through compound interest over time. While it's okay to spend some on fun, saving gift money shows financial maturity."
    },
    {
      id: 2,
      scenario: "Buy the latest $200 sneakers with your first paycheck?",
      correct: 'left',
      explanation: "This is a poor financial choice. Your first paycheck should go toward necessities and building an emergency fund. Expensive sneakers are a 'want' not a 'need.' They also depreciate quickly - losing value the moment you wear them. A better approach: save most, budget a small amount for celebration."
    },
    {
      id: 3,
      scenario: "Set aside 20% of your allowance each week?",
      correct: 'right',
      explanation: "Excellent choice! The 20% savings rule is a cornerstone of good financial health. By automatically saving 20% of any money you receive, you're 'paying yourself first.' This habit, started young, can lead to significant wealth accumulation over your lifetime."
    },
    {
      id: 4,
      scenario: "Take out a loan for the newest iPhone?",
      correct: 'left',
      explanation: "Bad idea! Going into debt for a luxury item that depreciates rapidly is poor financial planning. Phones lose 50% of their value in the first year. Interest on the loan makes it even more expensive. Save up instead, or buy a less expensive model you can afford."
    },
    {
      id: 5,
      scenario: "Research prices before making a big purchase?",
      correct: 'right',
      explanation: "Smart shopping! Price comparison can save 10-30% on average. Taking time to research ensures you get the best value for your money. It also helps you avoid impulse purchases and find better alternatives. This habit alone can save thousands over your lifetime."
    },
    {
      id: 6,
      scenario: "Spend your entire tax refund on a vacation?",
      correct: 'left',
      explanation: "Not the best choice. While some recreation is important, spending an entire windfall on vacation misses an opportunity. A better approach: save 50%, use 30% for debt payment or investments, and enjoy 20% for fun. Tax refunds are great for boosting emergency funds."
    },
    {
      id: 7,
      scenario: "Open a high-yield savings account for your emergency fund?",
      correct: 'right',
      explanation: "Excellent decision! High-yield savings accounts offer better interest rates than regular savings (often 10x more). They're perfect for emergency funds because your money stays liquid (accessible) while earning more. This maximizes returns on money you need to keep safe."
    },
    {
      id: 8,
      scenario: "Buy cryptocurrency with money you need for rent next month?",
      correct: 'left',
      explanation: "Terrible idea! Never invest money you need for essentials. Crypto is extremely volatile and you could lose 50% overnight. Rent and necessities always come first. Only invest money you can afford to lose completely, and only after bills and emergency savings are covered."
    },
    {
      id: 9,
      scenario: "Use a budgeting app to track your spending?",
      correct: 'right',
      explanation: "Great choice! Budgeting apps help you understand where your money goes. Studies show people who track spending save 20% more on average. These apps can identify wasteful spending, help set goals, and send alerts before you overspend. Knowledge is power in personal finance."
    },
    {
      id: 10,
      scenario: "Max out credit cards for Black Friday shopping?",
      correct: 'left',
      explanation: "Dangerous move! Credit card debt often has 20%+ interest rates. Those 'deals' aren't worth it if you're paying interest for months. Black Friday 'savings' are often inflated anyway. Never spend money you don't have for non-essentials. If you can't pay cash, you can't afford it."
    }
  ];

  // Shuffle scenarios on component mount
  const [scenarios, setScenarios] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userChoice, setUserChoice] = useState(null);
  const [results, setResults] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);

  // Initialize shuffled scenarios
  useState(() => {
    const shuffled = [...allScenarios].sort(() => Math.random() - 0.5).slice(0, 6);
    setScenarios(shuffled);
  }, []);

  const handleSwipe = (direction) => {
    setUserChoice(direction);
    setShowResult(true);
    
    const correct = scenarios[currentCard].correct === direction;
    setResults([...results, {
      scenario: scenarios[currentCard].scenario,
      correct: correct,
      userChoice: direction,
      correctAnswer: scenarios[currentCard].correct
    }]);
  };

  const nextCard = () => {
    if (currentCard < scenarios.length - 1) {
      setCurrentCard(currentCard + 1);
      setShowResult(false);
      setUserChoice(null);
    } else {
      setGameComplete(true);
      const finalScore = results.filter(r => r.correct).length * 100 + 
                        (scenarios[currentCard].correct === userChoice ? 100 : 0);
      setUserData(prev => ({
        ...prev,
        totalXP: prev.totalXP + finalScore,
        level: Math.floor((prev.totalXP + finalScore) / 100) + 1,
      }));
    }
  };

  const resetGame = () => {
    const shuffled = [...allScenarios].sort(() => Math.random() - 0.5).slice(0, 6);
    setScenarios(shuffled);
    setCurrentCard(0);
    setResults([]);
    setGameComplete(false);
    setShowResult(false);
    setUserChoice(null);
  };

  if (scenarios.length === 0) {
    return <div>Loading...</div>;
  }

  const correctCount = results.filter(r => r.correct).length;
  const totalScore = correctCount * 100;

  if (gameComplete) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Game Complete! 🎉</h2>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl mb-6">
          <div className="text-center mb-4">
            <p className="text-5xl font-bold text-purple-600">{totalScore} XP</p>
            <p className="text-lg text-gray-600 mt-2">
              You got {correctCount} out of {scenarios.length} correct!
            </p>
          </div>
          
          <div className="flex justify-center gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-green-600">✓ {correctCount}</p>
              <p className="text-sm text-gray-600">Correct</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-red-600">✗ {scenarios.length - correctCount}</p>
              <p className="text-sm text-gray-600">Incorrect</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-lg mb-2">Your Results:</h3>
          {results.map((result, idx) => (
            <div key={idx} className={`p-3 rounded-lg flex items-start gap-3 ${
              result.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <span className={`text-2xl ${result.correct ? '✅' : '❌'}`}>
                {result.correct ? '✅' : '❌'}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">{result.scenario}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Your answer: {result.userChoice === 'right' ? 'Good Choice' : 'Bad Choice'} | 
                  Correct: {result.correctAnswer === 'right' ? 'Good Choice' : 'Bad Choice'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
        >
          Play Again with New Questions
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Money Match</h2>
      
      <div className="mb-4 flex justify-between">
        <span className="text-lg font-semibold">
          Score: {results.filter(r => r.correct).length * 100} XP
        </span>
        <span className="text-lg">Card {currentCard + 1} of {scenarios.length}</span>
      </div>

      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8 mb-8 min-h-[200px] flex items-center justify-center">
        <p className="text-xl text-center font-medium">
          {scenarios[currentCard].scenario}
        </p>
      </div>

      {!showResult ? (
        <div className="flex justify-center gap-8">
          <button
            onClick={() => handleSwipe('left')}
            className="bg-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-600 flex items-center gap-2 transform transition hover:scale-105"
          >
            ❌ Bad Choice
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="bg-green-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-600 flex items-center gap-2 transform transition hover:scale-105"
          >
            ✅ Good Choice
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-6 rounded-xl text-center ${
            userChoice === scenarios[currentCard].correct 
              ? 'bg-green-50 border-2 border-green-300' 
              : 'bg-red-50 border-2 border-red-300'
          }`}>
            <p className="text-2xl font-bold mb-2">
              {userChoice === scenarios[currentCard].correct ? '✅ Correct!' : '❌ Incorrect'}
            </p>
            <p className="text-lg">
              The right answer was: 
              <span className="font-bold ml-2">
                {scenarios[currentCard].correct === 'right' ? 'Good Choice ✅' : 'Bad Choice ❌'}
              </span>
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold text-blue-900 mb-2">💡 Why?</p>
            <p className="text-sm text-gray-700">{scenarios[currentCard].explanation}</p>
          </div>

          <button
            onClick={nextCard}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transform transition hover:scale-105"
          >
            {currentCard < scenarios.length - 1 ? 'Next Card →' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}

// Enhanced Investing Game Component with Realistic Risk
function InvestingGame({ userData, setUserData }) {
  const [year, setYear] = useState(0);
  const [totalValue, setTotalValue] = useState(1000);
  const [portfolioPercentages, setPortfolioPercentages] = useState({
    bank: 0,
    index: 0,
    risky: 0,
  });
  const [history, setHistory] = useState([{ year: 0, total: 1000, event: 'Started with $1,000' }]);
  const [gameState, setGameState] = useState('setup');
  const [lastYearReturns, setLastYearReturns] = useState({});
  const [yearlyEvents, setYearlyEvents] = useState([]);

  const investments = [
    { 
      id: 'bank', 
      name: 'Savings Account', 
      avgReturn: '2%',
      description: 'Steady 2% annual return, no risk',
      risk: 'No risk', 
      color: 'bg-green-500' 
    },
    { 
      id: 'index', 
      name: 'Index Fund', 
      avgReturn: '8%',
      description: 'Average 8% return with moderate volatility (-20% to +30%)',
      risk: 'Moderate risk', 
      color: 'bg-blue-500' 
    },
    { 
      id: 'risky', 
      name: 'Growth Stocks', 
      avgReturn: 'High variance',
      description: '30% chance: +40%, 35% chance: +10%, 30% chance: -20%, 5% chance: -75%',
      risk: 'High risk', 
      color: 'bg-red-500' 
    },
  ];

  const allocatePercentage = (type, percentage) => {
    const newPercentages = { ...portfolioPercentages, [type]: percentage };
    const total = Object.values(newPercentages).reduce((a, b) => a + b, 0);
    
    if (total <= 100) {
      setPortfolioPercentages(newPercentages);
    }
  };

  const simulateYear = () => {
    let newValue = 0;
    const returns = {};
    const events = [];
    
    // Savings Account - Fixed 2% return
    const bankAmount = totalValue * (portfolioPercentages.bank / 100);
    const bankReturn = bankAmount * 1.02;
    newValue += bankReturn;
    returns.bank = 2;
    
    // Index Fund - Moderate volatility
    const indexAmount = totalValue * (portfolioPercentages.index / 100);
    const indexRandom = Math.random();
    let indexReturnRate;
    if (indexRandom < 0.15) {
      indexReturnRate = -0.20; // 15% chance of -20%
      events.push('📉 Market correction: Index funds down 20%');
    } else if (indexRandom < 0.85) {
      indexReturnRate = 0.08 + (Math.random() - 0.5) * 0.10; // 70% chance of 3-13%
    } else {
      indexReturnRate = 0.30; // 15% chance of +30%
      events.push('📈 Bull market: Index funds up 30%!');
    }
    const indexReturn = indexAmount * (1 + indexReturnRate);
    newValue += indexReturn;
    returns.index = Math.round(indexReturnRate * 100);
    
    // Growth Stocks - High volatility (more realistic distribution)
    const riskyAmount = totalValue * (portfolioPercentages.risky / 100);
    const riskyRandom = Math.random();
    let riskyReturnRate;
    if (riskyRandom < 0.30) {
      riskyReturnRate = 0.40; // 30% chance of +40%
      events.push('🚀 Growth stocks surge 40%!');
    } else if (riskyRandom < 0.65) {
      riskyReturnRate = 0.10; // 35% chance of +10%
      events.push('📈 Growth stocks up 10%');
    } else if (riskyRandom < 0.95) {
      riskyReturnRate = -0.20; // 30% chance of -20%
      events.push('📉 Growth stocks down 20%');
    } else {
      riskyReturnRate = -0.75; // 5% chance of -75%
      events.push('💥 Market crash: Growth stocks plummet 75%!');
    }
    const riskyReturn = riskyAmount * (1 + riskyReturnRate);
    newValue += riskyReturn;
    returns.risky = Math.round(riskyReturnRate * 100);
    
    setTotalValue(newValue);
    setLastYearReturns(returns);
    setYearlyEvents(events);
    setYear(year + 1);
    
    const eventText = events.length > 0 ? events.join(', ') : 'Steady growth';
    setHistory([...history, { year: year + 1, total: newValue, event: eventText }]);
  };

  const simulateFiveYears = () => {
    let currentValue = totalValue;
    let currentYear = year;
    const newHistory = [...history];
    
    for (let i = 0; i < 5 && currentYear < 50; i++) {
      let yearValue = 0;
      const events = [];
      
      // Simulate each investment
      const bankAmount = currentValue * (portfolioPercentages.bank / 100);
      yearValue += bankAmount * 1.02;
      
      const indexAmount = currentValue * (portfolioPercentages.index / 100);
      const indexRandom = Math.random();
      let indexReturnRate;
      if (indexRandom < 0.15) {
        indexReturnRate = -0.20;
        events.push('Market correction');
      } else if (indexRandom < 0.85) {
        indexReturnRate = 0.08 + (Math.random() - 0.5) * 0.10;
      } else {
        indexReturnRate = 0.30;
        events.push('Bull market');
      }
      yearValue += indexAmount * (1 + indexReturnRate);
      
      const riskyAmount = currentValue * (portfolioPercentages.risky / 100);
      const riskyRandom = Math.random();
      let riskyReturnRate;
      if (riskyRandom < 0.30) {
        riskyReturnRate = 0.40;
        events.push('Growth surge');
      } else if (riskyRandom < 0.65) {
        riskyReturnRate = 0.10;
      } else if (riskyRandom < 0.95) {
        riskyReturnRate = -0.20;
        events.push('Growth decline');
      } else {
        riskyReturnRate = -0.75;
        events.push('Market crash!');
      }
      yearValue += riskyAmount * (1 + riskyReturnRate);
      
      currentValue = yearValue;
      currentYear++;
      
      const eventText = events.length > 0 ? events.join(', ') : 'Normal year';
      newHistory.push({ year: currentYear, total: yearValue, event: eventText });
    }
    
    setTotalValue(currentValue);
    setYear(currentYear);
    setHistory(newHistory);
    setYearlyEvents([`Simulated 5 years - ending value: $${Math.round(currentValue)}`]);
  };

  const startSimulation = () => {
    const total = Object.values(portfolioPercentages).reduce((a, b) => a + b, 0);
    if (total === 100) {
      setGameState('running');
    }
  };

  const resetAllocation = () => {
    setGameState('setup');
  };

  const totalAllocated = Object.values(portfolioPercentages).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Investment Simulator</h2>
      
      {gameState === 'setup' && (
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Allocate Your Portfolio</h3>
            <p className="text-gray-600">Starting with $1,000 - Choose your investment mix</p>
          </div>

          <div className="space-y-4 mb-6">
            {investments.map(inv => (
              <div key={inv.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">{inv.name}</span>
                    <span className="ml-2 text-sm text-gray-500">({inv.avgReturn})</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs text-white ${inv.color}`}>
                    {inv.risk}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{inv.description}</p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={portfolioPercentages[inv.id]}
                    onChange={(e) => allocatePercentage(inv.id, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-16 text-right font-semibold">{portfolioPercentages[inv.id]}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6 text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-lg">
              Total Allocated: <span className={`font-bold ${totalAllocated === 100 ? 'text-green-600' : 'text-orange-600'}`}>
                {totalAllocated}%
              </span>
            </p>
          </div>

          <button
            onClick={startSimulation}
            disabled={totalAllocated !== 100}
            className={`w-full py-3 rounded-lg font-semibold ${
              totalAllocated === 100
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
                <p className="text-sm text-gray-600">Total Return</p>
                <p className={`text-2xl font-bold ${totalValue >= 1000 ? 'text-green-600' : 'text-red-600'}`}>
                  {((totalValue / 1000 - 1) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {yearlyEvents.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-semibold text-yellow-800">Market Events:</p>
              {yearlyEvents.map((event, idx) => (
                <p key={idx} className="text-sm text-yellow-700">{event}</p>
              ))}
            </div>
          )}

          <div className="space-y-2 mb-6">
            {investments.map(inv => (
              <div key={inv.id} className="flex justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <span>{inv.name}</span>
                  <span className="text-sm text-gray-500">({portfolioPercentages[inv.id]}%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold">${Math.round(totalValue * portfolioPercentages[inv.id] / 100)}</span>
                  {lastYearReturns[inv.id] !== undefined && (
                    <span className={`text-sm font-medium ${lastYearReturns[inv.id] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {lastYearReturns[inv.id] >= 0 ? '+' : ''}{lastYearReturns[inv.id]}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mb-4">
            <button
              onClick={simulateYear}
              disabled={year >= 50}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next Year
            </button>
            <button
              onClick={simulateFiveYears}
              disabled={year >= 50}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Skip 5 Years
            </button>
          </div>

          <button
            onClick={resetAllocation}
            className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700"
          >
            Adjust Portfolio Allocation
          </button>

          {year >= 50 && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
              <p className="text-lg font-semibold text-green-800">
                Simulation Complete! Your $1,000 grew to ${Math.round(totalValue)}
              </p>
              <p className="text-sm text-green-700 mt-2">
                That's a {((totalValue / 1000 - 1) * 100).toFixed(1)}% total return over 50 years!
              </p>
            </div>
          )}

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Recent History:</h4>
            <div className="max-h-32 overflow-y-auto space-y-1 text-sm">
              {history.slice(-5).reverse().map((h, idx) => (
                <div key={idx} className="flex justify-between p-2 bg-gray-50 rounded">
                  <span>Year {h.year}: ${Math.round(h.total)}</span>
                  <span className="text-gray-600 text-xs">{h.event}</span>
                </div>
              ))}
            </div>
          </div>
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
      {/* Friend Squads */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Squads</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {friendGroups.map((group, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">{group.name}</h3>
              <div className="space-y-2 text-sm">
                <p>Members: {group.members}</p>
                <p>Your Rank: #{group.yourRank}</p>
                <p>Top Score: {group.topScore} XP</p>
              </div>
              <button className="mt-4 bg-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50">
                View Squad
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Global Leaderboard */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Global Leaderboard</h2>
        
        <div className="space-y-3">
          {globalLeaderboard.map((player) => (
            <div key={player.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  player.rank === 1 ? 'bg-yellow-400' :
                  player.rank === 2 ? 'bg-gray-300' :
                  player.rank === 3 ? 'bg-orange-400' :
                  'bg-gray-200'
                }`}>
                  {player.rank}
                </div>
                <div>
                  <p className="font-semibold">{player.name}</p>
                  <p className="text-sm text-gray-600">Level {player.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{player.score.toLocaleString()}</p>
                <p className="text-sm text-gray-600">XP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}