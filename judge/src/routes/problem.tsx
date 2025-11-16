import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useProblems } from '../hooks/useProblems'

export const Route = createFileRoute('/problems')({
  component: ProblemsPage,
})

function ProblemsPage() {
  const [page, setPage] = useState(1)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | ''>('')
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const filters = {
    page,
    limit: 10,
    ...(difficulty && { difficulty }),
    ...(search && { search }),
    ...(tags.length > 0 && { tags }),
  }

  const { problems, pagination, isLoading, deleteProblem } = useProblems(filters)

  if (isLoading) return <div>Loading...</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Problems</h1>

      {/* Filters */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', flex: 1 }}
        />
        
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as any)}
          style={{ padding: '8px' }}
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Problems List */}
      <div style={{ marginBottom: '20px' }}>
        {problems.map((problem: any) => (
          <div
            key={problem._id}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '5px',
            }}
          >
            <h3>{problem.title}</h3>
            <p>{problem.description.substring(0, 100)}...</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: problem.difficulty === 'easy' ? '#90EE90' : problem.difficulty === 'medium' ? '#FFD700' : '#FF6347',
                borderRadius: '3px'
              }}>
                {problem.difficulty}
              </span>
              {problem.tags.map((tag: string) => (
                <span key={tag} style={{ padding: '4px 8px', backgroundColor: '#e0e0e0', borderRadius: '3px' }}>
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => deleteProblem(problem._id)}
              style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '3px' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
          <button
            disabled={!pagination.hasPrev}
            onClick={() => setPage(page - 1)}
            style={{ padding: '8px 16px' }}
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
          </span>
          <button
            disabled={!pagination.hasNext}
            onClick={() => setPage(page + 1)}
            style={{ padding: '8px 16px' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

// ============================================
// FILE: app/routes/problems.create.tsx
// ============================================
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useProblems } from '../hooks/useProblems'

export const Route = createFileRoute('/problems/create')({
  component: CreateProblemPage,
})

function CreateProblemPage() {
  const navigate = useNavigate()
  const { createProblem } = useProblems()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    tags: '',
    constraints: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createProblem({
        title: formData.title,
        description: formData.description,
        difficulty: formData.difficulty,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        constraints: formData.constraints.split('\n').filter(Boolean),
      })

      navigate({ to: '/problems' })
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1>Create New Problem</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={6}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Difficulty:</label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="array, string, hash-table"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Constraints (one per line):</label>
          <textarea
            value={formData.constraints}
            onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
            rows={4}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
          Create Problem
        </button>
      </form>
    </div>
  )
}