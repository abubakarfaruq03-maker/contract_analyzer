import { get, set, del, keys } from 'idb-keyval';

// 1. Save an analysis result
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

// 2. Get all saved analyses for the Dashboard
export const getAllAnalyses = async () => {
  const allKeys = await keys();
  const allData = await Promise.all(
    allKeys.map(key => get(key))
  );
  // Sort by newest first
  return allData.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// 3. Delete an entry
export const deleteAnalysis = async (id: string) => {
  await del(id);
};