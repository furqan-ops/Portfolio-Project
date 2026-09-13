import './Skills.css'

export default function Skills() {
  const skills = [
    { category: 'Languages', items: ['Python', 'JavaScript', 'HTML/CSS'] },
    { category: 'Tools & Frameworks', items: ['React', 'Google Apps Script', 'n8n', 'Tailwind CSS'] },
    { category: 'Automation', items: ['Python Scripts', 'Google Apps Script', 'n8n Workflows'] },
    { category: 'Other', items: ['Web Development', 'Data Processing', 'Problem Solving'] }
  ]

  return (
    <section id="skills" className="skills">
      <h2>Skills</h2>
      <div className="skills-container">
        {skills.map((skillGroup, idx) => (
          <div key={idx} className="skill-group">
            <h3>{skillGroup.category}</h3>
            <ul>
              {skillGroup.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}