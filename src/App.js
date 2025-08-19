import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Trophy, Users, TrendingUp, DollarSign, Target, Zap, Home, Gamepad2, User, Clock, AlertTriangle, CheckCircle, XCircle, Shield, ShoppingCart, Heart, Car, Send, ArrowLeft, Crown, Medal, Award } from 'lucide-react';

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
    { id: 'budget', label: 'Budget', icon: DollarSign },
    { id: 'moneymatch', label: 'Match', icon: Target },
    { id: 'investing', label: 'Invest', icon: TrendingUp },
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
          <h1 className="text-xl sm:text-2xl font-bold text-teal-700">Cash Clash</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <span className="font-semibold text-sm sm:text-base">{userData.streakDays} day streak</span>
            </div>
            <div className="bg-teal-100 px-2 sm:px-3 py-1 rounded-full">
              <span className="text-xs sm:text-sm font-medium">Level {userData.level}</span>
            </div>
            <div className="bg-purple-100 px-2 sm:px-3 py-1 rounded-full hidden sm:block">
              <span className="text-sm font-medium">{userData.totalXP} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation - Fixed for Mobile */}
      <nav className="bg-white border-b sticky top-0 z-10 overflow-x-auto">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex min-w-max sm:min-w-0">
            {navigation.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center justify-center sm:justify-start gap-1 sm:gap-2 px-3 sm:px-4 py-3 font-medium transition-colors flex-1 whitespace-nowrap ${
                    currentPage === item.id 
                      ? 'text-teal-600 border-b-2 border-teal-600' 
                      : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs sm:text-base">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-4 sm:py-8">
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
    <div className="space-y-4 sm:space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-4">
          Welcome back, {userData.username}! 🚀
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
          Ready to level up your financial skills? Choose a game to start earning XP!
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-2 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">Total XP</p>
            <p className="text-lg sm:text-2xl font-bold text-blue-700">{userData.totalXP}</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-2 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">Current Level</p>
            <p className="text-lg sm:text-2xl font-bold text-green-700">{userData.level}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-2 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">Streak Days</p>
            <p className="text-lg sm:text-2xl font-bold text-orange-700">{userData.streakDays}</p>
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {games.map(game => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              onClick={() => setCurrentPage(game.id)}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className={`${game.color} w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4`}>
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">{game.title}</h3>
              <p className="text-xs sm:text-base text-gray-600 mb-3 sm:mb-4">{game.description}</p>
              <button className="flex items-center gap-2 text-teal-600 font-semibold text-sm sm:text-base">
                Play Now <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Enhanced Budget Builder Game Component with 12-Month Challenge
function BudgetBuilderGame({ userData, setUserData }) {
  const [gameState, setGameState] = useState('ready'); // ready, playing, monthEnd, yearEnd
  const [currentMonth, setCurrentMonth] = useState(1);
  const [monthlyIncome] = useState(3000);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [yearlyScore, setYearlyScore] = useState(0);
  const [allocations, setAllocations] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [monthHistory, setMonthHistory] = useState([]);
  const [unexpectedEvent, setUnexpectedEvent] = useState(null);
  const [emergencyFund, setEmergencyFund] = useState(0);
  const timerRef = useRef(null);

  // Requirements that need to be allocated
  const requirements = [
    { id: 'house', name: 'Housing/Rent', icon: Home, minAmount: 800, maxAmount: 1200, priority: 'essential' },
    { id: 'car', name: 'Car/Transport', icon: Car, minAmount: 200, maxAmount: 400, priority: 'essential' },
    { id: 'food', name: 'Food & Groceries', icon: ShoppingCart, minAmount: 300, maxAmount: 500, priority: 'essential' },
    { id: 'insurance', name: 'Insurance', icon: Shield, minAmount: 150, maxAmount: 250, priority: 'essential' },
    { id: 'entertainment', name: 'Entertainment', icon: Zap, minAmount: 50, maxAmount: 200, priority: 'want' },
    { id: 'movies', name: 'Movie Tickets', icon: Target, minAmount: 20, maxAmount: 80, priority: 'want' },
    { id: 'emergency', name: 'Emergency Fund', icon: AlertTriangle, minAmount: 100, maxAmount: 500, priority: 'savings' },
    { id: 'savings', name: 'Long-term Savings', icon: TrendingUp, minAmount: 100, maxAmount: 600, priority: 'savings' },
  ];

  // Categories for drag and drop
  const categories = [
    { id: 'expenses', name: 'Monthly Expenses', color: 'bg-red-100 border-red-300' },
    { id: 'shortTerm', name: 'Short-term Savings', color: 'bg-yellow-100 border-yellow-300' },
    { id: 'longTerm', name: 'Long-term Savings', color: 'bg-green-100 border-green-300' },
  ];

  // Random unexpected events
  const unexpectedEvents = [
    { name: 'Car Repair', cost: 500, icon: Car, description: 'Your car needs emergency repairs' },
    { name: 'Medical Bill', cost: 800, icon: Heart, description: 'Unexpected hospital visit' },
    { name: 'Home Repair', cost: 600, icon: Home, description: 'Plumbing emergency at home' },
    { name: 'Phone Replacement', cost: 400, icon: Zap, description: 'Your phone broke and needs replacement' },
    { name: 'Tax Payment', cost: 700, icon: DollarSign, description: 'Quarterly tax payment due' },
    { name: 'Insurance Deductible', cost: 500, icon: Shield, description: 'Insurance claim deductible' },
    { name: 'Car Accident', cost: 1000, icon: Car, description: 'Car accident - insurance deductible and repairs' },
  ];

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      completeMonth();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentMonth(1);
    setTimeLeft(60);
    setScore(0);
    setYearlyScore(0);
    setAllocations({});
    setMonthHistory([]);
    setEmergencyFund(0);
    setUnexpectedEvent(null);
    
    // Random unexpected event (30% chance each month)
    if (Math.random() < 0.3) {
      const event = unexpectedEvents[Math.floor(Math.random() * unexpectedEvents.length)];
      setUnexpectedEvent(event);
    }
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, categoryId) => {
    e.preventDefault();
    if (draggedItem) {
      const amount = prompt(`Allocate amount for ${draggedItem.name} ($${draggedItem.minAmount}-$${draggedItem.maxAmount}):`);
      const numAmount = parseInt(amount);
      
      if (numAmount && numAmount >= draggedItem.minAmount && numAmount <= draggedItem.maxAmount) {
        setAllocations(prev => ({
          ...prev,
          [draggedItem.id]: { 
            category: categoryId, 
            amount: numAmount,
            requirement: draggedItem
          }
        }));
      } else if (amount !== null) {
        alert(`Please enter an amount between $${draggedItem.minAmount} and $${draggedItem.maxAmount}`);
      }
    }
    setDraggedItem(null);
  };

  const removeAllocation = (reqId) => {
    setAllocations(prev => {
      const newAllocations = { ...prev };
      delete newAllocations[reqId];
      return newAllocations;
    });
  };

  const calculateMonthScore = () => {
    let monthScore = 0;
    let feedback = [];

    // Check if all essential items are allocated
    const essentialItems = requirements.filter(r => r.priority === 'essential');
    const allocatedEssentials = essentialItems.filter(r => allocations[r.id]);
    
    if (allocatedEssentials.length === essentialItems.length) {
      monthScore += 200;
      feedback.push('✓ All essentials covered');
    } else {
      monthScore -= 100;
      const missing = essentialItems.filter(r => !allocations[r.id]).map(r => r.name).join(', ');
      feedback.push(`✗ Missing essentials: ${missing}`);
    }

    // Check for savings
    const savingsAmount = Object.entries(allocations)
      .filter(([key, val]) => ['emergency', 'savings'].includes(key))
      .reduce((sum, [key, val]) => sum + val.amount, 0);
    
    if (savingsAmount >= 300) {
      monthScore += 150;
      feedback.push('✓ Great savings rate!');
    } else if (savingsAmount >= 150) {
      monthScore += 75;
      feedback.push('✓ Good savings');
    } else {
      feedback.push('○ Consider saving more');
    }

    // Check if budget is balanced
    const totalAllocated = Object.values(allocations).reduce((sum, item) => sum + item.amount, 0);
    
    if (totalAllocated === monthlyIncome) {
      monthScore += 100;
      feedback.push('✓ Budget perfectly balanced');
    } else if (Math.abs(totalAllocated - monthlyIncome) <= 100) {
      monthScore += 50;
      feedback.push('○ Budget nearly balanced');
    } else {
      feedback.push(`✗ Budget off by $${Math.abs(totalAllocated - monthlyIncome)}`);
    }

    // Handle unexpected event
    if (unexpectedEvent) {
      if (emergencyFund >= unexpectedEvent.cost) {
        monthScore += 200;
        feedback.push(`✓ Emergency fund covered ${unexpectedEvent.name}!`);
        setEmergencyFund(prev => prev - unexpectedEvent.cost);
      } else if (allocations.emergency && allocations.emergency.amount >= 200) {
        monthScore += 100;
        feedback.push(`○ Building emergency fund for future`);
      } else {
        monthScore -= 150;
        feedback.push(`✗ Couldn't cover ${unexpectedEvent.name} - went into debt!`);
      }
    }

    // Update emergency fund
    if (allocations.emergency) {
      setEmergencyFund(prev => prev + allocations.emergency.amount);
    }

    return { score: Math.max(0, monthScore), feedback };
  };

  const completeMonth = () => {
    clearTimeout(timerRef.current);
    
    if (Object.keys(allocations).length > 0) {
      const { score: monthScore, feedback } = calculateMonthScore();
      setScore(monthScore);
      setYearlyScore(prev => prev + monthScore);
      
      setMonthHistory(prev => [...prev, {
        month: currentMonth,
        score: monthScore,
        allocations: { ...allocations },
        event: unexpectedEvent,
        feedback
      }]);
      
      setGameState('monthEnd');
    } else {
      // Auto-fail if nothing allocated
      setScore(0);
      setYearlyScore(prev => prev + 0);
      setMonthHistory(prev => [...prev, {
        month: currentMonth,
        score: 0,
        allocations: {},
        event: unexpectedEvent,
        feedback: ['✗ No budget created - financial chaos!']
      }]);
      setGameState('monthEnd');
    }
  };

  const nextMonth = () => {
    if (currentMonth < 12) {
      setCurrentMonth(prev => prev + 1);
      setTimeLeft(60);
      setAllocations({});
      setGameState('playing');
      setUnexpectedEvent(null);
      
      // Random unexpected event (30% chance)
      if (Math.random() < 0.3) {
        const event = unexpectedEvents[Math.floor(Math.random() * unexpectedEvents.length)];
        setUnexpectedEvent(event);
      }
    } else {
      setGameState('yearEnd');
      // Award XP
      const totalXP = yearlyScore;
      setUserData(prev => ({
        ...prev,
        totalXP: prev.totalXP + totalXP,
        level: Math.floor((prev.totalXP + totalXP) / 1000) + 1,
      }));
    }
  };

  const totalAllocated = Object.values(allocations).reduce((sum, item) => sum + item.amount, 0);
  const remaining = monthlyIncome - totalAllocated;

  // Ready screen
  if (gameState === 'ready') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Budget Builder Challenge</h2>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4">12-Month Budget Challenge!</h3>
            <p className="text-gray-600 mb-6">
              Navigate a full year of budgeting with unexpected events and real-world scenarios.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📋 How to Play:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• $3,000 monthly income</li>
                <li>• Drag items into budget categories</li>
                <li>• Balance before timer runs out (60s)</li>
                <li>• Or click "Continue" when ready</li>
                <li>• Handle unexpected events</li>
                <li>• Complete all 12 months!</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🏆 Scoring:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Cover essentials: +200 pts</li>
                <li>• Save money: +75-150 pts</li>
                <li>• Balance budget: +100 pts</li>
                <li>• Handle emergencies: +200 pts</li>
                <li>• Compete for high scores!</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-teal-600 hover:to-green-600 transform hover:scale-105 transition-all"
            >
              Start Year 1 - January
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing screen
  if (gameState === 'playing') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Month {currentMonth} of 12</h2>
            <p className="text-gray-600">Monthly Income: ${monthlyIncome}</p>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="text-center bg-green-50 px-3 py-2 rounded-lg">
              <p className="text-xs text-gray-500">Emergency Fund</p>
              <p className="text-lg font-bold text-green-600">${emergencyFund}</p>
            </div>
            
            <div className="text-center bg-gray-50 px-3 py-2 rounded-lg">
              <p className="text-xs text-gray-500">Time Left</p>
              <div className={`text-xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-gray-800'}`}>
                <Clock className="inline w-4 h-4 mr-1" />
                {timeLeft}s
              </div>
            </div>
            
            <div className={`text-center px-3 py-2 rounded-lg ${remaining === 0 ? 'bg-green-100' : remaining > 0 ? 'bg-yellow-100' : 'bg-red-100'}`}>
              <p className="text-xs text-gray-500">Remaining</p>
              <p className="text-lg font-bold">${remaining}</p>
            </div>
          </div>
        </div>

        {/* Unexpected Event Alert */}
        {unexpectedEvent && (
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 mb-4 flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-red-800">{unexpectedEvent.name}!</p>
              <p className="text-sm text-red-700">{unexpectedEvent.description} - Cost: ${unexpectedEvent.cost}</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Requirements to allocate */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Requirements to Allocate</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {requirements.filter(req => !allocations[req.id]).map(req => {
                const Icon = req.icon;
                return (
                  <div
                    key={req.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, req)}
                    className="bg-gray-50 border-2 border-gray-300 rounded-lg p-2 cursor-move hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">{req.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        ${req.minAmount}-${req.maxAmount}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Budget Categories</h3>
            <div className="space-y-3">
              {categories.map(category => (
                <div
                  key={category.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, category.id)}
                  className={`border-2 rounded-lg p-3 min-h-[100px] ${category.color}`}
                >
                  <h4 className="font-semibold text-sm mb-2">{category.name}</h4>
                  <div className="space-y-1">
                    {Object.entries(allocations)
                      .filter(([key, val]) => val.category === category.id)
                      .map(([key, val]) => {
                        const Icon = val.requirement.icon;
                        return (
                          <div key={key} className="bg-white rounded p-1 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <Icon className="w-3 h-3" />
                              <span className="text-xs">{val.requirement.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-semibold">${val.amount}</span>
                              <button
                                onClick={() => removeAllocation(key)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <XCircle className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={completeMonth}
            disabled={remaining !== 0}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              remaining === 0
                ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {remaining === 0 ? 'Continue (Submit Budget)' : `Balance Budget (${remaining > 0 ? '+' : ''}$${remaining})`}
          </button>
        </div>
      </div>
    );
  }

  // Month End screen
  if (gameState === 'monthEnd') {
    const currentMonthData = monthHistory[monthHistory.length - 1];
    
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Month {currentMonth} Complete!
        </h2>
        
        <div className="text-center mb-6">
          <p className="text-5xl font-bold text-teal-600 mb-2">{score} Points</p>
          <p className="text-gray-600">Monthly Score</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
          <h3 className="font-semibold mb-4">Month Summary:</h3>
          <div className="space-y-2">
            {currentMonthData.feedback.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                {item.startsWith('✓') && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
                {item.startsWith('✗') && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
                {item.startsWith('○') && <div className="w-5 h-5 rounded-full bg-yellow-500 flex-shrink-0 mt-0.5" />}
                <span className="text-sm">{item.replace(/^[✓✗○]\s/, '')}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-gray-600 mb-4">
            Year Progress: {currentMonth}/12 months
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div 
              className="bg-gradient-to-r from-teal-500 to-green-500 h-3 rounded-full transition-all"
              style={{ width: `${(currentMonth / 12) * 100}%` }}
            />
          </div>
          
          <button
            onClick={nextMonth}
            className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-green-600"
          >
            {currentMonth < 12 ? `Continue to Month ${currentMonth + 1}` : 'View Year Summary'}
            <ChevronRight className="inline ml-2" />
          </button>
        </div>
      </div>
    );
  }

  // Year End screen
  if (gameState === 'yearEnd') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
          <h2 className="text-4xl font-bold mb-2">Year Complete!</h2>
          <p className="text-6xl font-bold text-teal-600 mb-2">{yearlyScore} XP</p>
          <p className="text-xl text-gray-600">Total Experience Points Earned</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-700">{monthHistory.length}</p>
            <p className="text-gray-600">Months Completed</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-700">${emergencyFund}</p>
            <p className="text-gray-600">Emergency Fund</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-purple-700">
              {monthHistory.length > 0 ? Math.round(yearlyScore / monthHistory.length) : 0}
            </p>
            <p className="text-gray-600">Avg Monthly Score</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-4xl mx-auto">
          <h3 className="font-bold text-lg mb-4">Year Overview:</h3>
          <div className="grid grid-cols-4 gap-3">
            {monthHistory.map((month, idx) => (
              <div key={idx} className="bg-white rounded p-3 text-center">
                <p className="text-sm text-gray-500">Month {month.month}</p>
                <p className="text-xl font-bold">{month.score}</p>
                {month.event && (
                  <p className="text-xs text-red-600 mt-1">
                    {month.event.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-6 mb-6 max-w-3xl mx-auto">
          <h3 className="font-bold text-lg mb-3">Key Achievements:</h3>
          <div className="space-y-2">
            {yearlyScore >= 3000 && (
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Budget Master - Excellent financial management!</span>
              </div>
            )}
            {emergencyFund >= 1000 && (
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Emergency Ready - Built a solid safety net</span>
              </div>
            )}
            {monthHistory.filter(m => m.score >= 400).length >= 6 && (
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Consistent Saver - Strong monthly performance</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={startGame}
            className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-green-600"
          >
            Play Again
          </button>
          <button
            onClick={() => setGameState('ready')}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }
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
  useEffect(() => {
    const shuffled = [...allScenarios].sort(() => Math.random() - 0.5).slice(0, 6);
    setScenarios(shuffled);
  }, []);

  const handleSwipe = (direction) => {
    setUserChoice(direction);
    setShowResult(true);
    
    const correct = scenarios[currentCard].correct === direction;
    setResults(prev => [...prev, {
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
      // Calculate final score based on results array which now has all answers
      const finalScore = results.filter(r => r.correct).length * 100;
      setUserData(prev => ({
        ...prev,
        totalXP: prev.totalXP + finalScore,
        level: Math.floor((prev.totalXP + finalScore) / 1000) + 1,
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
  const [xpAwarded, setXpAwarded] = useState(false);

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

  const calculateAndAwardXP = () => {
    if (!xpAwarded && year >= 10) {
      const returnPercentage = ((totalValue / 1000) - 1) * 100;
      let xpEarned = 0;
      
      // Award XP based on returns achieved
      if (returnPercentage < 0) {
        xpEarned = 50; // Participation points for loss
      } else if (returnPercentage <= 20) {
        xpEarned = 100; // Broke even or small gain
      } else if (returnPercentage <= 50) {
        xpEarned = 200; // Modest returns
      } else if (returnPercentage <= 100) {
        xpEarned = 300; // Good returns
      } else if (returnPercentage <= 200) {
        xpEarned = 500; // Great returns
      } else {
        xpEarned = 750; // Exceptional returns
      }
      
      // Bonus XP for reaching 50 years
      if (year === 50) {
        xpEarned += 250;
      }
      
      setUserData(prev => ({
        ...prev,
        totalXP: prev.totalXP + xpEarned,
        level: Math.floor((prev.totalXP + xpEarned) / 1000) + 1,
      }));
      
      setXpAwarded(true);
      return xpEarned;
    }
    return 0;
  };
  
  // Store XP earned for display
  const [earnedXP, setEarnedXP] = useState(0);

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
    
    // Check if we should award XP
    if (year + 1 >= 10) {
      calculateAndAwardXP();
    }
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
    setYearlyEvents([`Simulated 5 years - ending value: ${Math.round(currentValue)}`]);
    
    // Check if we should award XP
    if (currentYear >= 10) {
      calculateAndAwardXP();
    }
  };

  const startSimulation = () => {
    const total = Object.values(portfolioPercentages).reduce((a, b) => a + b, 0);
    if (total === 100) {
      setGameState('running');
      setXpAwarded(false); // Reset XP awarded flag when starting new simulation
    }
  };

  const resetAllocation = () => {
    setGameState('setup');
    setYear(0);
    setTotalValue(1000);
    setHistory([{ year: 0, total: 1000, event: 'Started with $1,000' }]);
    setXpAwarded(false);
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
            <p className="text-sm text-gray-500 mt-2">📊 Earn XP based on your investment returns after 10+ years!</p>
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

          {year >= 10 && earnedXP > 0 && (
            <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 rounded-lg">
              <p className="text-sm font-semibold text-green-800">🎉 XP Earned!</p>
              <p className="text-sm text-green-700">
                Based on your {((totalValue / 1000 - 1) * 100).toFixed(1)}% return, you earned {earnedXP} XP!
              </p>
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
            Reset & Try Different Strategy
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

// Enhanced Social Page Component with Squad Details
function SocialPage({ userData }) {
  const [currentView, setCurrentView] = useState('overview'); // overview, squadDetail
  const [selectedSquad, setSelectedSquad] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState({
    'Squad Alpha': [
      { id: 1, user: 'Sarah M.', message: 'I LOVE this app!', time: '2 mins ago', avatar: '👧' },
      { id: 2, user: 'Mike T.', message: 'Just hit Level 10! 🎉', time: '5 mins ago', avatar: '👦' },
      { id: 3, user: 'Ashley K.', message: 'I finally mastered Money Match!', time: '12 mins ago', avatar: '👩' },
      { id: 4, user: 'James L.', message: 'Yes! I got 30 XP, ten more than you did!', time: '15 mins ago', avatar: '🧑' },
      { id: 5, user: 'Emma R.', message: 'The budget builder is so helpful for real life!', time: '18 mins ago', avatar: '👩‍🦰' },
      { id: 6, user: 'David P.', message: "Anyone beat my 450 point month in Budget Builder?", time: '22 mins ago', avatar: '👨' },
      { id: 7, user: 'Sophie L.', message: 'This squad is amazing! So motivating!', time: '25 mins ago', avatar: '👱‍♀️' },
      { id: 8, user: 'Ryan K.', message: 'Investment sim taught me so much about risk!', time: '30 mins ago', avatar: '👨‍🦱' },
    ],
    'Teen Investors': [
      { id: 1, user: 'Alex J.', message: 'Who else is crushing the investment simulator?', time: '1 min ago', avatar: '🧑‍💼' },
      { id: 2, user: 'Taylor S.', message: 'I love how this makes finance FUN!', time: '3 mins ago', avatar: '👤' },
      { id: 3, user: 'Jordan M.', message: 'Just got 500 XP in one day!', time: '8 mins ago', avatar: '🧑‍🎓' },
      { id: 4, user: 'Casey R.', message: "This app is literally changing my life!", time: '10 mins ago', avatar: '👨‍💻' },
      { id: 5, user: 'Morgan B.', message: 'Beat my high score! 2400 XP total!', time: '14 mins ago', avatar: '👩‍💼' },
      { id: 6, user: 'Chris D.', message: 'The real-world scenarios are SO good', time: '20 mins ago', avatar: '🧑‍🏫' },
    ]
  });

  // Generate dynamic leaderboards based on actual user data
  const generateLeaderboard = (squadName) => {
    const baseMembers = squadName === 'Squad Alpha' 
      ? [
          { name: 'Sarah M.', score: 15420, level: 16, avatar: '👧' },
          { name: 'Mike T.', score: 14200, level: 15, avatar: '👦' },
          { name: 'Ashley K.', score: 11500, level: 12, avatar: '👩' },
          { name: 'James L.', score: 10200, level: 11, avatar: '🧑' },
          { name: 'Emma R.', score: 9800, level: 10, avatar: '👩‍🦰' },
          { name: 'David P.', score: 8900, level: 9, avatar: '👨' },
          { name: 'Sophie L.', score: 7600, level: 8, avatar: '👱‍♀️' },
        ]
      : [
          { name: 'Alex J.', score: 12300, level: 13, avatar: '🧑‍💼' },
          { name: 'Taylor S.', score: 11100, level: 12, avatar: '👤' },
          { name: 'Jordan M.', score: 10500, level: 11, avatar: '🧑‍🎓' },
          { name: 'Casey R.', score: 9800, level: 10, avatar: '👨‍💻' },
          { name: 'Morgan B.', score: 8400, level: 9, avatar: '👩‍💼' },
          { name: 'Chris D.', score: 7200, level: 8, avatar: '🧑‍🏫' },
          { name: 'Pat L.', score: 6500, level: 7, avatar: '👨‍🎤' },
        ];
    
    // Add the actual user data
    const allMembers = [...baseMembers, { 
      name: 'You', 
      score: userData.totalXP, 
      level: userData.level, 
      avatar: '⭐' 
    }];
    
    // Sort by score
    allMembers.sort((a, b) => b.score - a.score);
    
    // Add ranks
    return allMembers.map((member, index) => ({
      ...member,
      rank: index + 1
    }));
  };

  // Get user's rank in a squad
  const getUserRank = (squadName) => {
    const leaderboard = generateLeaderboard(squadName);
    const userEntry = leaderboard.find(entry => entry.name === 'You');
    return userEntry ? userEntry.rank : 0;
  };

  // Get top score in a squad
  const getTopScore = (squadName) => {
    const leaderboard = generateLeaderboard(squadName);
    return leaderboard.length > 0 ? leaderboard[0].score : 0;
  };

  const friendGroups = [
    { 
      name: 'Squad Alpha', 
      members: 12, 
      get yourRank() { return getUserRank(this.name); },
      get topScore() { return getTopScore(this.name); },
      description: 'Elite financial literacy champions',
      get leaderboard() { return generateLeaderboard(this.name); }
    },
    { 
      name: 'Teen Investors', 
      members: 8, 
      get yourRank() { return getUserRank(this.name); },
      get topScore() { return getTopScore(this.name); },
      description: 'Future Warren Buffetts in training',
      get leaderboard() { return generateLeaderboard(this.name); }
    },
  ];

  const globalLeaderboard = [
    { rank: 1, name: 'Sarah M.', score: 28500, level: 15, avatar: '👧' },
    { rank: 2, name: 'Mike T.', score: 26100, level: 14, avatar: '👦' },
    { rank: 3, name: 'Ashley K.', score: 24800, level: 13, avatar: '👩' },
    { rank: 4, name: 'James L.', score: 23200, level: 12, avatar: '🧑' },
    { rank: 5, name: 'Emma R.', score: 22100, level: 12, avatar: '👩‍🦰' },
  ];

  const handleViewSquad = (squad) => {
    setSelectedSquad(squad);
    setCurrentView('squadDetail');
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedSquad) {
      const newMsg = {
        id: messages[selectedSquad.name].length + 1,
        user: 'You',
        message: newMessage,
        time: 'Just now',
        avatar: '⭐'
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedSquad.name]: [newMsg, ...prev[selectedSquad.name]]
      }));
      setNewMessage('');
    }
  };

  if (currentView === 'squadDetail' && selectedSquad) {
    return (
      <div className="space-y-6">
        {/* Squad Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentView('overview')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Squads
            </button>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800">{selectedSquad.name}</h2>
              <p className="text-sm text-gray-600">{selectedSquad.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-700">{selectedSquad.members}</p>
              <p className="text-sm text-gray-600">Members</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-700">#{selectedSquad.yourRank}</p>
              <p className="text-sm text-gray-600">Your Rank</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center">
              <p className="text-2xl font-bold text-purple-700">{selectedSquad.topScore}</p>
              <p className="text-sm text-gray-600">Top Score</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Squad Leaderboard */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Squad Leaderboard</h3>
            <div className="space-y-2">
              {selectedSquad.leaderboard.slice(0, 10).map((player) => (
                <div 
                  key={player.rank} 
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    player.name === 'You' ? 'bg-gradient-to-r from-teal-50 to-green-50 border-2 border-teal-300' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      player.rank === 1 ? 'bg-yellow-400' :
                      player.rank === 2 ? 'bg-gray-300' :
                      player.rank === 3 ? 'bg-orange-400' :
                      'bg-gray-200'
                    }`}>
                      {player.rank === 1 && <Crown className="w-4 h-4 text-white" />}
                      {player.rank === 2 && <Medal className="w-4 h-4 text-white" />}
                      {player.rank === 3 && <Award className="w-4 h-4 text-white" />}
                      {player.rank > 3 && player.rank}
                    </div>
                    <div className="text-xl">{player.avatar}</div>
                    <div>
                      <p className="font-semibold text-sm">{player.name}</p>
                      <p className="text-xs text-gray-600">Level {player.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{player.score.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Squad Chat */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col h-[500px]">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Squad Chat</h3>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {messages[selectedSquad.name].map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}>
                  <div className="text-2xl flex-shrink-0">{msg.avatar}</div>
                  <div className={`max-w-[70%] ${msg.user === 'You' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-3 rounded-lg ${
                      msg.user === 'You' 
                        ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white' 
                        : 'bg-gray-100'
                    }`}>
                      <p className="text-sm font-semibold mb-1">{msg.user}</p>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-green-600"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Overview screen
  return (
    <div className="space-y-6">
      {/* Friend Squads */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Squads</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {friendGroups.map((group, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">{group.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{group.description}</p>
              <div className="space-y-2 text-sm">
                <p>Members: {group.members}</p>
                <p>Your Rank: #{group.yourRank}</p>
                <p>Top Score: {group.topScore} XP</p>
              </div>
              <button 
                onClick={() => handleViewSquad(group)}
                className="mt-4 bg-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transform transition hover:scale-105"
              >
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
                  {player.rank === 1 && <Crown className="w-5 h-5 text-white" />}
                  {player.rank === 2 && <Medal className="w-5 h-5 text-white" />}
                  {player.rank === 3 && <Award className="w-5 h-5 text-white" />}
                  {player.rank > 3 && player.rank}
                </div>
                <div className="text-2xl">{player.avatar}</div>
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