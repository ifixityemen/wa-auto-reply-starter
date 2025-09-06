// index.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// ملف تخزين بسيط
const RULES_FILE = './rules.json';

// load from file if exists
let rules = [];
try {
  if (fs.existsSync(RULES_FILE)) {
    rules = JSON.parse(fs.readFileSync(RULES_FILE, 'utf8') || '[]');
  }
} catch (e) {
  console.error('Failed to read rules.json:', e);
  rules = [];
}

// صحّة الخدمة
app.get('/', (_, res) => res.send('WA Auto Reply Starter is running ✅'));

// جلب القواعد
app.get('/rules', (_, res) => res.json(rules));

// إضافة قاعدة جديدة
app.post('/rules', (req, res) => {
  const { keyword, reply } = req.body || {};
  if (!keyword || !reply) return res.status(400).json({ error: 'keyword & reply are required' });

  const rule = { keyword, reply };
  rules.push(rule);

  // حفظ فوري إلى الملف
  try {
    fs.writeFileSync(RULES_FILE, JSON.stringify(rules, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to write rules.json:', e);
  }

  return res.status(201).json({ success: true, rule, count: rules.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on', PORT));
