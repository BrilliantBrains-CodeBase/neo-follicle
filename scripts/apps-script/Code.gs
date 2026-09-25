/**
 * Neo Follicle website lead endpoint.
 *
 * Receives every submission of src/components/ContactUs.tsx (home, /contact-us/
 * and /nft-brochure/), appends it to the "Leads" tab of the Sheet this script
 * is bound to, and emails the clinic. Setup and redeploy steps: README.md.
 *
 * The site POSTs `text/plain;charset=utf-8` with a JSON body -- a CORS simple
 * request, because Apps Script cannot answer an OPTIONS preflight. See
 * FORMS.leadEndpoint in src/config/site.ts.
 */

var SHEET_NAME = 'Leads'
var DEFAULT_NOTIFY_TO = 'info@neofollicletransplant.com'
var MAX_LEN = 1000

/** [header, payload key]. Order here is column order in the Sheet. */
var COLUMNS = [
  ['Timestamp (IST)', null],
  ['Form', 'form'],
  ['Name', 'name'],
  ['Phone', 'phone'],
  ['Email', 'email'],
  ['Country', 'country'],
  ['Service', 'service'],
  ['Message', 'message'],
  ['Page URL', 'page'],
  ['Referrer', 'referrer'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_term', 'utm_term'],
  ['utm_content', 'utm_content'],
  ['gclid', 'gclid'],
  ['fbclid', 'fbclid'],
  ['Status', null],
]

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}')

    // Honeypot: real visitors never see the `website` field. Report success so
    // the bot learns nothing, but store nothing.
    if (data.website) return json_({ ok: true })

    var lead = clean_(data)
    if (!lead.name || !lead.phone) return json_({ ok: false, error: 'name and phone are required' })

    var sheet = sheet_()
    var row = COLUMNS.map(function (col) {
      if (col[0] === 'Timestamp (IST)') {
        return Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss')
      }
      return col[1] ? lead[col[1]] || '' : ''
    })

    var lock = LockService.getScriptLock()
    lock.waitLock(10000)
    try {
      sheet.appendRow(row)
    } finally {
      lock.releaseLock()
    }

    notify_(lead, sheet)
    return json_({ ok: true })
  } catch (err) {
    console.error(err)
    return json_({ ok: false })
  }
}

/** Health check: open the /exec URL in a browser. */
function doGet() {
  return json_({ ok: true })
}

/** Trims, caps length, strips phone spaces and neutralises formula injection. */
function clean_(data) {
  var out = {}
  COLUMNS.forEach(function (col) {
    var key = col[1]
    if (!key) return
    var v = data[key] == null ? '' : String(data[key]).trim().slice(0, MAX_LEN)
    if (key === 'phone') v = v.replace(/[\s()-]/g, '')
    // A leading = + - @ makes Sheets evaluate the cell. The phone's leading +
    // is escaped too, which also stops Sheets turning +91... into a number.
    if (/^[=+\-@]/.test(v)) v = "'" + v
    out[key] = v
  })
  return out
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (c) { return c[0] }))
    sheet.setFrozenRows(1)
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold')
  }
  return sheet
}

function notify_(lead, sheet) {
  var to = PropertiesService.getScriptProperties().getProperty('NOTIFY_TO') || DEFAULT_NOTIFY_TO
  var body = COLUMNS
    .filter(function (c) { return c[1] && lead[c[1]] })
    .map(function (c) { return c[0] + ': ' + lead[c[1]].replace(/^'/, '') })
    .join('\n')
  var options = { name: 'Neo Follicle Website' }
  if (lead.email) options.replyTo = lead.email.replace(/^'/, '')

  MailApp.sendEmail(
    to,
    'New lead: ' + lead.name.replace(/^'/, '') + ' – ' + (lead.service || lead.form || 'website'),
    body + '\n\nAll leads: ' + sheet.getParent().getUrl(),
    options
  )
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

/** Run from the editor to check the Sheet row and the email end to end. */
function testDoPost() {
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        form: 'test',
        name: 'Test Lead',
        phone: '+91 99999 99999',
        email: 'test@example.com',
        service: 'Not sure yet',
        message: '=HYPERLINK("x") should stay literal',
        page: 'https://example.com/contact-us/',
        utm_source: 'google',
      }),
    },
  })
  console.log(res.getContent())
}
