export const Environment = {
  BASE_URL:  process.env.NODE_ENV==='development' ? 'http://localhost:8080' : 'https://notes-app-server.onrender.com/',
  SERVER_ERROR: 'Ocorreu um erro desconhecido ao consultar o servidor.'
}