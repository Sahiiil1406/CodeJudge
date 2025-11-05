import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/problems')({
  component: QuestionList,
})
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from '@tanstack/react-router';

const QuestionList = () => {
  const navigate = useNavigate();

  const questions = [
    { id: 1, title: "Build a Responsive TODO App", level: "easy", category: "frontend", description: "Create a responsive TODO app with add/edit/delete and persistent storage.", tags: ["React", "CSS Grid", "LocalStorage"], likes: 230, posted: "2025-10-25" },
    { id: 2, title: "E-commerce Database Schema", level: "medium", category: "schema-design", description: "Design normalized SQL tables for users, orders, and products.", tags: ["SQL", "Normalization", "ER Diagram"], likes: 148, posted: "2025-10-22" },
    { id: 3, title: "NFT Marketplace Smart Contract", level: "hard", category: "web3", description: "Write a Solidity contract for minting and trading NFTs with royalty support.", tags: ["Solidity", "ERC721", "Hardhat"], likes: 312, posted: "2025-09-30" },
    { id: 4, title: "Portfolio Website with Animations", level: "easy", category: "frontend", description: "Build a modern portfolio website with smooth scroll and framer motion animations.", tags: ["React", "Framer Motion", "Tailwind"], likes: 275, posted: "2025-10-18" },
    { id: 5, title: "Ride-Sharing Schema Design", level: "medium", category: "schema-design", description: "Design a scalable database for a ride-sharing platform with trip logs and payments.", tags: ["PostgreSQL", "Joins", "Keys"], likes: 201, posted: "2025-09-10" },
    { id: 6, title: "Decentralized Voting Smart Contract", level: "hard", category: "web3", description: "Implement a Solidity voting contract ensuring only one vote per address.", tags: ["Blockchain", "Solidity", "Security"], likes: 187, posted: "2025-08-29" },
    { id: 7, title: "Chat UI using React Hooks", level: "easy", category: "frontend", description: "Design a simple real-time chat interface using React and basic WebSockets.", tags: ["React", "Hooks", "WebSocket"], likes: 112, posted: "2025-09-15" },
    { id: 8, title: "Social Media Schema", level: "medium", category: "schema-design", description: "Create SQL tables for posts, likes, comments, and users efficiently.", tags: ["SQL", "Design", "Indexes"], likes: 250, posted: "2025-09-08" },
    { id: 9, title: "Token Swap Smart Contract", level: "hard", category: "web3", description: "Develop a Solidity DEX smart contract for swapping ERC20 tokens securely.", tags: ["Web3", "Solidity", "DEX"], likes: 355, posted: "2025-07-12" },
    { id: 10, title: "Weather Dashboard UI", level: "easy", category: "frontend", description: "Create a weather dashboard fetching data from OpenWeather API.", tags: ["API", "React", "Axios"], likes: 159, posted: "2025-08-20" },
    { id: 11, title: "Inventory Management DB Schema", level: "medium", category: "schema-design", description: "Design a relational schema for managing product stock and suppliers.", tags: ["SQL", "Inventory", "Keys"], likes: 143, posted: "2025-09-02" },
    { id: 12, title: "DeFi Lending Protocol", level: "hard", category: "web3", description: "Design and implement a Solidity smart contract simulating lending and borrowing.", tags: ["SmartContract", "DeFi", "Security"], likes: 310, posted: "2025-08-01" },
    { id: 13, title: "Music Player App", level: "easy", category: "frontend", description: "Build a React music player with play/pause and playlist features.", tags: ["React", "Hooks", "Audio API"], likes: 189, posted: "2025-09-21" },
    { id: 14, title: "Online Learning Platform Schema", level: "medium", category: "schema-design", description: "Model courses, lessons, and student progress efficiently in SQL.", tags: ["SQL", "Schema", "Optimization"], likes: 220, posted: "2025-08-10" },
    { id: 15, title: "Crowdfunding Smart Contract", level: "hard", category: "web3", description: "Write a Solidity contract to manage project funding with milestone verification.", tags: ["Solidity", "Crowdfunding", "Events"], likes: 335, posted: "2025-07-05" },
    { id: 16, title: "Responsive Landing Page", level: "easy", category: "frontend", description: "Design a responsive landing page using TailwindCSS and grid layout.", tags: ["HTML", "Tailwind", "Flexbox"], likes: 190, posted: "2025-09-13" },
    { id: 17, title: "Banking System Schema Design", level: "medium", category: "schema-design", description: "Design a robust SQL schema for customer accounts, transactions, and logs.", tags: ["SQL", "Schema", "Transactions"], likes: 267, posted: "2025-08-26" },
    { id: 18, title: "DAO Governance Smart Contract", level: "hard", category: "web3", description: "Create a DAO contract where token holders can vote on proposals.", tags: ["Solidity", "DAO", "Governance"], likes: 402, posted: "2025-07-18" },
    { id: 19, title: "Quiz App with Leaderboard", level: "easy", category: "frontend", description: "Develop a quiz app with timer and live leaderboard using React.", tags: ["React", "Timer", "State"], likes: 298, posted: "2025-10-01" },
    { id: 20, title: "Hospital Management Schema", level: "medium", category: "schema-design", description: "Design a complete SQL database for hospital patients, staff, and billing.", tags: ["Database", "Schema", "SQL"], likes: 176, posted: "2025-09-11" }
  ];

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const currentQuestions = questions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClick = (category) => {
    if (category === "frontend"){
        navigate({ to: '/frontend' });
    } else if (category === "schema-design") {
        navigate({ to: '/sql' });
    } else if (category === "web3") {
        navigate({ to: '/web3' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-semibold mb-10 text-center text-[#34a85a] bold">
          Coding Problems
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentQuestions.map((q) => (
            <div
              key={q.id}
              onClick={() => handleClick(q.category)}
              className="border border-gray-200 rounded-xl p-5 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                    q.level === "easy"
                      ? "bg-green-100 text-green-600"
                      : q.level === "medium"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {q.level.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">{q.posted}</span>
              </div>

              <h2 className="text-base font-medium mb-1 text-gray-800">{q.title}</h2>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {q.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {q.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>❤️ {q.likes}</span>
                <span
                  className={`font-medium ${
                    q.category === "frontend"
                      ? "text-blue-600"
                      : q.category === "schema-design"
                      ? "text-teal-600"
                      : "text-purple-600"
                  }`}
                >
                  {q.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-10 gap-3">
          <button
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// export default QuestionList;
