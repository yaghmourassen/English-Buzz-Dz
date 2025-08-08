import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Header />
      <div className="container py-5">
        <h1 className="mb-4 text-primary">About EngiStudy</h1>
        <p className="lead">
          EngiStudy is a platform dedicated to engineering students and professionals.
        </p>
        <p>
          Our mission is to provide easy access to educational resources like courses, books,
          past exams, and technical tools that help learners grow in their academic and professional paths.
        </p>
        <p>
          Built by engineers, for engineers – we aim to create a space where you can find, share, and
          collaborate on knowledge.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
