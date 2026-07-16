import Head from 'next/head';
import Nav from '../components/Nav';
import { site } from '../content/site';

type Course = {
  title: string;
  description: string;
  terms: string;
};

type Institution = {
  name: string;
  courses: Course[];
};

const institutions: Institution[] = [
  {
    name: 'University of Illinois at Urbana-Champaign',
    courses: [
      {
        title: 'Senior Capstone Seminar',
        description: 'Mentored undergraduate students on independent capstone research projects and provided feedback on their written work.',
        terms: 'In-Person, Teaching Assistant, Spring 2026',
      },
      {
        title: 'Social Research Methods',
        description: 'Led weekly lab sessions covering both quantitative and qualitative research methods.',
        terms: 'In-Person, Section Instructor & TA, Fall 2025 · Rating 4.3/5',
      },
      {
        title: 'Introduction to Social Statistics',
        description: 'Led lab sessions on statistical software applications using Excel.',
        terms: 'In-Person, Section Instructor & TA, 2024–2025 · Rating 4.5/5 (Teachers ranked as excellent)',
      },
      {
        title: 'Law and Society',
        description: '',
        terms: 'In-Person, Teaching Assistant, Fall 2021',
      },
      {
        title: "America's Immigrant Society",
        description: '',
        terms: 'In-Person, Teaching Assistant, Spring 2021',
      },
      {
        title: 'Sociology of Law',
        description: '',
        terms: 'In-Person, Teaching Assistant, Fall 2020',
      },
    ],
  },
  {
    name: 'State University of New York at Stony Brook',
    courses: [
      {
        title: 'Statistical Methods in Sociology',
        description: 'Independently designed and taught a course on statistical methods commonly applied in sociological research.',
        terms: 'In-Person, Instructor, Fall 2023 · Rating 4.93/5',
      },
      {
        title: 'Research Methods',
        description: '',
        terms: 'In-Person, Teaching Assistant, 2022',
      },
      {
        title: 'American Society',
        description: '',
        terms: 'In-Person, Teaching Assistant, 2022',
      },
    ],
  },
];

const classroomActivities: { course: string; activities: { title: string; description: string }[] }[] = [
  {
    course: 'Statistical Methods in Sociology',
    activities: [
      { title: '', description: '' },
    ],
  },
];

const certificates: { title: string; issuer: string; year: string; description: string; url?: string }[] = [
  {
    title: 'Dr. Sandra J. Finley Teacher Scholar Certificate',
    issuer: 'Center for Innovation in Teaching & Learning, UIUC',
    year: '2026 May',
    description: 'Awarded after three semesters of teaching, engagement with teaching scholarship, a pedagogical project, discipline-based service, and a teaching philosophy statement.',
    url: 'https://credentials.illinois.edu/60b88062-6681-4ac6-972e-2a7d5b3e7f54#acc.1l8zogba',
  },
  {
    title: 'Graduate Teacher Certificate',
    issuer: 'Center for Innovation in Teaching & Learning, UIUC',
    year: '2025 May',
    description: 'Awarded after two semesters of teaching, participation in teaching development programs, and reflection on student feedback with a consultant and faculty member.',
    url: 'https://credentials.illinois.edu/4c32cfd5-11ae-40d2-b2c4-c9ef73e315cf#acc.G8YZpzro',
  },
];

const testimonials = [
  {
    quote: "Sohee Shin is one of the best teachers I've ever had. She is extremely sweet and listens to her students. She genuinely wants her students to do well... Unlike other professors she wants her students to actually learn, she doesn't make tests hard to be hard.",
    course: 'Statistical Methods for Sociology, Fall 2023 (Solo Instructor)',
  },
  {
    quote: "Sohee was incredibly kind and helpful and I'm not one for math but she made it easier than it is for me oftentimes. It was helpful to have her be so enthusiastic about sociology in terms of learning.",
    course: 'Statistical Methods for Sociology, Fall 2023 (Solo Instructor)',
  },
  {
    quote: 'Easy to understand and well-structured so you know exactly what is expected of you.',
    course: 'Statistical Methods for Sociology, Fall 2023 (Solo Instructor)',
  },
  {
    quote: 'She was always patient and willing to explain concepts multiple times, even if she had already covered them before. Her dedication to helping students and answering questions, no matter how many times they were asked, was truly appreciated.',
    course: 'Social Statistics, Lab Session (Teaching Assistant)',
  },
  {
    quote: 'Something I benefited from in this lab was the way we got to work hands-on on whatever the topic was, which can be difficult, so it was nice to get help. It was also nice to be able to work together with someone or in a group because we got to hear it in a less complicated way.',
    course: 'Research Methods, Lab Session (Teaching Assistant)',
  },
];

export default function Teaching() {
  return (
    <>
      <Head>
        <title>Teaching · {site.name}</title>
      </Head>

      <Nav />
      <main className="container">
        <h1>Teaching</h1>

        <section>
          <h2>Teaching Philosophy</h2>
          <p>
            My teaching connects abstract concepts to real-world social issues, fostering student-centered active learning through structured, hands-on activities and individualized feedback. I approach teaching as an ongoing process of reflection and revision, continually refining my methods to better support student learning.
          </p>
        </section>

<section>
          <h2>Example of My Teaching</h2>
          <p>
            A slide I designed for social statistics, covering measures of central tendency through guided practice and an applied example.
          </p>
<div className="slide-viewer">
            <div className="slide-gallery">
              {Array.from({ length: 18 }, (_, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={`/teaching-slides/slide-${String(i + 1).padStart(2, '0')}.jpg`}
                  alt={`Slide ${i + 1}`}
                  className="slide-gallery__img"
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2>Courses</h2>
          {institutions.map((inst) => (
            <div className="institution" key={inst.name}>
              <p className="institution__name">{inst.name}</p>
              {inst.courses.map((course) => (
                <div className="course" key={course.title}>
                  <h3 className="course__title">{course.title}</h3>
                  {course.description && <p>{course.description}</p>}
                  <p className="course__terms">{course.terms}</p>
                </div>
              ))}
            </div>
          ))}
        </section>

        {classroomActivities.some((c) => c.activities.some((a) => a.title)) && (
          <section>
            <h2>Selected Classroom Activities</h2>
            {classroomActivities.map((group) => (
              <div key={group.course}>
                <p className="institution__name">{group.course}</p>
                <ul className="activities">
                  {group.activities
                    .filter((a) => a.title)
                    .map((activity) => (
                      <li key={activity.title}>
                        <strong>{activity.title}</strong>
                        <p>{activity.description}</p>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        <section>
          <h2>Teaching Certificates</h2>
          {certificates.map((cert) => (
            <div className="course" key={cert.title}>
              <h3 className="course__title">
                {cert.url ? (
                  <a href={cert.url} target="_blank" rel="noopener noreferrer">
                    {cert.title}
                  </a>
                ) : (
                  cert.title
                )}
              </h3>
              <p>{cert.description}</p>
              <p className="course__terms">
                {cert.issuer} · {cert.year}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2>Student Evaluation</h2>
          <div className="testimonials">
            {testimonials.map((t, i) => (
              <blockquote className="testimonial" key={i}>
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer className="testimonial__source">— {t.course}</footer>
              </blockquote>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}