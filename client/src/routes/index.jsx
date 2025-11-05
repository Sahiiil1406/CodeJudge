import { Link, createFileRoute } from '@tanstack/react-router'
import { useMutation } from 'convex/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '../../convex/_generated/api'
import { Navigate } from '@tanstack/react-router'
import React from 'react';
import { Code2, Database, Hexagon, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react';

const Home = () => {
  const categories = [
    {
      title: 'Frontend Developer',
      description: 'Master React, TypeScript & modern UI frameworks',
      icon: Code2,
      path: '/frontend',
      color: 'blue'
    },
    {
      title: 'Data Engineer',
      description: 'SQL queries, data pipelines & analytics',
      icon: Database,
      path: '/sql',
      color: 'purple'
    },
    {
      title: 'Smart Contract Developer',
      description: 'Solidity, Web3 & blockchain fundamentals',
      icon: Hexagon,
      path: '/web3',
      color: 'orange'
    },
    {
      title: 'Full Stack',
      description: 'End-to-end development challenges',
      icon: Terminal,
      path: '/fullstack',
      color: 'green'
    }
  ];

  const features = [
    'Real-time code execution',
    'Detailed test cases',
    'Performance metrics'
  ];
  const handleNavigation = (path) => {
    window.location.href = path;
  }
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#72e3ad] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#1e2723]">CodeJudge</h1>
                <p className="text-xs text-gray-500">Practice Platform</p>
              </div>
            </div>
            <button className="px-5 py-2.5 text-sm font-medium text-[#1e2723] border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8faf3] border border-[#72e3ad]/30 text-[#1e2723] text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4 text-[#72e3ad]" />
            Trusted by 50,000+ developers
          </div>
          <h2 className="text-5xl font-bold text-[#1e2723] mb-4 tracking-tight">
            Choose Your Path to
            <br />
            <span className="text-[#72e3ad]">Master Coding</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Practice with real-world coding challenges. Get instant feedback and level up your skills across multiple domains.
          </p>
          
          {/* Features Pills */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#72e3ad]"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.path}
                onClick={() => handleNavigation(category.path)}
                className="group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 p-8 text-left"
              >
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#72e3ad] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                    <Icon className="w-7 h-7 text-black" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[#1e2723] mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {category.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#1e2723] font-medium text-sm">
                    <span>Start practicing</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>

                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf7] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl border border-gray-200 bg-white p-10 shadow-sm">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#1e2723] mb-1">500+</div>
                <div className="text-sm text-gray-600 font-medium">Challenges</div>
              </div>
              <div className="text-center border-x border-gray-200">
                <div className="text-4xl font-bold text-[#1e2723] mb-1">50K+</div>
                <div className="text-sm text-gray-600 font-medium">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#1e2723] mb-1">4</div>
                <div className="text-sm text-gray-600 font-medium">Domains</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-sm text-gray-500">
            © 2025 CodeJudge. Built for developers, by developers.
          </div>
        </div>
      </footer>
    </div>
  );
};


export const Route = createFileRoute('/')({
  component: Home,
})