import { Link } from 'react-router-dom';
import { DocPage, DocSection, DocList } from '../components/layout/DocPage';
import { CONTACT_EMAIL, SUPPORT_EMAIL } from '../lib/contact';

const MailLink = ({ address }: { address: string }) => (
  <a href={`mailto:${address}`} className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
    {address}
  </a>
);

export function Terms() {
  return (
    <DocPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="31 July 2026"
      intro="The terms that govern your use of the Neural Wings website and platform, operated by Cephionix."
    >
      <DocSection title="1. Acceptance">
        <p>
          By accessing neuralwings.org or using the Neural Wings platform, you agree to these terms. If you are
          agreeing on behalf of a flight training organisation, you confirm you are authorised to bind that
          organisation. If you do not agree, please do not use the site or the platform.
        </p>
      </DocSection>

      <DocSection title="2. The website and the platform">
        <p>
          This website describes Neural Wings and lets you request a demonstration. The dashboards, figures, and
          scenarios shown here are illustrative demonstrations, not live operational data from any organisation.
        </p>
        <p>
          Access to the Neural Wings platform itself is provided to customer organisations under a separate
          written service agreement. Where that agreement conflicts with these terms, the service agreement
          prevails for that customer.
        </p>
      </DocSection>

      <DocSection title="3. Demo requests">
        <p>
          Submitting the demo form is a request for contact. It does not create a contract, reserve capacity,
          or commit either side to pricing. Please give accurate details so we can respond usefully.
        </p>
      </DocSection>

      <DocSection title="4. Acceptable use">
        <p>When using this site or the platform, you agree not to:</p>
        <DocList
          items={[
            'Attempt to gain unauthorised access to any account, system, or data.',
            'Probe, scan, or test the vulnerability of the service without our written permission.',
            'Interfere with or disrupt the service, or overload it with automated requests.',
            'Scrape, crawl, mirror, or harvest the site or platform by any automated means.',
            'Upload unlawful content, malware, or any material you do not have the right to submit.',
            'Use the service in a way that breaches DGCA regulations or any other applicable law.',
          ]}
        />
        <p>
          To report a vulnerability responsibly, write to <MailLink address={SUPPORT_EMAIL} /> before disclosing
          it publicly.
        </p>
      </DocSection>

      <DocSection title="5. Accounts and customer responsibilities">
        <p>
          Customer organisations are responsible for keeping credentials confidential, assigning roles
          appropriately, ensuring the accuracy of the records they enter, and ensuring they have the right to
          upload data about their staff and cadets. Notify us immediately at <MailLink address={SUPPORT_EMAIL} />{' '}
          if you suspect unauthorised access.
        </p>
      </DocSection>

      <DocSection title="6. Operational and regulatory responsibility">
        <p>
          Neural Wings is a decision-support and record-keeping system. It assists with dispatch checks,
          compliance tracking, scheduling, and reporting — it does not replace the judgement or the legal
          responsibility of the Accountable Manager, Chief Flight Instructor, Pilot-in-Command, maintenance
          personnel, or any other post holder. All operational, airworthiness, and regulatory decisions remain
          with the customer and its qualified personnel.
        </p>
      </DocSection>

      <DocSection id="ip" title="7. Ownership — everything here belongs to Cephionix">
        <p>
          Neural Wings, this website, and the platform are original works created and developed by Cephionix at
          substantial cost and over a long period. <strong className="text-zinc-800">Cephionix is and remains the
          sole and exclusive owner of all of it.</strong> Nothing on this site is open source, public domain, or
          free to reuse, and viewing it grants you no licence of any kind.
        </p>
        <p>Our exclusive property includes, without limitation:</p>
        <DocList
          items={[
            <><strong className="text-zinc-800">The software.</strong> All source code, object code, front-end and back-end implementation, APIs, database schemas, data models, system architecture, integrations, and deployment configuration.</>,
            <><strong className="text-zinc-800">The AIRE engine.</strong> The rules, logic, parameter sets, scoring methods, decision thresholds, prompts, and models behind the Go/No-Go engine, the scheduler, and every automated recommendation the platform makes.</>,
            <><strong className="text-zinc-800">The design.</strong> Every screen, dashboard, layout, wireframe, navigation structure, interaction pattern, animation, chart design, icon set, illustration, colour system, and typographic treatment.</>,
            <><strong className="text-zinc-800">The content.</strong> All text, headings, module names, module descriptions, feature explanations, marketing copy, diagrams, flowcharts, videos, and imagery on this website and inside the product.</>,
            <><strong className="text-zinc-800">The brand.</strong> The Neural Wings and Cephionix names and logos, the AIRE, EARNWINGS, and VERIOS names, and the tagline "Built by Pilots. Built for Pilots."</>,
            <><strong className="text-zinc-800">The know-how.</strong> Our documentation, training materials, implementation methodology, pricing structures, and any non-public information disclosed in a demonstration or proposal.</>,
          ]}
        />
        <p>
          These works are protected under the Copyright Act, 1957, the Trade Marks Act, 1999, the Designs Act,
          2000, the Information Technology Act, 2000, and Indian law on trade secrets, confidence, and passing
          off — together with equivalent laws and international treaties (including the Berne Convention) in
          every country where this site is accessible. © 2026 Cephionix. All rights reserved.
        </p>
      </DocSection>

      <DocSection title="8. Trade marks and brand">
        <p>
          "Neural Wings", "Cephionix", "AIRE", "EARNWINGS", "VERIOS", the Neural Wings winged logo and wordmark,
          our module names, and our visual identity are trade marks of Cephionix, whether registered or
          protected as unregistered marks through use.
        </p>
        <p>You may not, without our prior written permission:</p>
        <DocList
          items={[
            'Use our names, logos, or marks in any product, service, website, application, or document.',
            'Adopt a name, logo, wordmark, tagline, domain, app name, or social media handle that is identical to, or confusingly similar to, ours.',
            'Use our marks in advertising, metadata, keyword bidding, hashtags, or search terms.',
            'State or imply any partnership, endorsement, certification, or affiliation with Cephionix that does not exist.',
          ]}
        />
      </DocSection>

      <DocSection title="9. Screenshots, demonstrations, and product imagery">
        <p>
          Every screen, dashboard, chart, report layout, and screenshot shown on this website, in a live demo, in
          a recorded walkthrough, or in any deck or PDF we share with you is a copyrighted work owned by
          Cephionix.
        </p>
        <p>You may not, without our prior written permission:</p>
        <DocList
          items={[
            'Screenshot, screen-record, photograph, or otherwise capture our interface for reuse, publication, or distribution.',
            'Reproduce our screens or screenshots in a website, app, presentation, pitch deck, investor material, tender or RFP response, brochure, article, or social media post.',
            'Use our screens in a comparison, mock-up, prototype, or specification given to a developer, agency, or contractor.',
            'Include our screens, imagery, code, or text in any dataset used to train, fine-tune, or evaluate an artificial intelligence or machine learning model.',
            'Remove, obscure, or alter any copyright notice, watermark, or attribution.',
          ]}
        />
        <p>
          Demonstrations, trials, and proposals are provided in confidence. Attending a demonstration gives you
          no right to record it or to share what you were shown with a third party, including a developer or a
          competing vendor.
        </p>
      </DocSection>

      <DocSection title="10. The way information is presented is itself protected">
        <p>
          A large part of the value of Neural Wings is not any single feature — it is{' '}
          <strong className="text-zinc-800">how the information is organised and presented</strong>: what a
          Director sees versus what an instructor sees, which numbers sit next to which, what is surfaced as an
          alert and what stays in the background, how a dispatch decision is broken down, how compliance status
          is scored and colour-coded, how the modules are named, grouped, and sequenced, and how a screen guides
          a user from a signal to a decision.
        </p>
        <p>
          That selection, arrangement, structure, sequence, and organisation is our original expression and our
          confidential know-how. It is protected as a copyrightable work and compilation, as the trade dress and
          "look and feel" of our product, and as trade secrets where it is not publicly visible.
        </p>
        <p>
          <strong className="text-zinc-800">
            Building a product that reproduces or closely imitates this presentation is an infringement — and we
            treat it as one.
          </strong>{' '}
          This applies whether it is done by copying our code or design files directly, or by studying this
          website, a demonstration, a screenshot, or a customer's live instance and rebuilding the same
          structure, screens, module breakdown, workflow, terminology, or information hierarchy in your own
          system. Changing our colours, renaming our modules, or re-drawing our screens does not make a copy
          lawful.
        </p>
      </DocSection>

      <DocSection title="11. What you may not do">
        <p>
          Without our prior written permission, you must not, directly or through any other person, agency,
          contractor, or automated tool:
        </p>
        <DocList
          items={[
            'Copy, reproduce, publish, distribute, transmit, mirror, or archive any part of this website or the platform.',
            'Create derivative works, adaptations, translations, or "inspired-by" versions of our software, designs, screens, or content.',
            'Build, commission, or assist in building a competing or similar product based on our design, structure, features, workflows, or information architecture.',
            'Reverse engineer, decompile, disassemble, or attempt to derive the source code, logic, rules, or data models behind the platform.',
            'Scrape, crawl, data-mine, or bulk-download this site or the platform, whether manually or with bots, or use its content to train AI models.',
            'Re-use our text, module descriptions, feature copy, or documentation in another website, application, proposal, or document.',
            'Sell, sublicense, lease, lend, or otherwise commercialise any part of our intellectual property.',
            'Register or apply to register any copyright, trade mark, design, or domain that incorporates or imitates our works or marks.',
          ]}
        />
        <p>
          These restrictions apply to everyone — visitors, prospective customers, current customers, former
          customers, employees, contractors, consultants, investors, and vendors alike.
        </p>
      </DocSection>

      <DocSection title="12. What you may do">
        <DocList
          items={[
            'View this website in a browser to evaluate Neural Wings for your organisation.',
            'Print or save a page for your own internal, non-commercial reference.',
            'Link to this website, provided you do not frame it or misrepresent your relationship with us.',
            'Quote a short extract for genuine news reporting, review, or research, with clear attribution to Cephionix — press and media may request logo and screenshot assets at ' + CONTACT_EMAIL + '.',
          ]}
        />
        <p>
          Customer organisations receive, under their service agreement, a limited, non-exclusive,
          non-transferable, revocable licence to use the platform for their own operations for the term of that
          agreement. That licence transfers no ownership, grants no rights to the underlying software or design,
          and ends when the agreement ends.
        </p>
      </DocSection>

      <DocSection title="13. Your data and your feedback">
        <p>
          The operational records a customer enters into Neural Wings — its student, instructor, fleet, flight,
          safety, and finance data — remain the property of that customer. We claim no ownership over them and
          process them only as described in our{' '}
          <Link to="/privacy" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            Privacy Policy
          </Link>{' '}
          and the service agreement.
        </p>
        <p>
          If you send us feedback, feature requests, or suggestions, you grant us a free, perpetual, worldwide
          right to use them to improve the product, with no obligation and no claim of ownership over the
          resulting improvements.
        </p>
      </DocSection>

      <DocSection title="14. Enforcement — what happens if our work is copied">
        <p>
          We monitor for copying of our software, designs, screens, and content, and we act on what we find. If
          you infringe our rights, we may without further notice:
        </p>
        <DocList
          items={[
            'Send takedown notices to your hosting provider, domain registrar, app store, search engine, and social platforms.',
            'Seek urgent injunctive relief, including an ex parte interim injunction, an Anton Piller (search and seizure) order, and an order to preserve evidence.',
            'Claim damages, an account of the profits you made, delivery-up or destruction of infringing material, and our legal costs.',
            'Refer the matter for criminal prosecution where the law provides for it.',
            'Terminate your access and any agreement with you immediately.',
            'Notify your customers, investors, or regulator where their interests are affected.',
          ]}
        />
        <p>
          Copyright infringement is a criminal offence in India under section 63 of the Copyright Act, 1957,
          punishable with imprisonment of six months to three years and a fine of ₹50,000 to ₹2,00,000.
          Falsifying or falsely applying a trade mark is an offence under sections 103 and 104 of the Trade
          Marks Act, 1999, carrying similar penalties. Unauthorised access to, extraction from, or tampering
          with our systems or source code attracts liability under sections 43, 65, and 66 of the Information
          Technology Act, 2000. These are in addition to civil liability, not instead of it.
        </p>
        <p>
          We will pursue infringement to the fullest extent available to us, in India and in any other
          jurisdiction where the infringement has effect.
        </p>
      </DocSection>

      <DocSection title="15. Reporting infringement and licensing enquiries">
        <p>
          If you believe your work has been infringed by us, or you have found someone copying Neural Wings,
          write to <MailLink address={CONTACT_EMAIL} /> with the details and we will investigate promptly.
        </p>
        <p>
          If you want to use our brand, screenshots, or technology legitimately — press coverage, a partnership,
          an integration, or a licence — write to the same address. Permission is often available; taking it
          without asking is not.
        </p>
      </DocSection>

      <DocSection title="16. Third-party services and links">
        <p>
          The site uses third-party services (including Google Analytics, Google Apps Script for form delivery,
          WhatsApp for contact, and public weather and map data) and may link to sites we do not control. We are
          not responsible for the content or practices of those third parties. Third-party software components
          used within our products remain the property of their respective owners and are used under their
          licences.
        </p>
      </DocSection>

      <DocSection title="17. Availability">
        <p>
          We aim for high availability but do not guarantee uninterrupted access to this website. Service levels
          for the platform, if any, are set out in the applicable service agreement. We may modify, suspend, or
          discontinue parts of the website at any time.
        </p>
      </DocSection>

      <DocSection title="18. Disclaimer">
        <p>
          Except as expressly stated in a signed service agreement, this website and its content are provided
          "as is" and "as available", without warranties of any kind, whether express or implied, including
          merchantability, fitness for a particular purpose, and non-infringement.
        </p>
      </DocSection>

      <DocSection title="19. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Cephionix will not be liable for indirect, incidental,
          special, consequential, or punitive damages, or for loss of profits, revenue, data, or goodwill,
          arising from your use of this website. Liability relating to the platform is governed by the
          applicable service agreement. Nothing in these terms excludes liability that cannot be excluded by
          law. Nothing in this clause limits our right to recover damages from you for infringement of our
          intellectual property.
        </p>
      </DocSection>

      <DocSection title="20. Privacy">
        <p>
          Our handling of personal information is described in our{' '}
          <Link to="/privacy" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            Privacy Policy
          </Link>
          , which forms part of these terms.
        </p>
      </DocSection>

      <DocSection title="21. Survival and severability">
        <p>
          The intellectual property, confidentiality, enforcement, disclaimer, and liability clauses survive any
          termination of your use of the site or the platform. If any provision is held unenforceable, the rest
          remains in full effect.
        </p>
      </DocSection>

      <DocSection title="22. Changes to these terms">
        <p>
          We may update these terms from time to time. The "last updated" date above reflects the current
          version, and continued use of the site after a change means you accept the updated terms.
        </p>
      </DocSection>

      <DocSection title="23. Governing law">
        <p>
          These terms are governed by the laws of India, and the courts of India have exclusive jurisdiction
          over any dispute arising from them. We may also seek injunctive relief to protect our intellectual
          property in any court of competent jurisdiction, anywhere in the world.
        </p>
      </DocSection>

      <DocSection title="24. Contact">
        <p>
          Questions about these terms, licensing, or permissions: <MailLink address={CONTACT_EMAIL} />
          <br />
          Technical and security matters: <MailLink address={SUPPORT_EMAIL} />
        </p>
        <p>
          A plain-language summary of our position on copying is on the{' '}
          <Link to="/copyright" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            Intellectual Property Notice
          </Link>{' '}
          page.
        </p>
      </DocSection>
    </DocPage>
  );
}
