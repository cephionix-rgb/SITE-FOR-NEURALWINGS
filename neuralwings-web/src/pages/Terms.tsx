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
            'Copy, scrape, resell, or reverse-engineer the platform or its content.',
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

      <DocSection title="7. Intellectual property">
        <p>
          The Neural Wings and Cephionix names, logos, software, designs, and site content are owned by
          Cephionix and protected by applicable intellectual property law. Nothing here transfers ownership to
          you. Data entered by a customer into the platform remains the property of that customer.
        </p>
      </DocSection>

      <DocSection title="8. Third-party services and links">
        <p>
          The site uses third-party services (including Google Analytics, Google Apps Script for form delivery,
          WhatsApp for contact, and public weather and map data) and may link to sites we do not control. We are
          not responsible for the content or practices of those third parties.
        </p>
      </DocSection>

      <DocSection title="9. Availability">
        <p>
          We aim for high availability but do not guarantee uninterrupted access to this website. Service levels
          for the platform, if any, are set out in the applicable service agreement. We may modify, suspend, or
          discontinue parts of the website at any time.
        </p>
      </DocSection>

      <DocSection title="10. Disclaimer">
        <p>
          Except as expressly stated in a signed service agreement, this website and its content are provided
          "as is" and "as available", without warranties of any kind, whether express or implied, including
          merchantability, fitness for a particular purpose, and non-infringement.
        </p>
      </DocSection>

      <DocSection title="11. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Cephionix will not be liable for indirect, incidental,
          special, consequential, or punitive damages, or for loss of profits, revenue, data, or goodwill,
          arising from your use of this website. Liability relating to the platform is governed by the
          applicable service agreement. Nothing in these terms excludes liability that cannot be excluded by
          law.
        </p>
      </DocSection>

      <DocSection title="12. Privacy">
        <p>
          Our handling of personal information is described in our{' '}
          <Link to="/privacy" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            Privacy Policy
          </Link>
          , which forms part of these terms.
        </p>
      </DocSection>

      <DocSection title="13. Changes to these terms">
        <p>
          We may update these terms from time to time. The "last updated" date above reflects the current
          version, and continued use of the site after a change means you accept the updated terms.
        </p>
      </DocSection>

      <DocSection title="14. Governing law">
        <p>
          These terms are governed by the laws of India, and the courts of India have exclusive jurisdiction
          over any dispute arising from them.
        </p>
      </DocSection>

      <DocSection title="15. Contact">
        <p>
          Questions about these terms: <MailLink address={CONTACT_EMAIL} />
          <br />
          Technical and security matters: <MailLink address={SUPPORT_EMAIL} />
        </p>
      </DocSection>
    </DocPage>
  );
}
