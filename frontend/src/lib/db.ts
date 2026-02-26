import { get, set, del, keys } from 'idb-keyval';

export interface AnalysisRecord {
  id: string;          // Local unique ID
  serverId?: string;   // PostgreSQL ID
  fileName: string;
  results: any;        // object structured exactly for backend /save route
  file?: File | Blob;  // Local PDF storage
  timestamp: string;
  isSynced: boolean;
}

/**
 * Saves to IndexedDB. 
 */
export const saveAnalysis = async (fileName: string, data: any): Promise<string> => {
  const id = `${fileName}-${Date.now()}`;
  
  // Extract file if present, treat everything else as results
  const { file, ...results } = data;

  const record: AnalysisRecord = {
    id,
    fileName,
    results: results, // Structured exactly for the backend /save route
    file: file,
    timestamp: new Date().toISOString(),
    isSynced: false, 
  };

  await set(id, record);
  return id;
};

export const markAsSynced = async (localId: string, serverId: string) => {
  const item = await get<AnalysisRecord>(localId);
  if (item) {
    await set(localId, { ...item, isSynced: true, serverId });
  }
};

export const getUnsyncedAnalyses = async (): Promise<AnalysisRecord[]> => {
  const all = await getAllAnalyses();
  return all.filter(item => !item.isSynced);
};

export const getAllAnalyses = async (): Promise<AnalysisRecord[]> => {
  const allKeys = await keys();
  const allData = await Promise.all(allKeys.map(key => get<AnalysisRecord>(key)));
  
  return (allData.filter(item => item !== undefined) as AnalysisRecord[])
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getAnalysisById = async (id: string): Promise<AnalysisRecord | undefined> => {
  return await get<AnalysisRecord>(id);
};

export const deleteAnalysis = async (id: string) => {
  await del(id);
};