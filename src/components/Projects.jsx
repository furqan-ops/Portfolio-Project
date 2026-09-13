import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import './Projects.css'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

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
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <section id="projects" className="projects"><p>Loading projects...</p></section>

  return (
    <section id="projects" className="projects">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projects.length === 0 ? (
          <p>No projects yet. Add one in the admin panel!</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="project-card">
              {project.image_url && (
                <img src={project.image_url} alt={project.title} className="project-image" />
              )}
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              {project.tech_stack && (
                <div className="tech-stack">
                  {project.tech_stack.split(',').filter(tech => tech.trim()).map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech.trim()}</span>
                  ))}
                </div>
              )}
              <div className="project-links">
                {project.github_link && (
                  <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {project.live_link && (
                  <a href={project.live_link} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}