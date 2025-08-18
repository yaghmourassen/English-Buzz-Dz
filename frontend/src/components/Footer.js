import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-5 pt-4 pb-2">
      <div className="container text-center text-md-start">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">English Buzz DZ</h5>
            <p>Empowering engineering students with knowledge, tools, and resources.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="text-uppercase">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-white text-decoration-none">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
              </li>
              <li>
                <Link to="/help" className="text-white text-decoration-none">Help</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h6 className="text-uppercase">Contact</h6>
            <p>Email: <a href="mailto:Bellilmassinissa59@gmail.com" className="text-white text-decoration-none">Bellilmassinissa59@gmail.com</a></p>
            <p>Phone: <a href="tel:+213561552076" className="text-white text-decoration-none">+213 561 552 076</a></p>
          </div>
        </div>

        <hr className="bg-light" />

        <div className="text-center">
          © {currentYear} <strong>English Buzz DZ</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
