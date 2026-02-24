import app from './app.js';
// Node.js 20+ supports --env-file in the CLI, but if you're using 
// standard env vars, this is where they load.
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  🚀 LexiGuard AI Backend is live!
  📡 Port: ${PORT}
  🤖 AI Engine: Groq LPU
  `);
});