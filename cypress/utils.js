// L'URL sur laquelle votre application web est visitable (à changer si nécessaire)
export const BASE_URL = "http://localhost:3000/";
// L'URL de l'API Supabase à mettre à jour absolument

const supabaseUrl = 'https://mgtlijrpsimrqnupirbn.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndGxpanJwc2ltcnFudXBpcmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTQ3NzIsImV4cCI6MjAyMzkzMDc3Mn0.qJgcTH5vJqbB3KQEKBjkmncMlZ2DzZX-mdzJn3IqZYI"  // Assurez-vous que l'espace après SUPABASE_KEY dans l'original est supprimé
export const API_URL = supabaseUrl;
// La clé d'API de votre compte Supabase à mettre à jour absolument
export const API_KEY = supabaseKey;

/**
 * Petite fonction utilitaire qui permet de supprimer tout ce qui se trouve dans les tables customers et invoices
 * de l'API SupaBase
 */
export const resetDatabase = () => {
  cy.request({
    method: "DELETE",
    url: API_URL + "/invoices?id=gt.0",
    headers: {
      apiKey: API_KEY,
    },
  });

  cy.request({
    method: "DELETE",
    url: API_URL + "/customers?id=gt.0",
    headers: {
      apiKey: API_KEY,
    },
  });
};
