import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <h2>About Me</h2>
        <p className="about-text">
          I'm a developer passionate about automating workflows and building practical solutions. 
          I specialize in building web applications and automation scripts that help teams work smarter.
        </p>
        <p className="about-text">
          With experience in Google Apps Script, Python, and automation tools like n8n, 
          I focus on creating solutions that deliver real business value.
        </p>
        <div className="about-highlights">
          <div className="highlight">
            <h3>Automation</h3>
            <p>Streamline workflows with scripts and automation tools</p>
          </div>
          <div className="highlight">
            <h3>Web Development</h3>
            <p>Build responsive and user-friendly web applications</p>
          </div>
          <div className="highlight">
            <h3>Problem Solving</h3>
            <p>Create practical solutions to real-world challenges</p>
          </div>
        </div>
      </div>
    </section>
  )
}