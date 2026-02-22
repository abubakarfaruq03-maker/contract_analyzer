export 
const splitText = (text: string, chunkSize: number = 4000, overlap: number = 400)
: string[] => {
  const chunks: string[] = [];
  let i = 0;

  while (i < text.length) {
    chunks.push(text.substring(i, i + chunkSize));
    i += (chunkSize - overlap); // Move forward but keep some overlap
  }

  return chunks;
};