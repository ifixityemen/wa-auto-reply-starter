const express = require('express');
const bodyParser = require('body-parser');
const rulesRouter = require('./routes/rules');
const backupRouter = require('./routes/backup');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// health check
app.get('/', (req, res) => {
  res.send('WA Auto Reply Starter is running ✅');
});

// قواعد الردود
app.use('/rules', rulesRouter);

// النسخة الاحتياطية
app.use('/backup', backupRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
