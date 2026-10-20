import Head from 'next/head';
import Nav from '../components/Nav';
import { site } from '../content/site';

function highlightName(text: string) {
  const parts = text.split(/(Sohee Shin)/g);

  return parts.map((part, i) =>
    part === 'Sohee Shin' ? <strong key={i}>{part}</strong> : part
  );
}

type WorkItem = {
  authors: string;
  title: string;
  venue?: string;
  status?: string;
  url?: string;
};

type Study = {
  id: string;
  title: string;
  question: string;
  finding?: string;
  figure?: {
    src: string;
    alt: string;
    caption: string;
  };
  paper: WorkItem;
};

function Citation({ authors, title, venue, status, url }: WorkItem) {
  return (
    <li>
      {highlightName(authors)}. <em>{title}.</em>{' '}
      {venue && <em>{venue}</em>}
      {status && (
        <>
          {venue ? '. ' : ''}
          {status}.
        </>
      )}
      {url && (
        <>
          {' '}
          <a href={url} target="_blank" rel="noopener noreferrer">
            DOI ↗
          </a>
        </>
      )}
    </li>
  );
}

const studies: Study[] = [
  {
    id: 'study1',
    title: 'Study 1: Educational Pairing and Life Satisfaction',
    question:
      "Does hypergamy improve migrant women's life satisfaction, or do couple-level educational resources matter more?",
    finding:
      'Most migrant women are in unions with limited educational resources, and absolute resources matter more for life satisfaction than relative standing (hypergamy, homogamy, or hypogamy). These patterns suggest that cross-border marriages can contribute to family stratification in the receiving society.',
    figure: {
      src: '/study1-figure.png',
      alt: 'Predicted probability of reporting very satisfied with life, by couple educational pairing type',
      caption:
        'Predicted probability of reporting very satisfied with life, by couple educational pairing (95% CI).',
    },
    paper: {
      authors: 'Shin, Sohee, and Tim F. Liao',
      title:
        'Educational Pairing and Life Satisfaction Among Marriage-Migrant Women in South Korea',
      venue: 'Comparative Migration Studies',
      status: 'Revise and Resubmit',
    },
  },
  {
    id: 'study2',
    title: 'Study 2: Gender Ideology, Resources, and Housework',
    question:
      'How do gender ideology and couple-level resources jointly shape the division of housework?',
    paper: {
      authors: 'Shin, Sohee',
      title:
        'When Do Resources Matter? Gender Ideology and Housework in Transnational Marriages in South Korea',
      status: 'Working Paper',
    },
  },
  {
    id: 'study3',
    title: 'Study 3: Educational Pairing and Labor Market Outcomes',
    question:
      "How do couple-level educational resources shape migrant women's labor market participation and occupational outcomes?",
    paper: {
      authors: 'Shin, Sohee',
      title:
        'Educational Pairing and Labor Market Participation among Marriage-Migrant Women in South Korea',
      status: 'Working Paper',
    },
  },
];

const healthWork: WorkItem[] = [
  {
    authors: 'Shin, Sohee, and Tim F. Liao',
    title:
      'Unequal Exposure, Equal Vulnerability, Unequal Incidence: Unemployment Duration and Hypertension Risk Across Race in the United States',
    venue: 'Social Sciences 15(10): 665',
    status: '2026',
    url: 'https://doi.org/10.3390/socsci15100665',
  },
  {
    authors: 'Shin, Sohee, and Jeehae Kang',
    title:
      'Occupational Class Trajectories and Midlife Health: Cumulative Disadvantage Across the Life Course',
    status: 'Working Paper',
  },
];

const methodsWork: WorkItem[] = [
  {
    authors: 'Shin, Sohee, and Tim F. Liao',
    title: 'Addressing the Fuzzy Cohort Problem in the APC-I Model',
    venue: 'Sociological Methods & Research',
    status: 'Revise and Resubmit',
  },
];

export default function Research() {
  return (
    <>
      <Head>
        <title>Research · {site.name}</title>
      </Head>

      <Nav />

      <main className="container">
        <div className="research-page">
          <h1>Research</h1>

          <p className="research-intro">
            My research examines how social inequalities are produced,
            reproduced, and measured across the life course. My substantive
            research focuses on family dynamics, gender, and migration, with
            particular attention to how couple-level resources and gender norms
            shape the well-being and socioeconomic incorporation of immigrant
            women. Complementing this work, I study how labor market histories
            shape health and develop quantitative demographic methods to
            improve the identification and interpretation of population
            processes.
          </p>

                    <nav
            className="research-topics"
            aria-label="Research areas"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.65rem 2rem',
              margin: '1.25rem 0 2.5rem',
            }}
          >
            <a href="#family">Family, Migration, and Inequality</a>
            <a href="#methods">Demographic Methods</a>
            <a href="#health">Employment and Health</a>
          </nav>

          <section
            id="family"
            className="research-section"
            aria-labelledby="family-heading"
          >
            <h2 id="family-heading">Family, Migration, and Inequality</h2>
            <p>
              Marriage migration is often framed as a pathway to upward
              mobility: by moving to a wealthier society and marrying a husband
              with more education than their own, migrant women are expected to
              realize the aspirations that motivated their move. Yet this
              promise often goes unfulfilled, a paradox of global hypergamy. My
              dissertation examines how spouses’ resources and gender ideologies
              shape marriage migrant women’s lives in South Korea. Across three
              studies, I investigate well-being, the division of housework, and
              labor market outcomes, and I show how cross-border marriages can
              contribute to family stratification in the receiving society.
            </p>

            {studies.map((study) => (
              <article
                key={study.id}
                className="study"
                aria-labelledby={`${study.id}-heading`}
              >
                <header className="study-header">
                  <h3 id={`${study.id}-heading`}>{study.title}</h3>
                                  </header>
                <p>
                  <strong>Question:</strong> {study.question}
                </p>
                {study.finding && (
                  <p className="study-finding">
                    <strong>Main finding:</strong> {study.finding}
                  </p>
                )}

                {study.figure && (
                  <details className="study-details" open>
                    <summary>Results figure</summary>
                    <figure className="study-figure">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={study.figure.src}
                        alt={study.figure.alt}
                        loading="lazy"
                      />
                      <figcaption>{study.figure.caption}</figcaption>
                    </figure>
                  </details>
                )}

                <details className="study-details">
                  <summary>Paper details</summary>
                  <ul className="cv-list">
                    <Citation {...study.paper} />
                  </ul>
                </details>
              </article>
            ))}
          </section>
<section
            id="methods"
            className="research-section"
            aria-labelledby="methods-heading"
          >
            <h2 id="methods-heading">Demographic Methods</h2>
            <p>
              Alongside my substantive research, I collaborate on quantitative
              methods for demographic research. Our methodological work focuses
              on age–period–cohort (APC) analysis and cohort identification.
              Using simulation studies, we evaluate the performance of existing
              APC models and develop methodological guidance for improving the
              identification, estimation, and interpretation of cohort effects.
            </p>
            <h3 className="work-heading">Related work</h3>
            <ul className="cv-list">
              {methodsWork.map((item) => (
                <Citation key={item.title} {...item} />
              ))}
            </ul>
          </section>

          <section
            id="health"
            className="research-section"
            aria-labelledby="health-heading"
          >
            <h2 id="health-heading">Employment and Health</h2>
            <p>
              Health inequalities can emerge through the accumulation of
              advantages and disadvantages across working life. My research
              examines how sustained occupancy of, and movement between,
              occupational class positions from young adulthood to midlife are
              associated with physical and mental health at age 50. Focusing on
              class differences in employment relations, I investigate how these
              histories may reflect unequal opportunities to accumulate
              resources and sustained exposure to adverse working conditions.
            </p>
            <h3 className="work-heading">Related work</h3>
            <ul className="cv-list">
              {healthWork.map((item) => (
                <Citation key={item.title} {...item} />
              ))}
            </ul>
          </section>

          
        </div>
      </main>

     
    </>
  );
}