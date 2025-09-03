import React, { useState } from "react";
import "./styling/ContactUsForm.css"; 

export default function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
        const res = await fetch("/api/contact-us-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setStatus("Message sent");
            setFormData({ name: "", email: "", message: "" });
        } else {
            setStatus("Failed to send");
      }
    } catch (err) {
      setStatus("Error");
      alert(err.message); 
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="contactUsFormContainer"
    >
      <h2 className="contactHeader">CONTACT US</h2>

      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="contactUsField"
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="contactUsField"
        />
      </div>

      <div>
        <textarea
          name="message"
          type="text"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          className="contactUsField"
        />
      </div>

      <button 
        type="submit" 
        className="contactUsButton" 
      >
        Send
      </button>

      {status && <p className="text-center text-sm">{status}</p>}
    </form>
  );
}
