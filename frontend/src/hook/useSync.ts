import { getUnsyncedAnalyses, markAsSynced } from '../lib/db';
import axios from 'axios';

export const useSync = () => {
  const syncData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn("No token found, skipping sync.");
      return;
    }

    const unsynced = await getUnsyncedAnalyses();
    if (unsynced.length === 0) return;

    for (const analysis of unsynced) {
      try {
        // We are sending JSON, so the backend route MUST NOT use upload.single()
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/analyzer/save`,
          {
            fileName: analysis.fileName,
            results: analysis.results, 
          },
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json' // Explicitly tell backend it's JSON
            } 
          }
        );

        await markAsSynced(analysis.id, response.data.id);
        console.log(`✅ Synced: ${analysis.fileName}`);
      } catch (err: any) {
        console.error(`❌ Sync failed for: ${analysis.fileName}`, err.response?.data || err.message);
      }
    }
  };

  return { syncData };
};