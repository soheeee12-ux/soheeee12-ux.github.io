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

function Citation({ authors, title, venue, status, url }: WorkItem) {
  return (
    <li>
      {highlightName(authors)}. <em>{title}.</em>{' '}
      {venue && <em>{venue}</em>}
      {status && <>{venue ? '. ' : ''}{status}.</>}
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

const programs = [
  {
    name: 'Family, Gender, and Social Inequality',
    intro:
      "International marriage does not necessarily provide equal opportunities for all family members. My research examines how couple-level dynamics, such as educational pairing and gender ideology pairing, are distributed within marriage-migrant couples in South Korea and how these inequalities shape migrant women's well-being, household labor, and labor market participation. Rather than treating spouses as independent individuals, I conceptualize the couple as the primary unit through which resources and gender norms interact to produce inequality.",
    keyQuestions: [
      "(Study 1): How do couple-level educational resources shape migrant women's life satisfaction?",
      '(Study 2): How do gender ideology and couple-level resources jointly shape the division of housework?',
      "(Study 3): How do couple-level educational resources shape migrant women's labor market participation and occupational outcomes?",
    ],
    relatedWork: [
      {
        authors: 'Shin, Sohee, and Tim F. Liao',
        title: 'Educational Pairing and Life Satisfaction Among Marriage-Migrant Women in South Korea',
        status: 'Under Review',
      },
      {
        authors: 'Shin, Sohee',
        title: 'When Do Resources Matter? Gender Ideology and Housework in Transnational Marriages in South Korea',
        status: 'Working Paper',
      },
      {
        authors: 'Shin, Sohee',
        title: 'Educational Pairing and Labor Market Participation among Marriage-Migrant Women in South Korea',
        status: 'Working Paper',
      },
    ] as WorkItem[],
  },
  {
    name: 'Quantitative Demography and Methodology',
    intro:
      'Alongside my substantive research, I develop quantitative methods for demographic research. My methodological work focuses on age–period–cohort (APC) analysis and cohort identification. Using simulation studies, I evaluate the performance of existing APC models and develop methodological guidance for improving the identification, estimation, and interpretation of cohort effects.',
    keyQuestions: [
      'What methodological adjustments improve the identification and interpretation of cohort effects?',
    ],
    relatedWork: [
      {
        authors: 'Shin, Sohee, and Tim F. Liao',
        title: 'Addressing the Fuzzy Cohort Problem in the APC-I Model',
        venue: 'Sociological Methods & Research',
        status: 'Revise and Resubmit',
      },
    ] as WorkItem[],
  },
  {
    name: 'Social Determinants of Health',
    intro:
      'Health inequality develops through cumulative social experiences across the life course rather than from a single event. My work in this area examines how occupational trajectories from young adulthood to midlife shape physical and mental health later in life, with particular attention to cumulative disadvantage and social stratification.',
    keyQuestions: [
      'How do occupational trajectories from young adulthood to midlife shape health disparities in later life?',
      'How does cumulative disadvantage across the life course contribute to health stratification?',
    ],
    relatedWork: [
      {
        authors: 'Shin, Sohee, and Jeehae Kang',
        title: 'Occupational Class Trajectories and Midlife Health: Cumulative Disadvantage Across the Life Course',
        status: 'Working Paper',
      },
    ] as WorkItem[],
  },
];

export default function Research() {
  return (
    <>
      <Head>
        <title>Research · {site.name}</title>
      </Head>

      <main className="container">
        <Nav />

        <h1>Research</h1>

        <section>
          <p>
            My research examines how social inequalities are produced, reproduced, and measured across the life course. My substantive research focuses on family dynamics, gender, and migration, with particular attention to how couple-level resources and gender norms shape the well-being and socioeconomic incorporation of immigrant women. Complementing this work, I study the social determinants of health and develop quantitative demographic methods to improve the identification and interpretation of population processes.
          </p>
          <p>
            My methods include demographic methods, longitudinal analysis, simulation studies, and computational techniques to study family dynamics and social inequality.
          </p>
        </section>

        {programs.map((program) => (
          <section key={program.name}>
            <h2>{program.name}</h2>
            <p>{program.intro}</p>

{program.name === 'Family, Gender, and Social Inequality' ? (
              <>
                <p className="research-project__label">Key Questions</p>
                <ul className="cv-list">
                  <li>{program.keyQuestions[0]}</li>
                </ul>

                <figure className="research-figure">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/study1-figure.png"
                    alt="Predicted probability of reporting very satisfied with life, by couple education pairing type"
                    className="research-figure__img"
                  />
             <figcaption className="research-figure__caption">
                    Figure. Predicted probability of reporting very satisfied with life, by couple educational pairing (95% CI).
                    <br />
                    <br />
                    <strong>Main finding:</strong> Marriage-migrant women&apos;s life satisfaction depends less on spouses&apos; relative educational standing than on the couple&apos;s educational resources.
                  </figcaption>
                  </figure>
                  

                <ul className="cv-list">
                  {program.keyQuestions.slice(1).map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </>
            ) : (
              program.keyQuestions.length > 0 && (
                <>
                  <p className="research-project__label">Key Questions</p>
                  <ul className="cv-list">
                    {program.keyQuestions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </>
              )
            )}

            {program.relatedWork.length > 0 && (
              <>
                <p className="research-project__label">Related Work</p>
                <ul className="cv-list">
                  {program.relatedWork.map((item, i) => (
                    <Citation key={i} {...item} />
                  ))}
                </ul>
              </>
            )}
          </section>
        ))}
      </main>
    </>
  );
}