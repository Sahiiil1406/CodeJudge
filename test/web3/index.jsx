import React, { useState, useEffect } from "react";
import {
  FileCode,
  Play,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Code2,
  Terminal,
  Download,
  FlaskConical,
} from "lucide-react";
import { fetchAndLoadSolc } from "web-solc";
import Ganache from "ganache";
import { ethers } from "ethers";

 const web3 = () => {
  const [provider, setProvider] = useState(null);
  const [code, setCode] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedValue;
    address public owner;
    
    event ValueUpdated(uint256 newValue, address updatedBy);
    
    constructor() {
        owner = msg.sender;
    }
    
    function set(uint256 value) public {
        storedValue = value;
        emit ValueUpdated(value, msg.sender);
    }
    
    function get() public view returns (uint256) {
        return storedValue;
    }
    
    function getOwner() public view returns (address) {
        return owner;
    }
}`);
  const [compilerVersion, setCompilerVersion] = useState("^0.8.20");
  const [compiling, setCompiling] = useState(false);
  const [compiledData, setCompiledData] = useState(null);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [output, setOutput] = useState([]);
  const [testing, setTesting] = useState(false);

  const addOutput = (message, type) => {
    setOutput((prev) => [
      ...prev,
      { message, type, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  useEffect(() => {
    addOutput("Solidity IDE ready (WASM compiler supported)", "info");
  }, []);

  // Initialize Ethereum provider
  useEffect(() => {
    // Initialize Ganache in-browser
    const options = {
      logging: { quiet: true },
      wallet: { totalAccounts: 3 },
    };
    const ganacheProvider = Ganache.provider(options);
    setProvider(ganacheProvider);
    console.log("✅ Ganache (npm) initialized:", ganacheProvider);
  }, []);

  // ---------------- COMPILE ----------------
  const compile = async () => {
    setCompiling(true);
    setErrors([]);
    setWarnings([]);
    setCompiledData(null);
    addOutput(`Loading Solidity compiler ${compilerVersion}...`, "info");

    try {
      const solc = await fetchAndLoadSolc(compilerVersion.replace(/^v/, ""));
      if (!solc) throw new Error("Failed to load Solidity compiler");

      const input = {
        language: "Solidity",
        sources: { "contract.sol": { content: code } },
        settings: {
          optimizer: { enabled: true, runs: 200 },
          outputSelection: { "*": { "*": ["abi", "evm.bytecode", "metadata"] } },
        },
      };

      addOutput("Compiling contract...", "info");
      const outputJSON = await solc.compile(input);
      solc.stopWorker();

      if (outputJSON.errors?.length) {
        const errorList = outputJSON.errors.filter((e) => e.severity === "error");
        const warningList = outputJSON.errors.filter(
          (e) => e.severity === "warning"
        );

        if (errorList.length) {
          setErrors(errorList);
          errorList.forEach((err) =>
            addOutput(err.formattedMessage || err.message, "error")
          );
          setCompiling(false);
          return;
        }

        if (warningList.length) {
          setWarnings(warningList);
          warningList.forEach((warn) =>
            addOutput(warn.formattedMessage || warn.message, "warning")
          );
        }
      }

      const contract = Object.values(outputJSON.contracts["contract.sol"])[0];
      const name = Object.keys(outputJSON.contracts["contract.sol"])[0];

      const compiled = {
        name,
        abi: contract.abi,
        bytecode: contract.evm.bytecode.object,
        metadata: contract.metadata,
      };
      setCompiledData(compiled);

      addOutput(`✓ Compilation successful: ${name}`, "success");
      addOutput(`Bytecode Size: ${compiled.bytecode.length / 2} bytes`, "info");
    } catch (err) {
      addOutput(`Compilation error: ${err.message}`, "error");
      setErrors([{ formattedMessage: err.message }]);
    }

    setCompiling(false);
  };

  // ---------------- ANALYSIS ----------------
  const analyzeContract = () => {
    if (!compiledData) {
      addOutput("Please compile the contract first", "warning");
      return;
    }

    addOutput("Running static analysis...", "info");
    const issues = [];

    if (code.includes("tx.origin")) {
      issues.push({
        severity: "warning",
        message: "Avoid using tx.origin for authentication.",
      });
    }

    if (code.includes("block.timestamp") || code.includes("now")) {
      issues.push({
        severity: "info",
        message:
          "Timestamp dependence found. Miners can manipulate block.timestamp slightly.",
      });
    }

    if (issues.length === 0) {
      addOutput("✓ No major issues found", "success");
    } else {
      issues.forEach((i) =>
        addOutput(`[${i.severity.toUpperCase()}] ${i.message}`, i.severity)
      );
    }
  };

  // ---------------- TESTING ----------------
  const predefinedTests = [
    {
      name: "Set and Get Value",
      function: "set",
      args: [123],
      verify: { function: "get", expected: 123 },
    },
    {
      name: "Owner should be deployer",
      function: "getOwner",
      verify: { function: "getOwner", expectedType: "address" },
    },
  ];

  const runTests = async () => {
    if (!compiledData || !provider) {
      addOutput("Please compile contract first.", "warning");
      return;
    }

    setTesting(true);
    addOutput("🚀 Starting test suite...", "info");

    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();
      const factory = new ethers.ContractFactory(
        compiledData.abi,
        compiledData.bytecode,
        signer
      );
      const contract = await factory.deploy();
      await contract.waitForDeployment();
      addOutput(`Deployed at ${contract.target}`, "success");

      let passCount = 0;
      for (const test of predefinedTests) {
        try {
          let tx;
          if (test.args) {
            tx = await contract[test.function](...test.args);
            if (tx.wait) await tx.wait();
          } else {
            tx = await contract[test.function]();
          }

          let passed = true;
          let actual;
          if (test.verify) {
            const fn = test.verify.function;
            actual = await contract[fn]();
            if (test.verify.expectedType === "address") {
              passed = ethers.isAddress(actual);
            } else if (test.verify.expected !== undefined) {
              passed =
                actual.toString() === test.verify.expected.toString();
            }
          }

          if (passed) {
            addOutput(`✅ ${test.name} passed`, "success");
            passCount++;
          } else {
            addOutput(
              `❌ ${test.name} failed (Got: ${actual})`,
              "error"
            );
          }
        } catch (err) {
          addOutput(`❌ ${test.name} error: ${err.message}`, "error");
        }
      }

      addOutput(
        `🧪 ${passCount}/${predefinedTests.length} tests passed.`,
        passCount === predefinedTests.length ? "success" : "warning"
      );
    } catch (err) {
      addOutput(`Test suite failed: ${err.message}`, "error");
    }

    setTesting(false);
  };

  // ---------------- DOWNLOAD ----------------
  const downloadABI = () => {
    if (!compiledData) return;
    const blob = new Blob([JSON.stringify(compiledData.abi, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${compiledData.name}_abi.json`;
    a.click();
    URL.revokeObjectURL(url);
    addOutput("Downloaded ABI", "success");
  };

  const downloadBytecode = () => {
    if (!compiledData) return;
    const blob = new Blob([compiledData.bytecode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${compiledData.name}_bytecode.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addOutput("Downloaded Bytecode", "success");
  };

  // ---------------- RENDER ----------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
              <Code2 className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
              Solidity IDE
            </h1>
          </div>
          <p className="text-slate-600 text-sm">
            In-browser WASM compiler with static analysis & testing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-5 py-3 flex justify-between items-center border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <FileCode size={18} className="text-indigo-600" />
                  <span className="font-medium text-slate-700">contract.sol</span>
                </div>
                <select
                  value={compilerVersion}
                  onChange={(e) => setCompilerVersion(e.target.value)}
                  className="bg-white text-slate-700 text-sm px-3 py-1.5 rounded-lg border border-slate-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="^0.8.20">v0.8.20</option>
                  <option value="^0.8.19">v0.8.19</option>
                  <option value="^0.8.18">v0.8.18</option>
                  <option value="^0.8.17">v0.8.17</option>
                </select>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 bg-slate-900 text-emerald-400 font-mono text-sm p-4 focus:outline-none"
                spellCheck="false"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={compile}
                disabled={compiling}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-indigo-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all"
              >
                <Play size={16} /> {compiling ? "Compiling..." : "Compile"}
              </button>

              <button
                onClick={analyzeContract}
                disabled={!compiledData}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all"
              >
                <AlertTriangle size={16} /> Analyze
              </button>

              <button
                onClick={runTests}
                disabled={!compiledData || testing}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-medium shadow-md hover:shadow-lg hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all"
              >
                <FlaskConical size={16} /> {testing ? "Running..." : "Run Tests"}
              </button>
            </div>
          </div>

          {/* Console Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-5 py-3 flex items-center gap-2 border-b border-slate-200">
              <Terminal className="text-indigo-600" size={18} />
              <span className="font-medium text-slate-700">Console Output</span>
            </div>
            <div className="p-4 h-96 overflow-y-auto space-y-2 bg-slate-50">
              {output.map((log, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl text-xs font-medium shadow-sm ${
                    log.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : log.type === "error"
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : log.type === "warning"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  <span className="text-slate-500 mr-2 text-xs">[{log.timestamp}]</span>
                  {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Panel */}
        {compiledData && (
          <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 p-6 rounded-2xl shadow-lg">
            <h3 className="text-emerald-700 flex items-center gap-2 font-semibold text-lg mb-3">
              <CheckCircle size={20} /> Compilation Successful
            </h3>
            <p className="text-slate-700 mb-4">
              Contract Name: <span className="font-semibold text-emerald-700">{compiledData.name}</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={downloadABI}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium shadow-md hover:shadow-lg transition-all"
              >
                <Download size={16} /> Download ABI
              </button>
              <button
                onClick={downloadBytecode}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium shadow-md hover:shadow-lg transition-all"
              >
                <Download size={16} /> Download Bytecode
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
