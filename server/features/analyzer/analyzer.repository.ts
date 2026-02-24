import db from '../../routes/db.js';
export const saveAnalysisToDb = async (userId: string, fileName: string, analysisData: any) => {
  const { summary, overallRiskScore, risks, keyDates } = analysisData;

  const query = `
    INSERT INTO analyses 
    (user_id, file_name, summary, risk_score, risks_json, dates_json) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *;
  `;

  const values = [
    userId, 
    fileName, 
    summary, 
    overallRiskScore, 
    JSON.stringify(risks), 
    JSON.stringify(keyDates)
  ];

  const result = await db.query(query, values);
  return result.rows[0];
};

export const getUserAnalyses = async (userId: string) => {
  const result = await db.query(
    'SELECT * FROM analyses WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};