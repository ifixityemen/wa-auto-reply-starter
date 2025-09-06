const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();
const rulesFile = path.join(__dirname, '../data/rules.json');

// جلب القواعد
router.get('/', async (req, res) => {
  try {
    const rules = await fs.readJson(rulesFile);
    res.json(rules);
  } catch {
    res.json([]);
  }
});

// إضافة أو تعديل قاعدة
router.post('/', async (req, res) => {
  const newRule = req.body;
  let rules = [];
  try {
    rules = await fs.readJson(rulesFile);
  } catch {
    rules = [];
  }
  rules.push(newRule);
  await fs.writeJson(rulesFile, rules, { spaces: 2 });
  res.json({ success: true, rules });
});

module.exports = router;
