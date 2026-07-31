# Demo request handler (Google Apps Script)

Backend for the **Book a Demo** form on neuralwings.org. It receives the form
submission, logs it to a Google Sheet, and emails the team.

Mail is sent **from hello@neuralwings.org**, because the script itself is owned
and deployed by that Google account — no "send mail as" alias needed.

| | |
|---|---|
| Owner account | hello@neuralwings.org |
| Script ID | `1JEqQ_kHI6o1obRarIqu95cauRWYNjWoFW-yQpHjsK6yCjWKkEbfgMIe7` |
| Editor | https://script.google.com/d/1JEqQ_kHI6o1obRarIqu95cauRWYNjWoFW-yQpHjsK6yCjWKkEbfgMIe7/edit |
| Web app URL | `https://script.google.com/macros/s/AKfycby2YLrcFi1GNiz5RcCxJAEy_2Tn-Gdw7laGC5RCssGkU-03ZeX4AlcGlpN8e5F6qhEK/exec` |

The web app URL is referenced as `APPS_SCRIPT_URL` in
[`neuralwings-web/src/pages/BookDemo.tsx`](../neuralwings-web/src/pages/BookDemo.tsx).

## Working on it

clasp is authenticated as hello@neuralwings.org under the named profile
`neuralwings`, so the default profile (hello@earnwings.org) is untouched. Every
command needs that flag:

```bash
cd apps-script
clasp push --user neuralwings --force          # upload local changes
clasp create-deployment --user neuralwings \
  --deploymentId AKfycby2YLrcFi1GNiz5RcCxJAEy_2Tn-Gdw7laGC5RCssGkU-03ZeX4AlcGlpN8e5F6qhEK \
  --description "what changed"                 # publish to the SAME live URL
clasp tail-logs --user neuralwings             # recent executions
clasp open-script --user neuralwings           # open the editor
```

Always redeploy with `--deploymentId`. Omitting it mints a **new** URL and the
live form keeps hitting the old one.

`clasp push` overwrites `appsscript.json` from the remote on `clone`/`pull` —
if the manifest loses its `webapp` block or the Asia/Kolkata timezone, restore
it from git and push again.

## One-time authorization

A web app that executes as its owner will return **403 Access denied** to
visitors until the owner has granted the script's OAuth scopes. That consent
can only be given in a browser:

1. Open the editor as hello@neuralwings.org.
2. Select the `testSetup` function and press **Run**.
3. Work through **Review permissions** → choose hello@neuralwings.org → and if
   the app is unverified, **Advanced** → **Go to Neural Wings — Demo Requests
   (unsafe)** → **Allow**. (Unverified is expected: it is our own internal
   script, not a published add-on.)
4. `testSetup` sends a test notification to hello@neuralwings.org and prints the
   account and its aliases into the execution log. Check the **From** address on
   the email that arrives.

If the URL still returns 403 after authorizing, the Workspace admin for
neuralwings.org is blocking anonymous web apps. Fix in Admin console →
**Apps → Google Workspace → Drive and Docs → Sharing settings**, allowing
sharing outside the organisation (or the equivalent Apps Script setting), then
redeploy.

## Configuration

All settings live in the `CONFIG` block at the top of `Code.gs`:

- `NOTIFY_TO` — where demo notifications land.
- `SEND_FROM` — the From address. If the script is ever moved to another
  account, that address must be a verified *Send mail as* alias there; if it
  isn't, mail still goes out from the owning account and a warning is logged,
  so leads are never silently dropped.
- `SHEET_ID` — leave empty and a log spreadsheet is created automatically in
  hello@neuralwings.org's Drive on the first submission, its id cached in
  script properties. Set an id to use an existing sheet.
- `SEND_ACK` — on. Every requester gets a branded confirmation email built by
  `acknowledgementHtml()`. Set to `false` to stop sending it.
- `LOGO_URL` — the logo shown in that email, served from
  `neuralwings-web/public/email-logo.png`. It must stay at a public, stable URL:
  the bundled site logo is 2.3 MB behind a build hash, so it cannot be used.

### Editing the confirmation email

The template is table-based with inline styles because email clients strip
stylesheets and Outlook ignores modern CSS. To preview a change without
sending mail, render it locally — `acknowledgementHtml()` touches no Apps
Script APIs:

```bash
node -e "eval(require('fs').readFileSync('apps-script/Code.gs','utf8'));
  require('fs').writeFileSync('/tmp/preview.html',
    acknowledgementHtml('Hi Arjun,', 'Apex Aviation Academy',
      [['Name','Capt. Arjun Mehta'],['Organisation','Apex Aviation Academy']]))"
open /tmp/preview.html
```

## Notes

- Gmail sending quota is 1,500 recipients/day on Workspace, 100/day on a
  consumer account.
- Replying to a notification goes straight to the enquirer (`replyTo` is set to
  their address).
- A request with no name, email, or phone is treated as a health check: it
  returns `OK` and writes nothing.
- Sheet logging failures are caught and logged so they cannot block the email.
