import { Link } from 'react-router-dom';
import { DocPage, DocSection, DocList } from '../components/layout/DocPage';
import { CONTACT_EMAIL, SUPPORT_EMAIL } from '../lib/contact';

const MailLink = ({ address }: { address: string }) => (
  <a href={`mailto:${address}`} className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
    {address}
  </a>
);

export function PrivacyPolicy() {
  return (
    <DocPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="31 July 2026"
      intro="How Cephionix collects, uses, and protects information when you use the Neural Wings website and platform."
    >
      <DocSection title="1. Who we are">
        <p>
          Neural Wings is an aviation management platform built by Cephionix ("Cephionix", "we", "us", "our").
          This policy applies to neuralwings.org and to the Neural Wings platform provided to flight training
          organisations ("FTOs") under a separate service agreement.
        </p>
        <p>
          For anything in this policy, write to <MailLink address={CONTACT_EMAIL} />.
        </p>
      </DocSection>

      <DocSection title="2. Information we collect">
        <p>We collect only what we need to respond to you and to run the service.</p>
        <DocList
          items={[
            <><strong className="text-zinc-800">Information you give us.</strong> When you submit the demo request form we collect your name, phone number, work email, organisation name, base location, and number of branches. If you email or message us on WhatsApp, we keep that correspondence.</>,
            <><strong className="text-zinc-800">Usage data.</strong> Standard analytics about pages visited, approximate region, device type, browser, and referring site, collected through Google Analytics.</>,
            <><strong className="text-zinc-800">Technical data.</strong> Server and hosting logs, including IP address, generated automatically when your browser requests a page.</>,
            <><strong className="text-zinc-800">Customer platform data.</strong> If your organisation uses Neural Wings, the operational records you enter (student, instructor, fleet, flight, safety and finance records) are processed by us on your organisation's instructions, as its data processor.</>,
          ]}
        />
      </DocSection>

      <DocSection title="3. How we use it">
        <DocList
          items={[
            'To respond to demo requests, enquiries, and support messages.',
            'To provide, operate, secure, and improve the Neural Wings platform.',
            'To understand which parts of the site are useful, in aggregate.',
            'To send service and account communications to customers.',
            'To meet legal, regulatory, and audit obligations that apply to us or to our customers.',
          ]}
        />
        <p>
          We do not sell your personal information, and we do not use demo enquiries for unrelated marketing.
        </p>
      </DocSection>

      <DocSection title="4. Legal basis and consent">
        <p>
          We process personal data where you have given consent (for example, by submitting the demo form),
          where processing is necessary to perform a contract with your organisation, or where we have a legal
          obligation or legitimate interest such as securing the service. You can withdraw consent at any time
          by writing to <MailLink address={CONTACT_EMAIL} />.
        </p>
      </DocSection>

      <DocSection title="5. Service providers we rely on">
        <p>We use a small number of third parties, each of which processes data on our behalf:</p>
        <DocList
          items={[
            'Google (Analytics, Workspace, and Apps Script) — website analytics and delivery of demo request submissions to our team inbox.',
            'GitHub Pages — hosting and delivery of this website.',
            'Open-Meteo and OpenStreetMap — weather and map data displayed in product demonstrations.',
          ]}
        />
        <p>
          We share personal information with these providers only to the extent needed to run the service, and
          otherwise only where the law requires it. We do not share your information with advertisers.
        </p>
      </DocSection>

      <DocSection title="6. Cookies and analytics">
        <p>
          This site uses Google Analytics, which sets cookies to measure visits and page usage. These cookies do
          not identify you by name. You can block or delete cookies in your browser settings, or install
          Google's opt-out browser add-on; the site will continue to work normally.
        </p>
      </DocSection>

      <DocSection title="7. How long we keep it">
        <p>
          Demo enquiries are retained for up to 24 months from your last contact with us, unless you ask us to
          delete them earlier. Analytics data is retained according to the retention period configured in Google
          Analytics. Customer platform data is retained for the term of the service agreement and for any period
          required by DGCA record-keeping rules, after which it is deleted or returned to the customer.
        </p>
      </DocSection>

      <DocSection title="8. Security">
        <p>
          We use role-based access control, encrypted transport (HTTPS/TLS), audit logging, and least-privilege
          access to protect information. No system is perfectly secure, but we take reasonable technical and
          organisational measures appropriate to the sensitivity of aviation training records. To report a
          security concern, write to <MailLink address={SUPPORT_EMAIL} />.
        </p>
      </DocSection>

      <DocSection title="9. Your rights">
        <p>
          Subject to applicable law, including India's Digital Personal Data Protection Act, 2023, you may ask
          us to:
        </p>
        <DocList
          items={[
            'Access the personal information we hold about you.',
            'Correct information that is inaccurate or incomplete.',
            'Delete information we no longer need to keep.',
            'Withdraw consent you previously gave.',
            'Raise a grievance about how we handled your data.',
          ]}
        />
        <p>
          Send any of these requests to <MailLink address={CONTACT_EMAIL} />. We will respond within 30 days. If
          you are a student, instructor, or staff member of an FTO that uses Neural Wings, please raise your
          request with your organisation first — it controls that data, and we act on its instructions.
        </p>
      </DocSection>

      <DocSection title="10. Children">
        <p>
          Neural Wings is a business platform intended for FTOs and their staff and cadets. It is not directed
          at children under 18, and we do not knowingly collect their personal information through this website.
        </p>
      </DocSection>

      <DocSection title="11. International transfers">
        <p>
          Our infrastructure and service providers may process data outside India. Where that happens, we take
          steps to ensure the data continues to receive a comparable level of protection.
        </p>
      </DocSection>

      <DocSection title="12. Changes to this policy">
        <p>
          We may update this policy as the product and the law evolve. The "last updated" date at the top always
          reflects the current version, and material changes will be communicated to active customers.
        </p>
      </DocSection>

      <DocSection title="13. Contact">
        <p>
          Privacy questions and data requests: <MailLink address={CONTACT_EMAIL} />
          <br />
          Technical and security matters: <MailLink address={SUPPORT_EMAIL} />
        </p>
        <p>
          See also our{' '}
          <Link to="/terms" className="text-sky-600 font-semibold hover:text-sky-700 hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </DocSection>
    </DocPage>
  );
}
