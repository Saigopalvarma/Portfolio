import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function ContactForm() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setError("");
    setSent(false);

    emailjs
      .sendForm(
        "service_1gh6owl", // replace with your EmailJS service ID
        "template_4eoj8qj", // replace with your EmailJS template ID
        form.current,
        "4C1V1LimeHKNuV6VS"   // replace with your EmailJS public key
      )
      .then(
        () => setSent(true),
        () => setError("Failed to send. Please try again.")
      );
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2rem",
        maxWidth: 400,
        width: "100%",
      }}
    >
      <form ref={form} onSubmit={sendEmail}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="from_name" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="from_email" type="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea name="message" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
        {sent && <div className="text-success mt-2">Message sent!</div>}
        {error && <div className="text-danger mt-2">{error}</div>}
      </form>
    </div>
  );
}

export default ContactForm;