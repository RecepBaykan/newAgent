import React, { useState } from "react";
import '../PlayAlphaTest/index.css'
import { Link, useNavigate } from "react-router-dom";

const IndexAlpha = () => {
  // Form verilerini tutacak state
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [color, setColor] = useState('');


  const handleChange = (event) => {
    const { name, value } = event.target;
    setContactData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResponseMessage('');

  

    try {
      const response = await fetch('https://formspree.io/f/xwpenkea', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: 'Contact for Alpha Test',
          message: `name: ${formData.name}\n
                    username: ${formData.name}\n
                     `,
        }),
      });

      if (response.ok) {
        setResponseMessage('Message sent successfully!');
        setColor("green");
        setContactData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        setResponseMessage('Failed to send message.');
        setColor('red');
      }
    } catch (error) {
      setResponseMessage('Error occurred while sending the message.');
      setColor('red')
    } finally {
      setIsSubmitting(false);
    }
    setTimeout(() => {
      setResponseMessage('');
     

    }, 3000);
  };

  return (
    <div className='bodyIndex'>
      <header className='headerIndex'>
        <h1>NEW AGENT GAME - ALPHA TEST</h1>
        <nav className='navIndex'>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#contact" id="contact-link">Contact</a></li>
          </ul>
        </nav>
      </header>

      <page className="hero-section">
        <div>
          <h2>Welcome to the Alpha Test of NEW AGENT</h2>
          <p>Coming Soon</p>
          <button className="cta-button">
            <Link to="/RegisterAlpha" style={{ color: '#fff', textDecoration: 'none' }}>
              Join The Alpha Test
            </Link>
          </button>
        </div>
      </page>

      <page className="features-section">
        <div className="feature">
          <h3>Map 1</h3>
          <p>Coming Soon</p>
        </div>
        <div className="feature">
          <h3>Map 2</h3>
          <p>Coming Soon</p>
        </div>
        <div className="feature">
          <h3>Map 3</h3>
          <p>Coming Soon</p>
        </div>
      </page>

      <page id="contact" className="contact-section">
        <h2>Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={contactData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={contactData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={contactData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>

        </form>
          {responseMessage && (
          <div style={{color: color}}assName={`response-message ${responseMessage.includes('Error') ? 'error' : 'success'}`}>
            {responseMessage}
          </div>
        )}
      </page>

      <footer className="footerIndex">
        <p>&copy; 2024 NEW AGENT GAME. All rights reserved.</p>
        <div className="social-icons">
          <a href="https://discord.gg/ACdUXVXfc8" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-discord"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default IndexAlpha;
