import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Help = () => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>English Buzz DZ</title>
          <meta
            name="description"
            content="English Buzz DZ - Help center for registering, viewing, and browsing educational resources and annonces. Only admins can post; users can browse categories and learn tips for using the platform."
          />
        </Helmet>

        <Header />

        <div className="container py-5">
          <h1 className="mb-4 text-primary">Help Center</h1>
          <p className="lead">
            Welcome to English Buzz DZ! Find guidance on registering, browsing annonces, and understanding platform rules.
          </p>

          <div className="accordion mt-4" id="helpAccordion">

            {/* Registration */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                  How do I register or log in?
                </button>
              </h2>
              <div id="faq1" className="accordion-collapse collapse show">
                <div className="accordion-body">
                  To access the platform, go to the <strong>Register</strong> page and create a new account.
                  Your account must be <strong>approved by the admin</strong> before you can interact with content.
                  Until approval, you can browse existing resources and view public annonces.
                </div>
              </div>
            </div>

            {/* Who can post */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                  Who can post content?
                </button>
              </h2>
              <div id="faq2" className="accordion-collapse collapse">
                <div className="accordion-body">
                  Only the <strong>admin</strong> can post new content, create annonces, and manage categories.
                  Regular users can browse, view, and filter annonces but cannot post, comment, or rate.
                </div>
              </div>
            </div>

            {/* Viewing annonces */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                  How can I view annonces?
                </button>
              </h2>
              <div id="faq3" className="accordion-collapse collapse">
                <div className="accordion-body">
                  After logging in, approved users can browse all annonces. You can filter by categories such as <strong>Courses</strong>, <strong>Books</strong>, <strong>Tests</strong>, or <strong>Tools</strong>.
                  Each annonce shows detailed information including title, description, attached files, and ratings.
                </div>
              </div>
            </div>

            {/* Browsing tips */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                  Additional tips for users
                </button>
              </h2>
              <div id="faq4" className="accordion-collapse collapse">
                <div className="accordion-body">
                  <ul>
                    <li>Use search and filters to find resources quickly.</li>
                    <li>Check categories to browse content relevant to your needs.</li>
                    <li>Admins manage posting and categories, ensuring content quality.</li>
                    <li>Keep your profile updated for better visibility.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </>
    </HelmetProvider>
  );
};

export default Help;
