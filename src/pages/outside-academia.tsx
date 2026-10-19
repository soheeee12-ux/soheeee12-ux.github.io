import Head from 'next/head';
import Nav from '../components/Nav';
import { site } from '../content/site';

type Item = {
  heading: string;
  body: string;
};

const forthcoming = {
  tagline: 'Korean Sociologist Prayers in America · Every other week · Online',
  description:
    'Forthcoming is a fellowship group for Korean sociology students and scholars in the United States. I am one of the initial members. We meet online every other week for reading, prayer, and Scripture sharing. We reflect on our scholarship as a calling, pray for our society, and support one another.',
  reading: 'We are currently reading Timothy Keller’s Every Good Endeavor.',
  image: '/forthcoming.png',
};

const danbi = {
  image: '/danbi.jpg',
  alt: 'Danbi, a gray curly-haired dog in a light-blue harness, sitting in a cafe',
  description:
    'Danbi (단비) means “welcome rain” in Korean, and that is exactly what Danbi is to our home: a small, sweet joy that brightens ordinary days. With soft gray curls, a light-blue harness, and a very proper sitting pose for every photo, Danbi is simply adorable. Danbi is also my favorite reminder to step away from the screen, take a walk, and enjoy the little things.',
};

// 내용을 채우면 그 항목만 화면에 나타나요. body가 비어 있으면 숨겨져요.
const items: Item[] = [
  {
    heading: 'Reading',
    body: '',
  },
  {
    heading: 'Hobbies',
    body: '',
  },
  {
    heading: 'Life in Champaign-Urbana',
    body: '',
  },
];

export default function OutsideAcademia() {
  return (
    <>
      <Head>
        <title>Outside Academia · {site.name}</title>
      </Head>

      <Nav />

      <main className="container">
        <h1>Outside Academia</h1>

        <section>
          <p>
            Outside of research and teaching, here is a little about what I
            enjoy and the communities I am part of.
          </p>
        </section>

        <section>
          <h2>Forthcoming Fellowship</h2>
          <p>
            <em>{forthcoming.tagline}</em>
          </p>

          {forthcoming.image && (
            <p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={forthcoming.image}
                alt="Forthcoming Fellowship"
                style={{ maxWidth: '320px', width: '100%', height: 'auto' }}
              />
            </p>
          )}

          <p>{forthcoming.description}</p>
          <p>{forthcoming.reading}</p>
          <p>
            If you are a Korean sociology student or scholar in the United
            States and would like to join, please{' '}
            <a href={`mailto:${site.email}`}>contact me</a>.
          </p>
        </section>

        <section>
          <h2>Meet Danbi</h2>

          {danbi.image && (
            <p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={danbi.image}
                alt={danbi.alt}
                style={{
                  maxWidth: '420px',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                }}
              />
            </p>
          )}

          <p>{danbi.description}</p>
        </section>

        {items
          .filter((item) => item.body.trim() !== '')
          .map((item) => (
            <section key={item.heading}>
              <h2>{item.heading}</h2>
              <p>{item.body}</p>
            </section>
          ))}
      </main>
    </>
  );
}