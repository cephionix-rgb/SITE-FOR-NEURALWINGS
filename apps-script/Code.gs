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
  // Off by default — turn on only when you are happy with the wording below.
  SEND_ACK: false,
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

  const plain =
    greeting + '\n\n' +
    'Thanks for requesting a Neural Wings demonstration. We have your details and someone from our team ' +
    'will be in touch shortly to schedule a walkthrough for ' + (request.fto || 'your organisation') + '.\n\n' +
    'If anything is urgent, reply to this email or call +91 9914801833.\n\n' +
    'Neural Wings — built by pilots, for pilots.\n' +
    'hello@neuralwings.org · neuralwings.org';

  GmailApp.sendEmail(request.email, 'Your Neural Wings demo request', plain, senderOptions({}));
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
