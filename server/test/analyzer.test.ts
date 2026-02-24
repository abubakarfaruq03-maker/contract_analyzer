import { describe, it, expect } from 'vitest';
import { splitText } from '../utils/text_splitter.js';

describe('Text Splitter Utility', () => {
  it('should split long text into smaller chunks', () => {
    const longText = 'A'.repeat(10000);
    const chunks = splitText(longText, 4000, 400);
    
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].length).toBe(4000);
  });
});