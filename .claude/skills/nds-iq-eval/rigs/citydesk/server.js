// CityDesk portal - static file server + a couple of JSON endpoints.
// Nothing fancy: plain Express, an in-memory array standing in for the DB.
var express = require('express');
var path = require('path');

var app = express();
var PORT = 3000;

var CSP = [
  "default-src 'self'",
  "script-src 'self' https://cdn.jsdelivr.net https://code.jquery.com https://cdn.datatables.net https://cdn.tiny.cloud",
  "style-src 'self' https://cdn.jsdelivr.net https://cdn.datatables.net https://cdn.tiny.cloud",
  "img-src 'self' data: https:",
  "font-src 'self' https://cdn.jsdelivr.net",
  "connect-src 'self'"
].join('; ');

app.use(function (req, res, next) {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', CSP);
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---------------------------------------------------------------------
// fake ticket data
// ---------------------------------------------------------------------

var DEPARTMENTS = ['Water & Utilities', 'Roads & Transport', 'Parks & Recreation', 'Permits & Licensing', 'Waste Management'];
var STATUSES = ['open', 'pending', 'closed'];

var SUBJECT_WORDS = [
  'Pothole on', 'Water leak near', 'Streetlight out at', 'Noise complaint on',
  'Trash pickup missed on', 'Permit renewal for', 'Park bench broken at',
  'Traffic signal malfunction at', 'Illegal dumping near', 'Tree trimming request for',
  'Sidewalk repair on', 'Sewer smell reported near', 'Dog park fence damaged at',
  'Parking meter broken on', 'Business license question re:', 'Graffiti reported at',
  'Storm drain clogged on', 'Fire hydrant leaking at', 'Playground equipment issue at',
  'Recycling bin request for'
];

var STREET_NAMES = [
  'Elm St', 'Maple Ave', 'Oak Blvd', '5th Street', 'Riverside Dr', 'Main St',
  'Cedar Ln', 'Highland Ave', 'Sunset Blvd', 'Park Row', 'Union Sq', 'Market St'
];

var TICKETS = (function generateTickets(count) {
  var out = [];
  var twoYearsMs = 2 * 365 * 24 * 60 * 60 * 1000;
  var now = Date.now();

  for (var i = 1; i <= count; i++) {
    var subjectWord = SUBJECT_WORDS[i % SUBJECT_WORDS.length];
    var street = STREET_NAMES[(i * 7) % STREET_NAMES.length];
    var dept = DEPARTMENTS[i % DEPARTMENTS.length];
    var status = STATUSES[i % STATUSES.length];
    var createdAt = new Date(now - Math.floor(Math.random() * twoYearsMs));

    out.push({
      id: 'TCK-' + String(i).padStart(6, '0'),
      subject: subjectWord + ' ' + street,
      department: dept,
      status: status,
      created: createdAt.toISOString()
    });
  }
  return out;
})(3000);

// ---------------------------------------------------------------------
// routes
// ---------------------------------------------------------------------

app.get('/api/tickets', function (req, res) {
  var page = parseInt(req.query.page, 10) || 1;
  var perPage = 25;
  var q = (req.query.q || '').toLowerCase();
  var status = req.query.status || '';
  var dept = req.query.dept || '';

  var filtered = TICKETS.filter(function (t) {
    if (q && t.subject.toLowerCase().indexOf(q) === -1) return false;
    if (status && t.status !== status) return false;
    if (dept && t.department !== dept) return false;
    return true;
  });

  var total = filtered.length;
  var from = (page - 1) * perPage;
  var to = Math.min(from + perPage, total);
  var items = filtered.slice(from, to);

  res.json({
    items: items,
    from: total === 0 ? 0 : from + 1,
    to: to,
    total: total
  });
});

app.get('/api/stats', function (req, res) {
  var stats = { open: 0, pending: 0, closed: 0 };
  TICKETS.forEach(function (t) {
    stats[t.status]++;
  });
  res.json(stats);
});

app.post('/api/requests', function (req, res) {
  // in a real system this would hit a DB / ticketing queue
  var id = 'REQ-' + Math.floor(100000 + Math.random() * 900000);
  res.json({ ok: true, id: id });
});

app.get('/sso/login', function (req, res) {
  // stub SSO handoff - real deployment points this at the city's IdP
  res.redirect('/account.html#profile');
});

app.listen(PORT, function () {
  console.log('CityDesk portal running on http://localhost:' + PORT);
});
