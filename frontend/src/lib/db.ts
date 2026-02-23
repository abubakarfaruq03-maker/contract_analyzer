import { get, set, del, keys } from 'idb-keyval';

/**
 * 1. Save Analysis
 * Storing the 'file' (Blob/File object) directly in IndexedDB is supported 
 * and much better than storing Base64 strings (which are 33% larger).
 */
export const saveAnalysis = async (fileName: string, data: any) => {
  const id = `${fileName}-${Date.now()}`;
  await set(id, {
    ...data,
    id,
    fileName,
    timestamp: new Date().toISOString()
  });
  return id;
};

/**
 * 2. Get Single Analysis by ID
 * Used by the /analyze/:id route to load historical data.
 */
export const getAnalysisById = async (id: string) => {
  return await get(id);
};

/**
 * 3. Get All Saved Analyses
 * Fetches everything for the Dashboard "Recent Intelligence" table.
 */
export const getAllAnalyses = async () => {
  const allKeys = await keys();
  const allData = await Promise.all(
    allKeys.map(key => get(key))
  );
  
  // Filter out any undefined results and sort by newest
  return allData
    .filter(item => item !== undefined)
    .sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
};

/**
 * 4. Delete Analysis
 */
export const deleteAnalysis = async (id: string) => {
  await del(id);
};