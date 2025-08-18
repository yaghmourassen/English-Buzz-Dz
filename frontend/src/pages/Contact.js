import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Contact - English Buzz DZ</title>
          <meta
            name="description"
            content="Contact English Buzz DZ for support, inquiries, or feedback. Fill the form or reach us via email or phone."
          />
        </Helmet>

        <Header />

        <div className="container py-5">
          <h1 className="mb-4 text-primary">Contact Us</h1>
          <p className="lead">
            We'd love to hear from you! Please fill out the form below or reach us at:
          </p>

          <ul>
            <li>Email: <strong>Bellilmassinissa59@gmail.com</strong></li>
            <li>Phone: <strong>+213 561 552 076</strong></li>
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

          <div className="mt-4">
            <p>
              You can also reach us directly at <strong>Bellilmassinissa59@gmail.com</strong> or call <strong>+213 561 552 076</strong>.
            </p>
          </div>
        </div>

        <Footer />
      </>
    </HelmetProvider>
  );
};

export default Contact;
