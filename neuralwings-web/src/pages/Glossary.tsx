import { Link } from 'react-router-dom';
import { DocPage } from '../components/layout/DocPage';
import glossary from '../content/glossary.json';

const slug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function Glossary() {
  return (
    <DocPage
      eyebrow="Reference"
      title="Aviation training glossary"
      updated="1 August 2026"
      intro="The regulatory, operational and training terms used inside flight training organisations worldwide — written plainly, for the people who have to work with them."
    >
      {/* Jump links */}
      <nav className="flex flex-wrap gap-2 -mt-2">
        {glossary.map((group) => (
          <a
            key={group.group}
            href={`#${slug(group.group)}`}
            className="px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white text-[13px] font-semibold text-zinc-600 hover:border-sky-300 hover:text-sky-600 transition-colors"
          >
            {group.group}
          </a>
        ))}
      </nav>

      {glossary.map((group) => (
        <section key={group.group} id={slug(group.group)} className="scroll-mt-28">
          <h2 className="font-heading font-bold text-[21px] md:text-[26px] text-zinc-900 leading-snug mb-4">
            {group.group}
          </h2>

          <dl className="flex flex-col gap-4">
            {group.items.map((item) => (
              <div
                key={item.term}
                id={slug(item.term)}
                className="scroll-mt-28 p-5 rounded-2xl border border-zinc-200 bg-white shadow-sm"
              >
                <dt className="font-heading font-bold text-[16px] text-zinc-900 mb-1.5">{item.term}</dt>
                <dd className="font-sans text-[15px] leading-relaxed text-zinc-600">{item.definition}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <section>
        <h2 className="font-heading font-bold text-[21px] md:text-[26px] text-zinc-900 leading-snug mb-3">
          Where these show up in practice
        </h2>
        <p className="font-sans text-[15px] leading-relaxed text-zinc-600">
          Nearly every term here corresponds to something an academy has to track, renew or prove. That is what{' '}
          <Link to="/" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            Neural Wings
          </Link>{' '}
          exists to hold together — and the{' '}
          <Link to="/faq" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            FAQ
          </Link>{' '}
          covers how.
        </p>
      </section>
    </DocPage>
  );
}
