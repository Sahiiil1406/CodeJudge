import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/frontend')({
  component: Frontend,
})
import React, { useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
  SandpackTests,
} from "@codesandbox/sandpack-react";

const files = {
  "index.html": `<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>React Todo</title>
  </head>
  <body>
    <div id='root'></div>
    <script type='module' src='/index.js'></script>
  </body>
</html>`,

  "index.js": `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);`,

  "App.js": `import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), title: input.trim(), done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
      <h2>Todo App</h2>
      <input
        type='text'
        placeholder='Enter todo'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: '5px', width: '70%' }}
      />
      <button onClick={addTodo} style={{ marginLeft: '10px', padding: '5px 10px' }}>Add</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginTop: '10px' }}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: 'pointer',
                textDecoration: todo.done ? 'line-through' : 'none'
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => removeTodo(todo.id)}
              style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,

  "package.json": `{
  "name": "sandpack-react-todo",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "dependencies": {
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "@testing-library/react": "14.0.0",
    "@testing-library/jest-dom": "6.2.0"
  },
  "devDependencies": {
    "vitest": "1.3.1"
  }
}`,

  "App.test.js": `import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Todo App', () => {
  it('adds a todo', () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Enter todo');
    fireEvent.change(input, { target: { value: 'Learn React' } });
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByText('Learn React')).toBeInTheDocument();
  });
});`
};

 function Frontend() {
  const [activeTab, setActiveTab] = useState('description');
  const [showTests, setShowTests] = useState(false);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      color: '#262626',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        height: '50px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '20px'
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#34a85a' }}>
          CodeChallenge
        </div>
        <div style={{ flex: 1 }} />
        <button 
          onClick={() => setShowTests(!showTests)}
          style={{
            backgroundColor: '#ffffff',
            color: '#34a85a',
            border: '2px solid #34a85a',
            padding: '8px 18px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}>
          Run Testcase
        </button>
        <button style={{
          backgroundColor: '#34a85a',
          color: 'white',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600',
          boxShadow: '0 1px 3px rgba(52, 168, 90, 0.3)'
        }}>
          Submit
        </button>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex',
        overflow: 'hidden'
      }}>
        {/* Left Panel - Problem Description */}
        <div style={{
          width: '30%',
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#ffffff'
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#f0fdf4'
          }}>
            {['description', 'solution', 'submissions'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  backgroundColor: activeTab === tab ? '#ffffff' : '#f0fdf4',
                  color: activeTab === tab ? '#16a34a' : '#6b7280',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab ? '3px solid #34a85a' : 'none',
                  textTransform: 'capitalize',
                  fontWeight: activeTab === tab ? '600' : '500',
                  fontSize: '13px'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '16px',
            backgroundColor: '#ffffff'
          }}>
            {activeTab === 'description' && (
              <div>
                <h2 style={{ color: '#262626', marginTop: 0, fontSize: '18px' }}>
                  1. Build a Todo Application
                </h2>
                <div style={{ 
                  display: 'inline-block',
                  padding: '4px 10px',
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '600',
                  marginBottom: '16px',
                  border: '1px solid #a7f3d0'
                }}>
                  Easy
                </div>

                <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '14px' }}>
                  Create a functional Todo application using React that allows users to add, toggle completion status, and remove todo items.
                </p>

                <h3 style={{ color: '#262626', marginTop: '20px', fontSize: '15px' }}>Requirements:</h3>
                <ul style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '13px', paddingLeft: '20px' }}>
                  <li>Input field to enter new todos</li>
                  <li>Button to add todos to the list</li>
                  <li>Display list of all todos</li>
                  <li>Click on todo to toggle completion</li>
                  <li>Delete button to remove todos</li>
                </ul>

                <h3 style={{ color: '#262626', marginTop: '20px', fontSize: '15px' }}>Example:</h3>
                <div style={{
                  backgroundColor: '#f0fdf4',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #bbf7d0',
                  marginTop: '8px',
                  fontFamily: 'monospace',
                  fontSize: '12px'
                }}>
                  <div style={{ color: '#16a34a', fontWeight: '600' }}>Input: "Learn React"</div>
                  <div style={{ color: '#6495ed', marginTop: '4px' }}>Action: Click "Add"</div>
                  <div style={{ color: '#262626', marginTop: '4px' }}>Output: Todo appears</div>
                </div>

                <h3 style={{ color: '#262626', marginTop: '20px', fontSize: '15px' }}>Constraints:</h3>
                <ul style={{ color: '#4b5563', lineHeight: '1.7', fontSize: '13px', paddingLeft: '20px' }}>
                  <li>Use React hooks (useState)</li>
                  <li>Each todo must have unique ID</li>
                  <li>Input clears after adding</li>
                </ul>
              </div>
            )}

            {activeTab === 'solution' && (
              <div style={{ color: '#4b5563', fontSize: '14px' }}>
                <h3 style={{ color: '#262626', fontSize: '16px' }}>Solution Approach</h3>
                <p>Complete the challenge first to unlock solutions!</p>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div style={{ color: '#4b5563', fontSize: '14px' }}>
                <h3 style={{ color: '#262626', fontSize: '16px' }}>Your Submissions</h3>
                <p>No submissions yet. Submit your solution to see it here!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div style={{
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <SandpackProvider
            files={files}
            template="react"
            theme={{
              colors: {
                surface1: '#ffffff',
                surface2: '#f9fafb',
                surface3: '#e5e7eb',
                clickable: '#4b5563',
                base: '#262626',
                disabled: '#9ca3af',
                hover: '#34a85a',
                accent: '#34a85a',
                error: '#ef4444',
                errorSurface: '#fee2e2'
              },
              syntax: {
                plain: '#262626',
                comment: '#6b7280',
                keyword: '#6495ed',
                tag: '#34a85a',
                punctuation: '#4b5563',
                definition: '#0891b2',
                property: '#0284c7',
                static: '#ca8a04',
                string: '#16a34a'
              },
              font: {
                body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                mono: '"Fira Code", "Cascadia Code", Consolas, monospace',
                size: '14px',
                lineHeight: '1.6'
              }
            }}
            options={{
              visibleFiles: Object.keys(files),
              activeFile: '/App.js'
            }}
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <SandpackLayout>
                  <SandpackFileExplorer style={{ width: '200px' }} />
                  <SandpackCodeEditor 
                    closableTabs 
                    showTabs 
                    showLineNumbers
                    style={{ flex: 1, minWidth: '500px' }}
                  />
                  <SandpackPreview 
                    showOpenInCodeSandbox={false}
                    showRefreshButton
                    style={{ flex: 1, minWidth: '450px' }}
                  />
                </SandpackLayout>
              </div>

              {/* Test Cases Panel - Only shows when Run Testcase is clicked */}
              {showTests && (
                <div style={{
                  height: '200px',
                  borderTop: '1px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{
                    padding: '10px 16px',
                    backgroundColor: '#f0fdf4',
                    borderBottom: '1px solid #bbf7d0',
                    fontWeight: '600',
                    fontSize: '13px',
                    color: '#16a34a',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>Test Results</span>
                    <button
                      onClick={() => setShowTests(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#6b7280',
                        cursor: 'pointer',
                        fontSize: '18px',
                        padding: '0 4px'
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div style={{ flex: 1, overflow: 'auto' }}>
                    <SandpackTests verbose />
                  </div>
                </div>
              )}
            </div>
          </SandpackProvider>
        </div>
      </div>
    </div>
  );
}