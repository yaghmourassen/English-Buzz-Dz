import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Help = () => {
  return (
    <>
      <Header />
      <div className="container py-5">
        <h1 className="mb-4 text-primary">Help Center</h1>
        <p className="lead">
          Find answers to common questions and learn how to get the most out of EngiStudy.
        </p>

        <div className="accordion mt-4" id="helpAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                How do I register or log in?
              </button>
            </h2>
            <div id="faq1" className="accordion-collapse collapse show">
              <div className="accordion-body">
                Go to the Login page and either sign in with your account or register a new one.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                How can I post content?
              </button>
            </h2>
            <div id="faq2" className="accordion-collapse collapse">
              <div className="accordion-body">
                After logging in, you can access the posting section to upload resources such as books, courses, or tools.
              </div>
            </div>
          </div>

          {/* Add more FAQs as needed */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Help;
