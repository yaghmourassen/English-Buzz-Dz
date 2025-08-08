import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <Header />
      <div className="container py-5">
        <h1 className="mb-4 text-primary">Contact Us</h1>
        <p className="lead">We'd love to hear from you! Please fill out the form below or reach us at:</p>

        <ul>
          <li>Email: support@engistudy.com</li>
          <li>Phone: +213 123 456 789</li>
        </ul>

        <form className="mt-4">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Your Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="4" placeholder="Write your message here..."></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
