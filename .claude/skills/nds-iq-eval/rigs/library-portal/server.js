// بوابة المكتبة العامة — legacy server
// Express static + JSON APIs + SSO stub. In-memory data only.
const express = require('express');
const app = express();
const PORT = 3005;

app.use(express.json());
app.use(express.static('public'));

// ── بيانات في الذاكرة ──────────────────────────────────────────────

const subjects = ['مدخل الى', 'اساسيات', 'تاريخ', 'موسوعة', 'مختصر', 'دليل', 'قصص من', 'فن'];
const topics = ['الفيزياء', 'الاندلس', 'البرمجة', 'الشعر الجاهلي', 'الاقتصاد', 'النحو', 'الفلك', 'العمارة', 'الكيمياء', 'الرحلات'];
const authorNames = ['سارة الحربي', 'خالد العتيبي', 'منى القحطاني', 'فهد الدوسري', 'نورة الشمري', 'عبدالله الغامدي', 'ريم المطيري', 'ماجد الزهراني'];
const categories = ['أدب', 'تاريخ', 'علوم', 'تقنية', 'أطفال', 'دين', 'فلسفة', 'شعر'];

const books = [];
let id = 0;
for (let round = 1; round <= 8; round++) {
    for (const s of subjects) {
        for (const t of topics) {
            id++;
            books.push({
                id: id,
                title: round === 1 ? `${s} ${t}` : `${s} ${t} — الجزء ${round}`,
                author: authorNames[id % authorNames.length],
                category: categories[id % categories.length],
                year: 1990 + (id % 35),
                copies: 1 + (id % 4),
                available: id % 5 !== 0
            });
        }
    }
}
// 8 * 8 * 10 = 640 books

const events = [
    { id: 1, title: 'امسية شعرية', date: '2026-08-12', category: 'ثقافي', desc: 'امسية شعرية مفتوحة بمشاركة شعراء المنطقة.' },
    { id: 2, title: 'ورشة كتابة القصة القصيرة', date: '2026-08-15', category: 'ورشة', desc: 'ورشة تدريبية لمدة يومين للمبتدئين.' },
    { id: 3, title: 'نادي القراءة الشهري', date: '2026-08-20', category: 'نادي', desc: 'مناقشة رواية الشهر مع مجموعة القراءة.' },
    { id: 4, title: 'معرض الكتاب المستعمل', date: '2026-09-01', category: 'معرض', desc: 'بيع وتبادل الكتب المستعملة في الساحة الخارجية.' },
    { id: 5, title: 'ورشة البرمجة للناشئة', date: '2026-09-05', category: 'ورشة', desc: 'مقدمة في البرمجة للاعمار من 10 الى 15 سنة.' },
    { id: 6, title: 'محاضرة تاريخ المنطقة', date: '2026-09-10', category: 'ثقافي', desc: 'محاضرة مصورة عن تاريخ المدينة وتحولاتها.' }
];

const loans = [
    { id: 101, bookId: 12, title: 'اساسيات الفلك', out: '2026-07-20', due: '2026-08-10', status: 'مستعار', renewals: 0 },
    { id: 102, bookId: 77, title: 'تاريخ الاندلس — الجزء 1', out: '2026-07-25', due: '2026-08-15', status: 'مستعار', renewals: 1 },
    { id: 103, bookId: 230, title: 'دليل البرمجة — الجزء 3', out: '2026-06-30', due: '2026-07-21', status: 'متأخر', renewals: 2 },
    { id: 104, bookId: 45, title: 'قصص من الرحلات', out: '2026-06-10', due: '2026-07-01', status: 'مرجع', renewals: 0 },
    { id: 105, bookId: 301, title: 'موسوعة العمارة — الجزء 4', out: '2026-05-02', due: '2026-05-23', status: 'مرجع', renewals: 1 }
];

const rooms = [
    { id: 'A1', name: 'قاعة الاجتماعات الكبرى', seats: 40 },
    { id: 'A2', name: 'قاعة الندوات', seats: 25 },
    { id: 'B1', name: 'غرفة الدراسة الجماعية 1', seats: 8 },
    { id: 'B2', name: 'غرفة الدراسة الجماعية 2', seats: 8 },
    { id: 'C1', name: 'ركن الاطفال', seats: 15 }
];

let bookingSeq = 5000;

// ── واجهات البيانات ────────────────────────────────────────────────

app.get('/api/books', (req, res) => res.json(books));
app.get('/api/events', (req, res) => res.json(events));
app.get('/api/rooms', (req, res) => res.json(rooms));
app.get('/api/loans', (req, res) => res.json(loans));
app.get('/api/loans/:id', (req, res) => {
    const loan = loans.find(l => l.id === Number(req.params.id));
    if (!loan) return res.status(404).json({ error: 'not found' });
    res.json(loan);
});
app.post('/api/bookings', (req, res) => {
    bookingSeq++;
    res.json({ ok: true, ref: 'RB-' + bookingSeq });
});
app.post('/api/contact', (req, res) => res.json({ ok: true }));

// ── SSO مبسط ──────────────────────────────────────────────────────
// The real system redirects to the national SSO; this stub sets the
// session cookie and bounces straight back.
app.get('/sso/login', (req, res) => {
    const back = req.query.return || '/';
    res.setHeader('Set-Cookie', 'lib_user=' + encodeURIComponent('عضو المكتبة') + '; Path=/');
    res.redirect(back);
});
app.get('/sso/logout', (req, res) => {
    const back = req.query.return || '/';
    res.setHeader('Set-Cookie', 'lib_user=; Path=/; Max-Age=0');
    res.redirect(back);
});

app.listen(PORT, () => console.log('Library portal on http://localhost:' + PORT));
