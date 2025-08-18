import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>About - English Buzz DZ</title>
          <meta
            name="description"
            content="Learn about English Buzz DZ (EngiStudy), a platform for students and professionals to access educational resources, browse annonces, and collaborate in a moderated environment."
          />
        </Helmet>

        <Header />

        <div className="container py-5">
          <h1 className="mb-4 text-primary">About English Buzz DZ</h1>

          <p className="lead">
            English Buzz DZ (EngiStudy) is a platform dedicated to students and professionals in engineering and technical fields.
          </p>

          <p>
            Our mission is to provide easy access to educational resources including courses, books, past exams, and technical tools.
            We aim to help learners grow academically and professionally.
          </p>

          <p>
            Currently, users can register and browse annonces after admin approval. Posting, commenting, and rating are reserved for the admin to ensure content quality and moderation.
          </p>

          <p>
            Annonces are organized into categories like <strong>Courses</strong>, <strong>Books</strong>, <strong>Tests</strong>, and <strong>Tools</strong> to make searching simple. Users can filter and explore resources easily.
          </p>

          <p>
            Built by engineers, for engineers – our goal is to create a collaborative space where knowledge is shared, and learners can discover useful resources while maintaining a safe and moderated environment.
          </p>

          <p className="mt-4">
            Developed by <a href="https://yaghmourassen.github.io/My-Webpage/" target="_blank" rel="noopener noreferrer">Yaghmourassen</a>.
          </p>
        </div>

        <Footer />
      </>
    </HelmetProvider>
  );
};

export default About;
