require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.use('/auth', require('./routes/auth.routes'));
app.use('/posts', require('./routes/post.routes'));
app.use('/comments', require('./routes/comment.routes'));

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
