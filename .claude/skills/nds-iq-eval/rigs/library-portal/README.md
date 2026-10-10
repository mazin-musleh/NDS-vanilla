# بوابة المكتبة العامة

Legacy public-library portal: Express static server + JSON APIs, Bootstrap 5 RTL, jQuery, DataTables (catalog), Select2 + Summernote (room booking), and a hash-router account area. Arabic, RTL. Members sign in through an SSO redirect (`/sso/login` stub).

```
npm install
npm start        # http://localhost:3005
```

Pages: index, catalog (640 titles), events, booking (3-step form), account (SPA: `#/profile`, `#/loans`, `#/loans/:id`), contact, admin.
