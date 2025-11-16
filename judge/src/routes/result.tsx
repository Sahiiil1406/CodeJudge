import { Link, createFileRoute } from '@tanstack/react-router'
import { useAction } from 'convex/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'

export const Route = createFileRoute('/result')({
  component: ResultScreen,
})

import React, { useState, useEffect } from 'react'
import {
  Trophy,
  TrendingUp,
  Award,
  Target,
  X,
  RotateCcw,
  Home,
  ChevronRight,
  Flame,
  Zap,
} from 'lucide-react'

function ResultScreen() {
  const [result] = useState('loser') // Change to 'loser' to see loss screen
  const [showConfetti, setShowConfetti] = useState(false)
  const [stats, setStats] = useState({
    score: 0,
    time: 0,
    accuracy: 0,
    rank: 0,
  })

  useEffect(() => {
    if (result === 'winner') {
      setShowConfetti(true)
      // Animate stats
      const interval = setInterval(() => {
        setStats((prev) => ({
          score: Math.min(prev.score + 43, 2847),
          time: Math.min(prev.time + 1, 45),
          accuracy: Math.min(prev.accuracy + 3.2, 96),
          rank: Math.min(prev.rank + 12, 847),
        }))
      }, 30)

      return () => clearInterval(interval)
    } else {
      setStats({
        score: 1543,
        time: 68,
        accuracy: 73,
        rank: 2341,
      })
    }
  }, [result])

  // Winner Screen
  if (result === 'winner') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6',
                  ][Math.floor(Math.random() * 5)],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-emerald-900/20 via-black to-black" />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Glowing particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.6 + 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-3xl w-full px-8">
          {/* Victory Badge */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <Trophy className="w-16 h-16 text-white animate-bounce" />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-emerald-400 animate-pulse" />
              <span className="text-sm tracking-widest text-emerald-400 font-bold">
                VICTORY
              </span>
              <Flame className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
              YOU WON!
            </h1>
            <p className="text-xl text-gray-400">
              Outstanding performance! You dominated the challenge.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-900/50 backdrop-blur border border-emerald-500/30 rounded-lg p-6 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-sm text-gray-400">Total Score</div>
              </div>
              <div className="text-4xl font-bold text-emerald-400 font-mono">
                {Math.floor(stats.score)}
              </div>
              <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+847 ELO</span>
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-sm text-gray-400">Completion Time</div>
              </div>
              <div className="text-4xl font-bold font-mono">
                {Math.floor(stats.time)}
                <span className="text-2xl text-gray-500">s</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Faster than 78% of players
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
              <div className="text-4xl font-bold font-mono">
                {Math.floor(stats.accuracy)}
                <span className="text-2xl text-gray-500">%</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Excellent precision
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-sm text-gray-400">Global Rank</div>
              </div>
              <div className="text-4xl font-bold font-mono">
                #{Math.floor(stats.rank)}
              </div>
              <div className="text-xs text-gray-500 mt-1">Top 2% worldwide</div>
            </div>
          </div>

          {/* Achievement Banner */}
          <div className="bg-gradient-to-r from-emerald-900/30 via-emerald-800/30 to-emerald-900/30 border border-emerald-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg text-emerald-400">
                    Achievement Unlocked!
                  </div>
                  <div className="text-gray-400">
                    First Victory - Complete your first competitive match
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-yellow-400">+500 XP</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group">
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Play Again</span>
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group">
              <Home className="w-5 h-5" />
              <span
                onClick={() => {
                  //navigate to submission page
                  window.location.href = '/'
                }}
              >
                Home
              </span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <style>{`
          @keyframes fall {
            to {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
          .animate-fall {
            animation: fall linear forwards;
          }
        `}</style>
      </div>
    )
  }

  // Loser Screen
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-red-900/10 via-black to-black" />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full px-8">
        {/* Defeat Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 rounded-full blur-3xl opacity-30" />
            <div className="relative w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-500/30">
              <X className="w-16 h-16 text-red-400" />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-sm tracking-widest text-red-400 font-bold">
              DEFEAT
            </span>
          </div>
          <h1 className="text-6xl font-bold mb-4 text-gray-300">YOU LOST</h1>
          <p className="text-xl text-gray-400">
            Don't give up! Every loss is a learning opportunity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-sm text-gray-400">Total Score</div>
            </div>
            <div className="text-4xl font-bold text-gray-300 font-mono">
              {stats.score}
            </div>
            <div className="text-xs text-red-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 rotate-180" />
              <span>-143 ELO</span>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-sm text-gray-400">Completion Time</div>
            </div>
            <div className="text-4xl font-bold font-mono text-gray-300">
              {stats.time}
              <span className="text-2xl text-gray-500">s</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Could be faster</div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
            <div className="text-4xl font-bold font-mono text-gray-300">
              {stats.accuracy}
              <span className="text-2xl text-gray-500">%</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Room for improvement
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-sm text-gray-400">Global Rank</div>
            </div>
            <div className="text-4xl font-bold font-mono text-gray-300">
              #{stats.rank}
            </div>
            <div className="text-xs text-gray-500 mt-1">Keep practicing</div>
          </div>
        </div>

        {/* Motivation Banner */}
        <div className="bg-gradient-to-r from-gray-900/50 via-gray-800/50 to-gray-900/50 border border-gray-700 rounded-lg p-6 mb-8">
          <div className="text-center">
            <div className="font-bold text-lg text-gray-300 mb-2">
              💪 Keep Going!
            </div>
            <div className="text-gray-400">
              "Success is not final, failure is not fatal: it is the courage to
              continue that counts."
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group">
            <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span>Try Again</span>
          </button>
          <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group">
            <Home className="w-5 h-5" />
            <span
              onClick={() => {
                //navigate to submission page
                window.location.href = '/'
              }}
            >
              Home
            </span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
