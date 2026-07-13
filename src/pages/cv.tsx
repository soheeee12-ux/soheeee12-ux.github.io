import Head from 'next/head';
import Nav from '../components/Nav';
import { site } from '../content/site';
import cvData from '../generated/cv-data.json';
function highlightName(text: string) {
  const parts = text.split(/(Sohee Shin)/g);
  return parts.map((part, i) =>
    part === 'Sohee Shin' ? <strong key={i}>{part}</strong> : part
  );
}

export default function CV() {
  const {
    education,
    researchInterests,
    journalArticles,
    bookChapters,
    policyReports,
    papersInProgress,
    grants,
    conferencePresentations,
    researchExperience,
    teaching,
    service,
    training,
    invitedTalks,
    languages,
  } = cvData as any;

  return (
    <>
      <Head>
        <title>CV · {site.name}</title>
      </Head>

    <Nav />
      <main className="container">
       
<h1>Curriculum Vitae</h1>
        <p className="cv__updated">Last updated May 2026.</p>

        <p className="cv__download">
          <a href="/CV.pdf" download>
            Download CV (PDF)
          </a>
          <a href="/CV.pdf" target="_blank" rel="noopener noreferrer">
            Open PDF in New Tab
          </a>
        </p>

        <section>
          <h2>Education</h2>
          {education.map((item: any, i: number) => (
            <div className="cv-entry" key={i}>
              <p className="cv-entry__year">{item.year}</p>
              <div>
                <p className="cv-entry__title">{item.degree}</p>
                <p className="cv-entry__meta">{item.school}</p>
                {item.note && <p className="cv-entry__note">{item.note}</p>}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2>Research Areas</h2>
          <p>{researchInterests.join(' · ')}</p>
        </section>

       <section>
          <h2>Publications</h2>

          <h3 className="cv-subheading">Journal Articles</h3>
          <ul className="cv-list">
            {journalArticles.map((item: any, i: number) => (
              <li key={i}>{highlightName(item.citation)}</li>
            ))}
          </ul>

          <h3 className="cv-subheading">Book Chapters</h3>
          <ul className="cv-list">
            {bookChapters.map((item: any, i: number) => (
              <li key={i}>{highlightName(item.citation)}</li>
            ))}
          </ul>

          <h3 className="cv-subheading">Policy Reports</h3>
          <ul className="cv-list">
            {policyReports.map((item: any, i: number) => (
              <li key={i}>
                {highlightName(item.citation)}
                {item.url && (
                  <>
                    {' '}
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="cv-doi">
                      link ↗
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Papers in Preparation</h2>
          <ul className="cv-list">
            {papersInProgress.map((item: any, i: number) => (
              <li key={i}>
                {highlightName(item.citation)}{' '}
                <span className="cv-badge">{item.status}</span>
                {item.note && <span className="cv-entry__note"> — {item.note}</span>}
              </li>
            ))}
          </ul>
        </section>

       <section>
          <h2>Selected Conference Presentations</h2>
          {conferencePresentations.map((item: any, i: number) => (
            <div className="cv-entry" key={i}>
              <p className="cv-entry__year">{item.year}</p>
              <p>{highlightName(item.text)}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Grants, Awards &amp; Honors</h2>
          {grants.map((item: any, i: number) => (
            <div className="cv-entry" key={i}>
              <p className="cv-entry__year">{item.year}</p>
              <p>{item.text}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Research Experience</h2>
          {researchExperience.map((item: any, i: number) => (
            <div className="cv-entry" key={i}>
              <p className="cv-entry__year">{item.year}</p>
              <div>
                <p className="cv-entry__title">
                  {item.role} — {item.project}
                </p>
                <p className="cv-entry__meta">{item.advisor}</p>
                {item.note && <p className="cv-entry__note">{item.note}</p>}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2>Teaching Experience</h2>
          {teaching.institutions.map((inst: any) => (
            <div className="institution" key={inst.name}>
              <p className="institution__name">{inst.name}</p>
              {inst.courses.map((course: any, i: number) => (
                <div className="cv-entry" key={i}>
                  <p className="cv-entry__year">{course.year}</p>
                  <div>
                    <p className="cv-entry__title">{course.title}</p>
                    <p className="cv-entry__meta">
                      {course.role}
                      {course.rating && ` · ${course.rating}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {teaching.certificates.length > 0 && (
            <>
              <h3 className="cv-subheading">Teaching Certificates</h3>
              {teaching.certificates.map((cert: any, i: number) => (
                <div className="cv-entry" key={i}>
                  <p className="cv-entry__year">{cert.year}</p>
                  <div>
                    <p className="cv-entry__title">{cert.title}</p>
                    {cert.note && <p className="cv-entry__note">{cert.note}</p>}
                  </div>
                </div>
              ))}
            </>
          )}
        </section>

      <section>
          <h2>Invited Talks</h2>
          {invitedTalks.map((item: any, i: number) => (
            <div className="cv-entry" key={i}>
              <p className="cv-entry__year">{item.year}</p>
              <p>{highlightName(item.text)}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Training</h2>
          {training.map((item: any, i: number) => (
            <div className="cv-entry" key={i}>
              <p className="cv-entry__year">{item.year}</p>
              <p>{item.text}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Professional Activities &amp; Service</h2>
          <h3 className="cv-subheading">Reviewer for Scholarly Journals</h3>
          <ul className="cv-list">
            {service.reviewer.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3 className="cv-subheading">Volunteers and Services</h3>
          {service.volunteer.map((item: any, i: number) => (
            <div className="cv-entry" key={i}>
              <p className="cv-entry__year">{item.year}</p>
              <p>{item.text}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Languages &amp; Software Skills</h2>
          <p>{languages}</p>
        </section>
      </main>
    </>
  );
}