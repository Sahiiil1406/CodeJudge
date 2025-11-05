import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sql')({
  component: SQLLearningPlatform,
})
import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  addEdge, 
  useNodesState, 
  useEdgesState,
  Handle,
  Position 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Database, Play, Plus, Trash2, X, AlertCircle, BookOpen, Trophy, RefreshCw, Code } from 'lucide-react';

// ==================== SQL ENGINE ====================
class SimpleDB {
  constructor() {
    this.tables = {};
  }

  run(sql) {
    const normalized = sql.trim().toLowerCase();
    
    if (normalized.startsWith('create table')) {
      const match = sql.match(/create table (\w+)/i);
      if (match) {
        const tableName = match[1].toLowerCase();
        this.tables[tableName] = [];
      }
    } else if (normalized.startsWith('drop table')) {
      const match = sql.match(/drop table(?: if exists)? (\w+)/i);
      if (match) {
        delete this.tables[match[1].toLowerCase()];
      }
    } else if (normalized.startsWith('delete from')) {
      const match = sql.match(/delete from (\w+)/i);
      if (match) {
        this.tables[match[1].toLowerCase()] = [];
      }
    } else if (normalized.startsWith('insert into')) {
      const tableMatch = sql.match(/insert into (\w+)/i);
      const tableName = tableMatch[1].toLowerCase();
      
      const valuesMatch = sql.match(/values\s*\((.*?)\)/i);
      if (valuesMatch && this.tables[tableName]) {
        const values = valuesMatch[1].split(',').map(v => {
          v = v.trim();
          if (v.startsWith("'") && v.endsWith("'")) {
            return v.slice(1, -1);
          }
          return isNaN(v) ? v : Number(v);
        });
        this.tables[tableName].push(values);
      }
    }
  }

  exec(sql) {
    const normalized = sql.trim().toLowerCase();
    
    if (normalized.startsWith('select')) {
      const fromMatch = sql.match(/from\s+(\w+)/i);
      if (!fromMatch) return [];
      
      const tableName = fromMatch[1].toLowerCase();
      const table = this.tables[tableName] || [];
      
      let filteredData = [...table];
      const whereMatch = sql.match(/where\s+(.+?)(?:$|order|limit|group)/i);
      if (whereMatch) {
        const condition = whereMatch[1].trim();
        filteredData = this.filterData(filteredData, condition);
      }
      
      if (normalized.includes('count(*)')) {
        return [{
          columns: ['COUNT(*)'],
          values: [[filteredData.length]]
        }];
      }
      
      if (normalized.includes('group by')) {
        const groupMatch = sql.match(/group by\s+(\w+)/i);
        if (groupMatch && normalized.includes('count(*)')) {
          const groupCol = groupMatch[1].toLowerCase();
          const colIndex = this.getColumnIndex(tableName, groupCol);
          
          const grouped = {};
          filteredData.forEach(row => {
            const key = row[colIndex];
            grouped[key] = (grouped[key] || 0) + 1;
          });
          
          return [{
            columns: [groupCol, 'COUNT(*)'],
            values: Object.entries(grouped).map(([k, v]) => [k, v])
          }];
        }
      }
      
      const columns = this.getTableColumns(tableName);
      
      return [{
        columns: columns,
        values: filteredData
      }];
    }
    
    return [];
  }

  execRawQuery(sql) {
    return this.exec(sql);
  }

  filterData(data, condition) {
    if (condition.includes('like')) {
      const match = condition.match(/(\w+)\s+like\s+'([^']+)'/i);
      if (match) {
        const pattern = match[2].replace(/%/g, '.*');
        const regex = new RegExp(pattern, 'i');
        
        return data.filter(row => {
          return row.some(cell => regex.test(String(cell)));
        });
      }
    }
    
    if (condition.includes('=')) {
      const match = condition.match(/(\w+)\s*=\s*'([^']+)'/i);
      if (match) {
        const value = match[2];
        return data.filter(row => {
          return row.some(cell => String(cell) === value);
        });
      }
      
      const numMatch = condition.match(/(\w+)\s*=\s*(\d+)/i);
      if (numMatch) {
        const value = Number(numMatch[2]);
        return data.filter(row => row[0] === value);
      }
    }
    
    if (condition.includes('>')) {
      const match = condition.match(/(\w+)\s*>\s*(\d+(?:\.\d+)?)/i);
      if (match) {
        const threshold = Number(match[2]);
        return data.filter(row => {
          const value = row[row.length - 1];
          return Number(value) > threshold;
        });
      }
    }
    
    return data;
  }

  getTableColumns(tableName) {
    if (tableName === 'users') {
      return ['id', 'name', 'email', 'password'];
    } else if (tableName === 'customers') {
      return ['id', 'name', 'email'];
    } else if (tableName === 'orders') {
      return ['id', 'customer_id', 'order_date', 'total'];
    } else if (tableName === 'posts') {
      return ['id', 'author_id', 'content', 'created_at'];
    } else if (tableName === 'likes') {
      return ['id', 'user_id', 'post_id'];
    }
    return ['col1', 'col2', 'col3'];
  }

  getColumnIndex(tableName, columnName) {
    const cols = this.getTableColumns(tableName);
    return cols.indexOf(columnName.toLowerCase());
  }

  getTableNames() {
    return Object.keys(this.tables);
  }
}

// ==================== PROBLEM DEFINITIONS ====================
const PROBLEMS = [
  {
    id: 1,
    title: "User Authentication System",
    difficulty: "Easy",
    description: "Design a user authentication database with proper schema and query capabilities",
    requirements: [
      "Create a 'users' table with id, name, email, and password columns",
      "The id column should be the primary key",
      "Store user's full name for display purposes",
      "Email should be used for login authentication",
      "Password field for secure authentication"
    ],
    hints: [
      "Start by clicking 'Add Table' to create the users table",
      "Use INT for id, VARCHAR(255) for text fields",
      "Mark id as Primary Key (PK)",
      "Make sure all required columns are present"
    ],
    testCases: [
      {
        name: "Schema Validation",
        type: "schema",
        description: "Verify users table has all required columns",
        expectedTables: [
          {
            name: "users",
            columns: ["id", "name", "email", "password"]
          }
        ],
        points: 30
      },
      {
        name: "Get All Users",
        type: "query",
        description: "SELECT * FROM users",
        query: "SELECT * FROM users",
        seedData: [
          [1, 'Alice Johnson', 'alice@gmail.com', 'alice123'],
          [2, 'Bob Smith', 'bob@yahoo.com', 'bob456'],
          [3, 'Charlie Brown', 'charlie@gmail.com', 'charlie789'],
          [4, 'Diana Prince', 'diana@outlook.com', 'diana321'],
          [5, 'Eve Wilson', 'eve@gmail.com', 'eve654']
        ],
        expectedOutput: [
          [1, 'Alice Johnson', 'alice@gmail.com', 'alice123'],
          [2, 'Bob Smith', 'bob@yahoo.com', 'bob456'],
          [3, 'Charlie Brown', 'charlie@gmail.com', 'charlie789'],
          [4, 'Diana Prince', 'diana@outlook.com', 'diana321'],
          [5, 'Eve Wilson', 'eve@gmail.com', 'eve654']
        ],
        points: 15
      },
      {
        name: "Find Gmail Users",
        type: "query",
        description: "SELECT * FROM users WHERE email LIKE '%gmail.com%'",
        query: "SELECT * FROM users WHERE email LIKE '%gmail.com%'",
        expectedOutput: [
          [1, 'Alice Johnson', 'alice@gmail.com', 'alice123'],
          [3, 'Charlie Brown', 'charlie@gmail.com', 'charlie789'],
          [5, 'Eve Wilson', 'eve@gmail.com', 'eve654']
        ],
        points: 20
      },
      {
        name: "Get Specific User",
        type: "query",
        description: "SELECT * FROM users WHERE email = 'bob@yahoo.com'",
        query: "SELECT * FROM users WHERE email = 'bob@yahoo.com'",
        expectedOutput: [
          [2, 'Bob Smith', 'bob@yahoo.com', 'bob456']
        ],
        points: 15
      },
      {
        name: "Count Total Users",
        type: "query",
        description: "SELECT COUNT(*) FROM users",
        query: "SELECT COUNT(*) FROM users",
        expectedOutput: [[5]],
        points: 20
      }
    ]
  },
  {
    id: 2,
    title: "E-Commerce Order System",
    difficulty: "Medium",
    description: "Design a two-table database system for tracking customer orders",
    requirements: [
      "Create a 'customers' table with id, name, and email",
      "Create an 'orders' table with id, customer_id, order_date, and total",
      "Link orders to customers using customer_id as foreign key",
      "Support tracking order dates and monetary totals"
    ],
    hints: [
      "You need two separate tables",
      "The orders.customer_id should reference customers.id",
      "Mark customer_id in orders as a Foreign Key (FK)",
      "Use DECIMAL type for monetary values"
    ],
    testCases: [
      {
        name: "Schema Validation",
        type: "schema",
        description: "Verify both customers and orders tables exist with correct structure",
        expectedTables: [
          {
            name: "customers",
            columns: ["id", "name", "email"]
          },
          {
            name: "orders",
            columns: ["id", "customer_id", "order_date", "total"]
          }
        ],
        points: 40
      },
      {
        name: "Get All Customers",
        type: "query",
        description: "SELECT * FROM customers",
        query: "SELECT * FROM customers",
        seedData: {
          customers: [
            [1, 'John Doe', 'john@example.com'],
            [2, 'Jane Smith', 'jane@example.com'],
            [3, 'Bob Wilson', 'bob@example.com']
          ],
          orders: [
            [1, 1, '2024-01-15', 99.99],
            [2, 1, '2024-02-20', 149.50],
            [3, 2, '2024-01-10', 299.99],
            [4, 3, '2024-03-05', 49.99]
          ]
        },
        expectedOutput: [
          [1, 'John Doe', 'john@example.com'],
          [2, 'Jane Smith', 'jane@example.com'],
          [3, 'Bob Wilson', 'bob@example.com']
        ],
        points: 20
      },
      {
        name: "Find High Value Orders",
        type: "query",
        description: "SELECT * FROM orders WHERE total > 100",
        query: "SELECT * FROM orders WHERE total > 100",
        expectedOutput: [
          [2, 1, '2024-02-20', 149.50],
          [3, 2, '2024-01-10', 299.99]
        ],
        points: 20
      },
      {
        name: "Count Total Orders",
        type: "query",
        description: "SELECT COUNT(*) FROM orders",
        query: "SELECT COUNT(*) FROM orders",
        expectedOutput: [[4]],
        points: 20
      }
    ]
  }
];

// ==================== CUSTOM TABLE NODE ====================
const TableNode = ({ data }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md min-w-[220px]">
      <div className="bg-[#34a85a] text-white px-4 py-3 font-semibold rounded-t-lg flex items-center gap-2">
        <Database size={18} />
        <span className="text-base">{data.label}</span>
      </div>
      <div className="p-3 bg-white">
        {data.columns?.map((col, idx) => (
          <div key={idx} className="py-2 px-3 text-sm border-b border-gray-100 last:border-b-0 flex items-center gap-2 hover:bg-gray-50">
            {col.isPrimary && <span className="text-yellow-500 text-base">🔑</span>}
            {col.isForeign && <span className="text-purple-500 text-base">🔗</span>}
            <span className="font-medium text-gray-900">{col.name}</span>
            <span className="text-gray-500 text-xs ml-auto">({col.type})</span>
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-[#34a85a]" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-[#34a85a]" />
    </div>
  );
};

const nodeTypes = {
  tableNode: TableNode,
};

// ==================== MAIN COMPONENT ====================
 function SQLLearningPlatform() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [db] = useState(() => new SimpleDB());
  
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showProblemList, setShowProblemList] = useState(true);
  
  const [testResults, setTestResults] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [userQuery, setUserQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  
  const [feedback, setFeedback] = useState('');
  const [showTableForm, setShowTableForm] = useState(false);
  const [newTable, setNewTable] = useState({ 
    name: '', 
    columns: [{ name: '', type: 'VARCHAR(255)', isPrimary: false, isForeign: false }] 
  });
  const [sqlGenerated, setSqlGenerated] = useState('');

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const selectProblem = (problem) => {
    setSelectedProblem(problem);
    setShowProblemList(false);
    setNodes([]);
    setEdges([]);
    setTestResults([]);
    setTotalScore(0);
    setFeedback('');
    setSqlGenerated('');
    setUserQuery('');
    setQueryResult(null);
  };

  const addColumn = () => {
    setNewTable({
      ...newTable,
      columns: [...newTable.columns, { name: '', type: 'VARCHAR(255)', isPrimary: false, isForeign: false }]
    });
  };

  const updateColumn = (index, field, value) => {
    const updatedColumns = [...newTable.columns];
    if (field === 'isPrimary' && value) {
      updatedColumns.forEach((col, idx) => {
        if (idx !== index) col.isPrimary = false;
      });
    }
    updatedColumns[index][field] = value;
    setNewTable({ ...newTable, columns: updatedColumns });
  };

  const removeColumn = (index) => {
    if (newTable.columns.length === 1) {
      alert('Table must have at least one column');
      return;
    }
    const updatedColumns = newTable.columns.filter((_, i) => i !== index);
    setNewTable({ ...newTable, columns: updatedColumns });
  };

  const createTable = () => {
    if (!newTable.name || !newTable.name.trim()) {
      alert('Please provide a table name');
      return;
    }

    const validColumns = newTable.columns.filter(c => c.name && c.name.trim());
    if (validColumns.length === 0) {
      alert('Please provide at least one column with a name');
      return;
    }

    const hasPrimaryKey = validColumns.some(c => c.isPrimary);
    if (!hasPrimaryKey) {
      alert('Please designate at least one column as PRIMARY KEY');
      return;
    }

    const newNode = {
      id: `table-${Date.now()}`,
      type: 'tableNode',
      position: { x: 100 + nodes.length * 280, y: 100 + nodes.length * 50 },
      data: { 
        label: newTable.name, 
        columns: validColumns 
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setShowTableForm(false);
    setNewTable({ name: '', columns: [{ name: '', type: 'VARCHAR(255)', isPrimary: false, isForeign: false }] });
    setFeedback('✅ Table added! Continue designing or click "Run All Tests"');
  };

  const generateSQL = () => {
    if (nodes.length === 0) {
      return '';
    }

    let sql = '-- Database Schema\n\n';
    
    nodes.forEach(node => {
      const tableName = node.data.label;
      const columns = node.data.columns;
      
      sql += `CREATE TABLE ${tableName} (\n`;
      sql += columns.map(col => {
        let colDef = `  ${col.name} ${col.type}`;
        if (col.isPrimary) colDef += ' PRIMARY KEY';
        return colDef;
      }).join(',\n');
      sql += '\n);\n\n';
    });

    return sql;
  };

  const runAllTests = async () => {
    if (nodes.length === 0) {
      setFeedback('⚠️ Please design your database schema first by adding tables');
      return;
    }

    setTestResults([]);
    setTotalScore(0);
    setFeedback('🧪 Running tests...');

    const results = [];
    let score = 0;

    const ddl = generateSQL();
    setSqlGenerated(ddl);

    try {
      db.getTableNames().forEach(tableName => {
        db.run(`DROP TABLE IF EXISTS ${tableName}`);
      });

      const statements = ddl.split(';').filter(s => s.trim() && !s.trim().startsWith('--'));
      statements.forEach(statement => {
        if (statement.trim()) {
          db.run(statement);
        }
      });

      for (let i = 0; i < selectedProblem.testCases.length; i++) {
        const testCase = selectedProblem.testCases[i];
        const result = await runTestCase(testCase);
        results.push(result);
        if (result.passed) {
          score += testCase.points;
        }
      }

      setTestResults(results);
      setTotalScore(score);
      
      const maxScore = selectedProblem.testCases.reduce((sum, tc) => sum + tc.points, 0);
      const percentage = Math.round((score / maxScore) * 100);
      
      if (percentage === 100) {
        setFeedback(`🎉 Perfect! All tests passed! Score: ${score}/${maxScore} (${percentage}%)`);
      } else if (percentage >= 70) {
        setFeedback(`✅ Good job! Score: ${score}/${maxScore} (${percentage}%). Check failed tests below.`);
      } else {
        setFeedback(`❌ Some tests failed. Score: ${score}/${maxScore} (${percentage}%). Review feedback and try again.`);
      }
    } catch (error) {
      setFeedback(`❌ Error running tests: ${error.message}`);
      console.error('Test execution error:', error);
    }
  };

  const runTestCase = async (testCase) => {
    try {
      if (testCase.type === 'schema') {
        return validateSchema(testCase);
      } else if (testCase.type === 'query') {
        return await validateQuery(testCase);
      }
    } catch (error) {
      return {
        name: testCase.name,
        passed: false,
        message: `Error: ${error.message}`,
        points: 0,
        maxPoints: testCase.points,
        query: testCase.query
      };
    }
  };

  const validateSchema = (testCase) => {
    const actualTables = nodes.map(n => ({
      name: n.data.label.toLowerCase(),
      columns: n.data.columns.map(c => c.name.toLowerCase())
    }));

    const expectedTables = testCase.expectedTables.map(t => ({
      name: t.name.toLowerCase(),
      columns: t.columns.map(c => c.toLowerCase())
    }));

    let missingTables = [];
    let missingColumns = [];

    expectedTables.forEach(expected => {
      const found = actualTables.find(t => t.name === expected.name);
      if (!found) {
        missingTables.push(expected.name);
      } else {
        expected.columns.forEach(col => {
          if (!found.columns.includes(col)) {
            missingColumns.push(`${expected.name}.${col}`);
          }
        });
      }
    });

    const passed = missingTables.length === 0 && missingColumns.length === 0;
    
    let message = '';
    if (passed) {
      message = '✅ Schema structure is correct!';
    } else {
      if (missingTables.length > 0) {
        message += `Missing tables: ${missingTables.join(', ')}. `;
      }
      if (missingColumns.length > 0) {
        message += `Missing columns: ${missingColumns.join(', ')}`;
      }
    }

    return {
      name: testCase.name,
      passed,
      message,
      points: passed ? testCase.points : 0,
      maxPoints: testCase.points
    };
  };

  const validateQuery = async (testCase) => {
    if (testCase.seedData) {
      try {
        if (Array.isArray(testCase.seedData)) {
          const tableName = nodes[0]?.data.label || 'users';
          db.run(`DELETE FROM ${tableName}`);
          
          testCase.seedData.forEach(row => {
            const values = row.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ');
            db.run(`INSERT INTO ${tableName} VALUES (${values})`);
          });
        } else {
          for (const [tableName, data] of Object.entries(testCase.seedData)) {
            db.run(`DELETE FROM ${tableName}`);
            
            data.forEach(row => {
              const values = row.map(v => typeof v === 'string' ? `'${v}'` : v).join(', ');
              db.run(`INSERT INTO ${tableName} VALUES (${values})`);
            });
          }
        }
      } catch (error) {
        return {
          name: testCase.name,
          passed: false,
          message: `❌ Failed to seed data: ${error.message}`,
          points: 0,
          maxPoints: testCase.points,
          query: testCase.query
        };
      }
    }

    try {
      const result = db.execRawQuery(testCase.query);
      const actualOutput = result[0]?.values || [];
      const expectedOutput = testCase.expectedOutput;

      const passed = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);

      return {
        name: testCase.name,
        passed,
        message: passed 
          ? '✅ Query executed correctly!' 
          : `❌ Expected ${expectedOutput.length} rows but got ${actualOutput.length}`,
        points: passed ? testCase.points : 0,
        maxPoints: testCase.points,
        query: testCase.query
      };
    } catch (error) {
      return {
        name: testCase.name,
        passed: false,
        message: `❌ Query error: ${error.message}`,
        points: 0,
        maxPoints: testCase.points,
        query: testCase.query
      };
    }
  };

  const runUserQuery = () => {
    if (!userQuery.trim()) {
      setFeedback('⚠️ Please enter a SQL query');
      return;
    }

    try {
      const result = db.execRawQuery(userQuery);
      setQueryResult(result);
      setFeedback('✅ Query executed successfully!');
    } catch (error) {
      setQueryResult(null);
      setFeedback(`❌ SQL Error: ${error.message}`);
    }
  };

  const resetProblem = () => {
    setNodes([]);
    setEdges([]);
    setTestResults([]);
    setTotalScore(0);
    setFeedback('');
    setSqlGenerated('');
    setUserQuery('');
    setQueryResult(null);
    
    db.getTableNames().forEach(tableName => {
      db.run(`DROP TABLE IF EXISTS ${tableName}`);
    });
  };

  // ==================== PROBLEM LIST SCREEN ====================
  if (showProblemList) {
    const maxScore = (problem) => problem.testCases.reduce((sum, tc) => sum + tc.points, 0);
    
    return (
      <div className="min-h-screen bg-[#f7f7f7] p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-4">
              <Database className="text-[#34a85a]" size={48} />
              SQL Learning Platform
            </h1>
            <p className="text-gray-600 text-lg">Master database design and SQL queries through interactive problems</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {PROBLEMS.map(problem => (
              <div
                key={problem.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 hover:border-[#34a85a]"
                onClick={() => selectProblem(problem)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      problem.difficulty === 'Easy' ? 'bg-[#00b8a3] text-white' :
                      problem.difficulty === 'Medium' ? 'bg-[#ffc01e] text-gray-900' :
                      'bg-[#ef4743] text-white'
                    }`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-gray-500 text-sm font-medium flex items-center gap-1">
                      <Trophy size={16} className="text-yellow-500" />
                      {maxScore(problem)} pts
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{problem.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {problem.testCases.length} test cases
                    </span>
                    <span className="text-[#34a85a] font-semibold">Start →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==================== MAIN PROBLEM SOLVING INTERFACE ====================
  const maxPossibleScore = selectedProblem.testCases.reduce((sum, tc) => sum + tc.points, 0);
  const scorePercentage = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

  return (
    <div className="flex h-screen bg-[#f7f7f7]">
      {/* LEFT PANEL */}
      <div className="w-[400px] bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-5">
          <button
            onClick={() => setShowProblemList(true)}
            className="mb-5 text-gray-700 hover:text-[#34a85a] flex items-center gap-2 text-sm font-medium transition-colors"
          >
            ← Back to Problems
          </button>

          <div className="mb-5">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{selectedProblem.title}</h1>
            <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
              selectedProblem.difficulty === 'Easy' ? 'bg-[#00b8a3] text-white' :
              selectedProblem.difficulty === 'Medium' ? 'bg-[#ffc01e] text-gray-900' :
              'bg-[#ef4743] text-white'
            }`}>
              {selectedProblem.difficulty}
            </span>
          </div>

          <p className="text-gray-700 mb-5 text-sm leading-relaxed">{selectedProblem.description}</p>
          
          {/* Requirements */}
          <div className="mb-5 bg-[#fff7ed] border-l-4 border-[#ffc01e] p-4 rounded-r">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
              <AlertCircle size={16} />
              Requirements
            </h3>
            <ul className="text-xs text-gray-700 space-y-1.5">
              {selectedProblem.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#ffc01e] mt-0.5">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hints */}
          <div className="mb-5 bg-[#f0fdf4] border-l-4 border-[#34a85a] p-4 rounded-r">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">💡 Hints</h3>
            <ul className="text-xs text-gray-700 space-y-1.5">
              {selectedProblem.hints.map((hint, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#34a85a] mt-0.5">•</span>
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Score Display */}
          <div className="mb-5 bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm text-gray-900">Your Score</span>
              <Trophy size={18} className="text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{totalScore} / {maxPossibleScore}</div>
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden mb-1">
              <div 
                className="bg-[#34a85a] h-full transition-all duration-500"
                style={{ width: `${scorePercentage}%` }}
              />
            </div>
            <div className="text-xs text-gray-600">{scorePercentage}% Complete</div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-3 rounded-lg mb-5 text-sm ${
              feedback.includes('✅') || feedback.includes('🎉') 
                ? 'bg-[#f0fdf4] border border-[#34a85a] text-gray-900' 
                : feedback.includes('❌') 
                ? 'bg-[#fef2f2] border border-[#ef4743] text-gray-900'
                : 'bg-[#fffbeb] border border-[#ffc01e] text-gray-900'
            }`}>
              {feedback}
            </div>
          )}

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="mb-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Test Results</h3>
              <div className="space-y-2">
                {testResults.map((result, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-xs ${
                      result.passed 
                        ? 'bg-[#f0fdf4] border-[#34a85a]' 
                        : 'bg-[#fef2f2] border-[#ef4743]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">
                        {result.passed ? '✅' : '❌'} {result.name}
                      </span>
                      <span className="text-xs font-semibold text-gray-700">
                        {result.points}/{result.maxPoints} pts
                      </span>
                    </div>
                    <p className="text-gray-700 mb-1">{result.message}</p>
                    {result.query && (
                      <div className="bg-[#1e1e1e] text-[#d4d4d4] p-2 rounded text-xs font-mono mt-1">
                        {result.query}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 mb-5">
            <button
              onClick={() => setShowTableForm(!showTableForm)}
              className="w-full bg-[#34a85a] hover:bg-[#2d8f4d] text-white py-2.5 px-4 rounded text-sm flex items-center justify-center gap-2 transition-colors font-medium"
            >
              <Plus size={18} />
              Add Table
            </button>

            {nodes.length > 0 && (
              <button
                onClick={runAllTests}
                className="w-full bg-[#6495ed] hover:bg-[#5080d9] text-white py-2.5 px-4 rounded text-sm flex items-center justify-center gap-2 transition-colors font-medium"
              >
                <Play size={18} />
                Run All Tests
              </button>
            )}

            <button
              onClick={resetProblem}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2.5 px-4 rounded text-sm flex items-center justify-center gap-2 transition-colors font-medium"
            >
              <RefreshCw size={18} />
              Reset Problem
            </button>
          </div>

          {/* Practice Query Section */}
          <div className="border-t pt-5 border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm flex items-center gap-2">
              <Code size={16} />
              Practice Queries
            </h3>
            <p className="text-xs text-gray-600 mb-2">Write and test your SQL queries here</p>
            <textarea
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="Write your SQL query here...&#10;&#10;Example:&#10;SELECT * FROM users&#10;WHERE email LIKE '%gmail.com%'"
              className="w-full h-32 p-3 border border-gray-300 rounded text-sm font-mono focus:ring-2 focus:ring-[#34a85a] focus:border-[#34a85a] mb-2 resize-none text-gray-900 placeholder-gray-400"
              style={{ lineHeight: '1.5' }}
            />
            <button
              onClick={runUserQuery}
              className="w-full bg-[#34a85a] hover:bg-[#2d8f4d] text-white py-2.5 px-4 rounded text-sm flex items-center justify-center gap-2 transition-colors font-medium"
            >
              <Play size={18} />
              Execute Query
            </button>
          </div>

          {/* Generated SQL Display */}
          {sqlGenerated && (
            <div className="mt-5">
              <h3 className="font-semibold mb-2 text-sm text-gray-900">Generated DDL:</h3>
              <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-3 rounded text-xs overflow-x-auto max-h-60 font-mono leading-relaxed">
                {sqlGenerated}
              </pre>
            </div>
          )}

          {/* Query Results Display */}
          {queryResult && queryResult.length > 0 && (
            <div className="mt-5">
              <h3 className="font-semibold mb-2 text-sm text-gray-900">Query Results:</h3>
              <div className="overflow-x-auto max-h-72 border border-gray-200 rounded">
                <table className="min-w-full text-xs">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      {queryResult[0].columns.map((col, i) => (
                        <th key={i} className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-gray-900">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {queryResult[0].values.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                        {row.map((cell, j) => (
                          <td key={j} className="px-3 py-2 text-gray-900">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {queryResult && queryResult.length === 0 && (
            <div className="mt-5 p-3 bg-gray-50 rounded text-center text-gray-600 text-sm">
              Query executed (0 rows returned)
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL - React Flow Canvas */}
      <div className="flex-1 relative bg-white">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-[#fafafa]"
        >
          <Background color="#e5e7eb" gap={16} size={1} />
          <Controls />
        </ReactFlow>

        {nodes.length === 0 && !showTableForm && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-gray-400">
              <Database size={64} className="mx-auto mb-4 opacity-30" />
              <p className="text-xl font-semibold mb-1">Design Your Database</p>
              <p className="text-sm">Click "Add Table" to start building your schema</p>
            </div>
          </div>
        )}

        {/* Table Creation Form Modal */}
        {showTableForm && (
          <div className="absolute top-6 left-6 bg-white p-5 rounded-lg shadow-xl border border-gray-200 z-10 w-[450px] max-h-[85vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-900">
              <Database size={20} />
              Create New Table
            </h3>
            
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Table Name</label>
              <input
                type="text"
                placeholder="e.g., users, orders, customers"
                value={newTable.name}
                onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                className="w-full p-2.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#34a85a] focus:border-[#34a85a] text-gray-900 placeholder-gray-400"
              />
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">Columns:</p>
              <div className="space-y-2">
                {newTable.columns.map((col, idx) => (
                  <div key={idx} className="flex gap-2 items-start p-2.5 bg-gray-50 rounded border border-gray-200">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Column name"
                        value={col.name}
                        onChange={(e) => updateColumn(idx, 'name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#34a85a] focus:border-[#34a85a]"
                      />
                      <select
                        value={col.type}
                        onChange={(e) => updateColumn(idx, 'type', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm text-gray-900 focus:ring-2 focus:ring-[#34a85a] focus:border-[#34a85a]"
                      >
                        <option value="INT">INT</option>
                        <option value="VARCHAR(255)">VARCHAR(255)</option>
                        <option value="TEXT">TEXT</option>
                        <option value="DATE">DATE</option>
                        <option value="TIMESTAMP">TIMESTAMP</option>
                        <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                        <option value="BOOLEAN">BOOLEAN</option>
                      </select>
                      <div className="flex gap-3">
                        <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer text-gray-700">
                          <input
                            type="checkbox"
                            checked={col.isPrimary}
                            onChange={(e) => updateColumn(idx, 'isPrimary', e.target.checked)}
                            className="w-4 h-4 cursor-pointer accent-[#34a85a]"
                          />
                          Primary Key
                        </label>
                        <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer text-gray-700">
                          <input
                            type="checkbox"
                            checked={col.isForeign}
                            onChange={(e) => updateColumn(idx, 'isForeign', e.target.checked)}
                            className="w-4 h-4 cursor-pointer accent-[#34a85a]"
                          />
                          Foreign Key
                        </label>
                      </div>
                    </div>
                    {newTable.columns.length > 1 && (
                      <button
                        onClick={() => removeColumn(idx)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors mt-1"
                        title="Remove column"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={addColumn}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded text-sm font-medium transition-colors"
              >
                + Add Column
              </button>
              <button
                onClick={createTable}
                className="flex-1 bg-[#34a85a] hover:bg-[#2d8f4d] text-white py-2.5 rounded text-sm font-semibold transition-colors"
              >
                ✓ Create Table
              </button>
              <button
                onClick={() => setShowTableForm(false)}
                className="px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}