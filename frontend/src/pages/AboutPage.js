import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/AboutPage.module.css';

function AboutPage() {
  return (
    <>
      {/* Section À propos */}
      <section className={styles.wrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>À propos de notre site</h1>
          <p className={styles.paragraph}>
            Ce projet est une démonstration d'une application React moderne connectée à un backend Spring Boot.
          </p>
          <p className={styles.paragraph}>
            Nous utilisons React pour construire une interface utilisateur dynamique et réactive. Le design est
            réalisé avec Bootstrap afin de garantir une excellente expérience utilisateur sur tous les appareils.
          </p>
          <p className={styles.paragraph}>
            Le backend repose sur Spring Boot, un framework Java puissant, et les données sont stockées dans une base MongoDB.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">© 2025 MonSite. Tous droits réservés.</p>
      </footer>
    </>
  );
}

export default AboutPage;
