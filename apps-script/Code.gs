/**
 * Neural Wings — demo request handler (Google Apps Script web app)
 *
 * Receives submissions from the Book a Demo form on neuralwings.org,
 * logs them to a Google Sheet, and emails the team.
 *
 * All outbound mail is sent FROM hello@neuralwings.org.
 * See README.md in this folder for the one-time setup and deploy steps —
 * the alias must be verified on the Google account that owns this script,
 * or Gmail will silently fall back to that account's own address.
 */

const CONFIG = {
  // Where demo notifications are delivered.
  NOTIFY_TO: 'hello@neuralwings.org',

  // The address notifications are SENT FROM.
  // Must be a verified "Send mail as" alias on the account running this script.
  SEND_FROM: 'hello@neuralwings.org',
  SENDER_NAME: 'Neural Wings',

  // Google Sheet that logs every request.
  // Leave '' and one is created automatically on the first submission, in the
  // Drive of whichever account runs this script; its id is then remembered in
  // script properties. Set an id here to log to an existing sheet instead.
  SHEET_ID: '',
  SHEET_NAME: 'Demo Requests',
  SHEET_TITLE: 'Neural Wings — Demo Requests',

  // Send an automatic acknowledgement to the person who submitted the form.
  SEND_ACK: true,

  // Used in the acknowledgement email.
  SITE_URL: 'https://neuralwings.org',
  LOGO_URL: 'https://neuralwings.org/email-logo.png',
  PHONE_DISPLAY: '+91 9914801833',
  PHONE_TEL: '+919914801833',
  WHATSAPP_URL: 'https://wa.me/919914801833',
};

const FIELDS = ['name', 'phone', 'email', 'fto', 'location', 'branches'];

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    const params = (e && e.parameter) || {};

    // Ignore empty hits — health checks, crawlers, someone opening the URL.
    if (!params.name && !params.email && !params.phone) {
      return ContentService.createTextOutput('OK');
    }

    const request = { receivedAt: new Date() };
    FIELDS.forEach(function (field) {
      request[field] = (params[field] || '').toString().trim();
    });

    // Logging must never cost us the lead — the email is what matters.
    try {
      logToSheet(request);
    } catch (err) {
      console.error('Could not log the request to the sheet: ' + err.message);
    }

    notifyTeam(request);

    if (CONFIG.SEND_ACK && request.email) {
      sendAcknowledgement(request);
    }

    return ContentService.createTextOutput('OK');
  } catch (err) {
    console.error('Demo request failed: ' + err.message);
    return ContentService.createTextOutput('ERROR');
  }
}

/**
 * Builds the sender options for GmailApp.
 *
 * When the script runs under hello@neuralwings.org itself, that address is
 * already the sender and no `from` is needed. When it runs under another
 * account, `from` is only accepted for a verified "Send mail as" alias — so if
 * the alias is missing we log a warning and let the mail go out from the
 * account's own address. A missing alias should degrade to "the lead still
 * reaches you", never to "the lead is lost".
 */
function senderOptions(extra) {
  const options = extra || {};
  options.name = CONFIG.SENDER_NAME;

  const account = Session.getEffectiveUser().getEmail();
  if (account === CONFIG.SEND_FROM) {
    return options;
  }

  if (GmailApp.getAliases().indexOf(CONFIG.SEND_FROM) !== -1) {
    options.from = CONFIG.SEND_FROM;
  } else {
    console.warn(
      'This script is running as ' + account + ' and ' + CONFIG.SEND_FROM + ' is not a verified alias on it, ' +
      'so mail will be sent from ' + account + '. Either deploy the script from the ' + CONFIG.SEND_FROM +
      ' account, or add the alias under Gmail → Settings → Accounts and Import → Send mail as.'
    );
  }

  return options;
}

function notifyTeam(request) {
  const subject = 'New demo request — ' + (request.fto || request.name || 'Neural Wings');

  const rows = [
    ['Name', request.name],
    ['Phone', request.phone],
    ['Email', request.email],
    ['FTO', request.fto],
    ['Location', request.location],
    ['Branches', request.branches],
    ['Received', Utilities.formatDate(request.receivedAt, 'Asia/Kolkata', 'd MMM yyyy, HH:mm') + ' IST'],
  ];

  const plain = rows
    .map(function (row) { return row[0] + ': ' + (row[1] || '—'); })
    .join('\n');

  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#18181b">' +
    '<h2 style="margin:0 0 16px;font-size:18px">New demo request</h2>' +
    '<table cellpadding="6" cellspacing="0" style="border-collapse:collapse">' +
    rows.map(function (row) {
      return '<tr>' +
        '<td style="color:#71717a;white-space:nowrap">' + row[0] + '</td>' +
        '<td style="font-weight:600">' + escapeHtml(row[1] || '—') + '</td>' +
        '</tr>';
    }).join('') +
    '</table>' +
    '<p style="margin-top:16px;color:#71717a;font-size:12px">Sent by the Book a Demo form on neuralwings.org.</p>' +
    '</div>';

  // replyTo means hitting Reply goes straight to the enquirer.
  const options = senderOptions({ htmlBody: html });
  if (request.email) {
    options.replyTo = request.email;
  }

  GmailApp.sendEmail(CONFIG.NOTIFY_TO, subject, plain, options);
}

function sendAcknowledgement(request) {
  const firstName = (request.name || '').split(' ')[0];
  const greeting = firstName ? 'Hi ' + firstName + ',' : 'Hello,';
  const org = request.fto || 'your organisation';

  const details = [
    ['Name', request.name],
    ['Organisation', request.fto],
    ['Base', request.location],
    ['Branches', request.branches],
    ['Phone', request.phone],
    ['Email', request.email],
  ].filter(function (row) { return row[1]; });

  const plain =
    greeting + '\n\n' +
    'Thanks for requesting a Neural Wings demonstration — we have your details and they are with our team.\n\n' +
    'WHAT HAPPENS NEXT\n' +
    '1. We review how ' + org + ' operates today — fleet, cadets, and the reporting you are required to file.\n' +
    '2. Someone from our team contacts you to schedule a walkthrough at a time that suits your operation.\n' +
    '3. We show you the platform running on your kind of numbers, not a generic sales deck.\n\n' +
    'WHAT YOU SENT US\n' +
    details.map(function (row) { return row[0] + ': ' + row[1]; }).join('\n') + '\n\n' +
    'If anything is urgent, reply to this email, call ' + CONFIG.PHONE_DISPLAY + ', or message us on WhatsApp.\n\n' +
    'Neural Wings — built by pilots, for pilots.\n' +
    CONFIG.NOTIFY_TO + ' · neuralwings.org\n' +
    '© 2026 Cephionix. You are receiving this because you requested a demo at neuralwings.org.';

  GmailApp.sendEmail(
    request.email,
    'We have your demo request — Neural Wings',
    plain,
    senderOptions({ htmlBody: acknowledgementHtml(greeting, org, details) })
  );
}

/**
 * Acknowledgement email markup.
 *
 * Table-based with inline styles on purpose — email clients strip stylesheets,
 * ignore flexbox, and Outlook drops anything clever. Everything degrades to a
 * readable single column if a client throws away the styling entirely.
 */
function acknowledgementHtml(greeting, org, details) {
  const NAVY = '#0b1b3a';
  const SKY = '#0ea5e9';
  const TEXT = '#3f3f46';
  const MUTED = '#71717a';
  const BORDER = '#e4e9f2';

  const steps = [
    ['We read your setup', 'How ' + escapeHtml(org) + ' operates today — fleet, cadets, instructors, and the returns you have to file.'],
    ['We get in touch', 'Our team contacts you shortly to book a walkthrough at a time that suits your flying programme.'],
    ['You see it live', 'A working platform on your kind of numbers — dispatch, compliance, and billing — not a slide deck.'],
  ];

  const stepRows = steps.map(function (step, index) {
    return '' +
      '<tr>' +
        '<td valign="top" style="padding:0 14px 18px 0;width:30px">' +
          '<div style="width:28px;height:28px;border-radius:14px;background:' + SKY + ';color:#ffffff;' +
          'font:700 13px/28px Arial,Helvetica,sans-serif;text-align:center">' + (index + 1) + '</div>' +
        '</td>' +
        '<td valign="top" style="padding:0 0 18px 0">' +
          '<div style="font:700 15px/1.4 Arial,Helvetica,sans-serif;color:' + NAVY + ';padding-bottom:3px">' +
            step[0] +
          '</div>' +
          '<div style="font:400 14px/1.6 Arial,Helvetica,sans-serif;color:' + TEXT + '">' + step[1] + '</div>' +
        '</td>' +
      '</tr>';
  }).join('');

  const detailRows = details.map(function (row) {
    return '' +
      '<tr>' +
        '<td style="padding:5px 16px 5px 0;font:400 13px/1.5 Arial,Helvetica,sans-serif;color:' + MUTED + ';white-space:nowrap">' +
          escapeHtml(row[0]) +
        '</td>' +
        '<td style="padding:5px 0;font:700 13px/1.5 Arial,Helvetica,sans-serif;color:' + NAVY + '">' +
          escapeHtml(row[1]) +
        '</td>' +
      '</tr>';
  }).join('');

  return '' +
  '<!DOCTYPE html>' +
  '<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light">' +
  '<title>Neural Wings</title></head>' +
  '<body style="margin:0;padding:0;background:#f1f5fb">' +

    // Preheader — the grey preview line next to the subject in most inboxes.
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0">' +
      'Your demo request is with our team. Here is what happens next.' +
    '</div>' +

    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5fb">' +
      '<tr><td align="center" style="padding:28px 12px">' +

        '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" ' +
        'style="width:600px;max-width:100%;background:#ffffff;border:1px solid ' + BORDER + ';border-radius:14px;overflow:hidden">' +

          // Header — white, because the logo is dark artwork on transparency.
          '<tr><td bgcolor="#ffffff" align="center" style="background:#ffffff;padding:30px 24px 22px">' +
            '<img src="' + CONFIG.LOGO_URL + '" width="132" alt="Neural Wings" ' +
            'style="display:block;width:132px;max-width:132px;height:auto;border:0;outline:none">' +
          '</td></tr>' +
          '<tr><td style="height:3px;background:' + SKY + ';font-size:0;line-height:0">&nbsp;</td></tr>' +

          // Body
          '<tr><td style="padding:32px 32px 8px">' +
            '<div style="font:700 22px/1.3 Arial,Helvetica,sans-serif;color:' + NAVY + ';padding-bottom:14px">' +
              'We have your demo request.' +
            '</div>' +
            '<div style="font:400 15px/1.65 Arial,Helvetica,sans-serif;color:' + TEXT + '">' +
              escapeHtml(greeting) + '<br><br>' +
              'Thank you for your interest in Neural Wings. Your details have reached our team, and we will ' +
              'be in touch shortly to arrange a walkthrough for ' + escapeHtml(org) + '.' +
            '</div>' +
          '</td></tr>' +

          // What happens next
          '<tr><td style="padding:26px 32px 4px">' +
            '<div style="font:700 12px/1 Arial,Helvetica,sans-serif;color:' + SKY + ';letter-spacing:1.6px;padding-bottom:16px">' +
              'WHAT HAPPENS NEXT' +
            '</div>' +
            '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">' + stepRows + '</table>' +
          '</td></tr>' +

          // Submitted details
          '<tr><td style="padding:8px 32px 4px">' +
            '<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" ' +
            'style="background:#f7fafd;border:1px solid ' + BORDER + ';border-radius:10px">' +
              '<tr><td style="padding:18px 20px">' +
                '<div style="font:700 12px/1 Arial,Helvetica,sans-serif;color:' + MUTED + ';letter-spacing:1.4px;padding-bottom:12px">' +
                  'WHAT YOU SENT US' +
                '</div>' +
                '<table role="presentation" cellpadding="0" cellspacing="0" border="0">' + detailRows + '</table>' +
              '</td></tr>' +
            '</table>' +
          '</td></tr>' +

          // CTA
          '<tr><td align="center" style="padding:26px 32px 6px">' +
            '<table role="presentation" cellpadding="0" cellspacing="0" border="0">' +
              '<tr><td align="center" bgcolor="' + SKY + '" style="border-radius:9px">' +
                '<a href="' + CONFIG.SITE_URL + '/why-neural-wings" ' +
                'style="display:inline-block;padding:14px 30px;font:700 15px/1 Arial,Helvetica,sans-serif;' +
                'color:#ffffff;text-decoration:none;border-radius:9px">See why FTOs switch &rarr;</a>' +
              '</td></tr>' +
            '</table>' +
          '</td></tr>' +

          // Contact
          '<tr><td align="center" style="padding:18px 32px 30px">' +
            '<div style="font:400 14px/1.7 Arial,Helvetica,sans-serif;color:' + TEXT + '">' +
              'Need us sooner? Just reply to this email, call ' +
              '<a href="tel:' + CONFIG.PHONE_TEL + '" style="color:' + SKY + ';text-decoration:none;font-weight:700">' +
                CONFIG.PHONE_DISPLAY +
              '</a>, or message us on ' +
              '<a href="' + CONFIG.WHATSAPP_URL + '" style="color:' + SKY + ';text-decoration:none;font-weight:700">WhatsApp</a>.' +
            '</div>' +
          '</td></tr>' +

          // Footer
          '<tr><td style="background:#0b1b3a;padding:24px 32px" bgcolor="#0b1b3a">' +
            '<div style="font:700 13px/1.5 Arial,Helvetica,sans-serif;color:#ffffff;padding-bottom:4px">' +
              'Neural Wings &middot; a product of Cephionix' +
            '</div>' +
            '<div style="font:italic 400 13px/1.6 Arial,Helvetica,sans-serif;color:#9fb4d4;padding-bottom:10px">' +
              '&ldquo;Built by Pilots. Built for Pilots.&rdquo;' +
            '</div>' +
            '<div style="font:400 12px/1.7 Arial,Helvetica,sans-serif;color:#8fa5c6">' +
              '<a href="mailto:' + CONFIG.NOTIFY_TO + '" style="color:#8fa5c6;text-decoration:none">' + CONFIG.NOTIFY_TO + '</a>' +
              ' &nbsp;&middot;&nbsp; ' +
              '<a href="' + CONFIG.SITE_URL + '" style="color:#8fa5c6;text-decoration:none">neuralwings.org</a>' +
              ' &nbsp;&middot;&nbsp; India' +
            '</div>' +
            '<div style="font:400 11px/1.6 Arial,Helvetica,sans-serif;color:#64789a;padding-top:12px">' +
              '&copy; 2026 Cephionix. All rights reserved. You are receiving this because you requested a ' +
              'demonstration at neuralwings.org.' +
            '</div>' +
          '</td></tr>' +

        '</table>' +
      '</td></tr>' +
    '</table>' +
  '</body></html>';
}

/**
 * Returns the log spreadsheet, creating it on first use so there is nothing to
 * configure by hand. The id is cached in script properties.
 */
function getLogSpreadsheet() {
  if (CONFIG.SHEET_ID) {
    return SpreadsheetApp.openById(CONFIG.SHEET_ID);
  }

  const properties = PropertiesService.getScriptProperties();
  const storedId = properties.getProperty('LOG_SHEET_ID');

  if (storedId) {
    try {
      return SpreadsheetApp.openById(storedId);
    } catch (err) {
      // Sheet was deleted or moved to trash — fall through and make a new one.
      console.warn('Stored log sheet ' + storedId + ' is unreachable: ' + err.message);
    }
  }

  const spreadsheet = SpreadsheetApp.create(CONFIG.SHEET_TITLE);
  properties.setProperty('LOG_SHEET_ID', spreadsheet.getId());
  console.log('Created demo request log: ' + spreadsheet.getUrl());
  return spreadsheet;
}

function logToSheet(request) {
  const spreadsheet = getLogSpreadsheet();
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Received'].concat(FIELDS));
  }

  sheet.appendRow([request.receivedAt].concat(FIELDS.map(function (field) { return request[field]; })));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Run this once from the Apps Script editor to confirm the setup:
 * it prints the verified aliases and sends a test notification.
 */
function testSetup() {
  console.log('Account: ' + Session.getEffectiveUser().getEmail());
  console.log('Verified aliases: ' + GmailApp.getAliases().join(', '));

  notifyTeam({
    name: 'Test Cadet',
    phone: '+91 90000 00000',
    email: CONFIG.NOTIFY_TO,
    fto: 'Test Aviation Academy',
    location: 'Test Airfield',
    branches: '1 (Single Base)',
    receivedAt: new Date(),
  });

  console.log('Test notification sent to ' + CONFIG.NOTIFY_TO + '. Check the From address on it.');
}
