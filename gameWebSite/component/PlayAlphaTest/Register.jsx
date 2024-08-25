import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../PlayAlphaTest/register.css";
import { message } from "antd";

const Register = () => {
  const navigete = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dob: "",
    language: "",
    is_content_creator: "",
    experience: "",
    thoughts: "",
  });

  const [color, setColor] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde formu görünür yapmak için
    setIsFormVisible(true);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {
      const response = await fetch("https://formspree.io/f/xwpenkea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Play to Alpha Test",
          message: `name: ${formData.name}\n
                    username: ${formData.username}\n
                     email: ${formData.email}\n
                    dob: ${formData.dob}\n
                    language: ${formData.language}\n
                    is_content_creator: ${formData.is_content_creator}\n
                    experience: ${formData.experience}\n
                    thoughts: ${formData.thoughts}`,
        }),
      });

      if (response.ok) {
        setResponseMessage("Your date sent successfully!");
        setColor("green");
        setFormData({
          name: "",
          username: "",
          email: "",
          dob: "",
          language: "",
          is_content_creator: "",
          experience: "",
          thoughts: "",
        });
      } else {
        setResponseMessage("Failed to send your date.");
        setColor("red");
      }
    } catch (error) {
      setResponseMessage("Error occurred while sending your date.");
    } finally {
      setIsSubmitting(false);
    }
    setTimeout(() => {
      setResponseMessage("");
      navigete("/");
    }, 3000);
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="bodyRegister">
        <div className={`form-container ${isFormVisible ? "fade-in" : ""}`}>
          <div className="prevClass">
            <Link to="/playAlphaTest">
              <button>
                {" "}
                <i class="fas fa-arrow-left"></i>
              </button>
            </Link>
          </div>
          <h2>Join The Alpha Test</h2>
          <form id="registration-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <label htmlFor="language">Preferred Language</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select your language
              </option>
              <option value="English">English</option>
              <option value="Turkish">Turkish</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
              <option value="Russian">Russian</option>
              <option value="Arabic">Arabic</option>
              <option value="Portuguese">Portuguese</option>
            </select>

            <label htmlFor="is-content-creator">
              Are you a content creator?
            </label>
            <select
              id="is-content-creator"
              name="is_content_creator"
              value={formData.is_content_creator}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="experience">Experience with similar games</label>
            <textarea
              id="experience"
              name="experience"
              placeholder="Describe your experience"
              rows="4"
              value={formData.experience}
              onChange={handleChange}
              required
            ></textarea>

            <label htmlFor="thoughts">Thoughts on the game</label>
            <textarea
              id="thoughts"
              name="thoughts"
              placeholder="Share your thoughts on the game"
              rows="4"
              value={formData.thoughts}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Register"}
            </button>
          </form>

          {responseMessage && <p style={{ color: color }}>{responseMessage}</p>}
        </div>
        <button
          className={`scroll-to-top ${isVisible ? "show" : ""}`}
          onClick={scrollToTop}
        >
          <i class="fas fa-arrow-up"></i>
        </button>
      </div>
    </>
  );
};

export default Register;
