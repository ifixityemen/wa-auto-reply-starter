const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const router = express.Router();
const rulesFile = path.join(__dirname, '../data/rules.json');
const backupFile = path.join(__dirname, '../data/backup.dbrt');

// تصدير نسخة احتياطية
router.get('/export', async (req, res) => {
  try {
    await fs.copy(rulesFile, backupFile);
    res.download(backupFile);
  } catch {
    res.status(500).json({ error: 'Failed to export backup' });
  }
});

// استيراد نسخة احتياطية
router.post('/import', async (req, res) => {
  try {
    await fs.copy(backupFile, rulesFile);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Failed to import backup' });
  }
});

module.exports = router;
