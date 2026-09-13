import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Get In Touch</h2>
      <div className="contact-container">
        <p className="contact-intro">
          Have a project in mind or want to discuss ideas? Feel free to reach out!
        </p>
        <div className="contact-methods">
          <div className="contact-item">
            <h3>Email</h3>
            <a href="mailto:your-email@example.com">your-email@example.com</a>
          </div>
          <div className="contact-item">
            <h3>LinkedIn</h3>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
              linkedin.com/in/yourprofile
            </a>
          </div>
          <div className="contact-item">
            <h3>GitHub</h3>
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
              github.com/yourprofile
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}