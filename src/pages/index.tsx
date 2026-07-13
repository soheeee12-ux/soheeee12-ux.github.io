import Nav from '../components/Nav';
import Head from 'next/head';
import { site } from '../content/site';

export default function Home() {
  return (
    <>
      <Head>
        <title>{site.name}</title>
        <meta name="description" content={site.title} />
      </Head>

      <Nav />
      <main className="container">
             <header className="hero">
  <img
    src="/headshot.png"
    alt={site.name}
    className="hero__headshot"
    width={240}
    height={240}
  />
  <h1>{site.name}</h1>
  <p className="hero__title">{site.title}</p>
        </header>

        <section>
          <h2>About</h2>
          <p>{site.about}</p>
        </section>

        <section>
          <h2>Research Interests</h2>
          <ul>
            {site.researchInterests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            {' · '}
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </section>
      </main>
    </>
  );
}