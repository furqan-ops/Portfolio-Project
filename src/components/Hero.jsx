import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Hi, I'm a Developer</h1>
        <p className="hero-subtitle">
          Building projects that solve real problems
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}