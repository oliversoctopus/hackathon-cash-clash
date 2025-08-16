import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Trophy, Users, TrendingUp, DollarSign, Target, Zap, Home, Gamepad2, User, Clock, AlertTriangle, CheckCircle, XCircle, Shield, ShoppingCart, Heart, Car } from 'lucide-react';

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

// Enhanced Budget Builder Game Component with 12-month cycle
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
    { id: 'car', name: 'Car Payment', icon: Car, minAmount: 200, maxAmount: 400, priority: 'essential' },
    { id: 'food', name: 'Food & Groceries', icon: ShoppingCart, minAmount: 300, maxAmount: 500, priority: 'essential' },
    { id: 'insurance', name: 'Insurance', icon: Shield, minAmount: 150, maxAmount: 250, priority: 'essential' },
    { id: 'entertainment', name: 'Entertainment', icon: Zap, minAmount: 50, maxAmount: 200, priority: 'want' },
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
      } else {
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
      feedback.push('✗ Missing essential expenses');
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
    }

    // Check if budget is balanced
    const totalAllocated = Object.values(allocations).reduce((sum, item) => sum + item.amount, 0);
    const unexpectedCost = unexpectedEvent ? unexpectedEvent.cost : 0;
    
    if (totalAllocated === monthlyIncome) {
      monthScore += 100;
      feedback.push('✓ Budget perfectly balanced');
    } else if (Math.abs(totalAllocated - monthlyIncome) <= 100) {
      monthScore += 50;
      feedback.push('○ Budget nearly balanced');
    } else {
      feedback.push('✗ Budget unbalanced');
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
    
    if (timeLeft > 0 || Object.keys(allocations).length > 0) {
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
            <h3 className="text-2xl font-semibold mb-4">Welcome to the 12-Month Budget Challenge!</h3>
            <p className="text-gray-600 mb-6">
              Navigate a full year of budgeting with unexpected events and real-world scenarios.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">📋 How to Play:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• $3,000 monthly income</li>
                <li>• Drag requirements into categories</li>
                <li>• Balance before timer runs out</li>
                <li>• Handle unexpected events</li>
                <li>• Complete all 12 months</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">🏆 Scoring:</h4>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Cover essentials: +200 pts</li>
                <li>• Save money: +75-150 pts</li>
                <li>• Balance budget: +100 pts</li>
                <li>• Handle emergencies: +200 pts</li>
                <li>• Total XP earned at year end!</li>
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
            <div className="space-y-2">
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
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {remaining === 0 ? 'Submit Budget' : `Balance Budget (${remaining > 0 ? '+' : ''}$${remaining})`}
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
              <div key={idx} className="flex items-center gap-2">
                {item.startsWith('✓') && <CheckCircle className="w-5 h-5 text-green-500" />}
                {item.startsWith('✗') && <XCircle className="w-5 h-5 text-red-500" />}
                {item.startsWith('○') && <div className="w-5 h-5 rounded-full bg-yellow-500" />}
                <span>{item.replace(/^[✓✗○]\s/, '')}</span>
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