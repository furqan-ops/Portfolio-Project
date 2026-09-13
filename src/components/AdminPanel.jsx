import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import './AdminPanel.css'

const EMPTY_FORM = {
  title: '',
  description: '',
  tech_stack: '',
  github_link: '',
  live_link: '',
  image_url: '',
  order_index: 0
}

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [projects, setProjects] = useState([])
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setIsLoggedIn(true)
      fetchProjects()
    }
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage('Login failed: ' + error.message)
    } else {
      setIsLoggedIn(true)
      setEmail('')
      setPassword('')
      fetchProjects()
    }
    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setIsLoggedIn(false)
    setProjects([])
  }

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (err) {
      console.error('Error fetching projects:', err)
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order_index' ? Number.parseInt(value, 10) || 0 : value
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (editingId) {
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
        setMessage('Project updated successfully!')
        setEditingId(null)
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([formData])

        if (error) throw error
        setMessage('Project added successfully!')
      }

      setFormData(EMPTY_FORM)
      fetchProjects()
    } catch (err) {
      setMessage('Error: ' + err.message)
    }
    setLoading(false)
  }

  function handleEdit(project) {
    setFormData({
      title: project.title ?? '',
      description: project.description ?? '',
      tech_stack: project.tech_stack ?? '',
      github_link: project.github_link ?? '',
      live_link: project.live_link ?? '',
      image_url: project.image_url ?? '',
      order_index: project.order_index ?? 0
    })
    setEditingId(project.id)
    window.scrollTo(0, 0)
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure?')) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      setMessage('Project deleted!')
      fetchProjects()
    } catch (err) {
      setMessage('Error deleting: ' + err.message)
    }
    setLoading(false)
  }

  if (!isLoggedIn) {
    return (
      <section className="admin-login">
        <div className="login-container">
          <h2>Admin Login</h2>
          {message && <p className="message error">{message}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        {message && (
          <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
          </p>
        )}

        <div className="admin-content">
          <div className="form-section">
            <h3>{editingId ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                required
              />
              <input
                type="text"
                name="tech_stack"
                placeholder="Tech Stack (comma separated, e.g., React, Python, JavaScript)"
                value={formData.tech_stack}
                onChange={handleInputChange}
                required
              />
              <input
                type="url"
                name="github_link"
                placeholder="GitHub Link (optional)"
                value={formData.github_link}
                onChange={handleInputChange}
              />
              <input
                type="url"
                name="live_link"
                placeholder="Live Demo Link (optional)"
                value={formData.live_link}
                onChange={handleInputChange}
              />
              <input
                type="url"
                name="image_url"
                placeholder="Image URL (optional)"
                value={formData.image_url}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="order_index"
                placeholder="Order (0, 1, 2...)"
                value={formData.order_index}
                onChange={handleInputChange}
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData(EMPTY_FORM)
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              )}
            </form>
          </div>

          <div className="projects-list-section">
            <h3>Your Projects ({projects.length})</h3>
            {projects.length === 0 ? (
              <p>No projects yet. Add one!</p>
            ) : (
              <div className="projects-list">
                {projects.map(project => (
                  <div key={project.id} className="project-item">
                    <div className="project-info">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <small>Tech: {project.tech_stack}</small>
                    </div>
                    <div className="project-actions">
                      <button onClick={() => handleEdit(project)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(project.id)} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}