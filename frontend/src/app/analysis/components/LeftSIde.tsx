import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface LeftSideProps {
  fileUrl: string | null; // This will be a blob URL
}

const LeftSide: React.FC<LeftSideProps> = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="w-full md:w-[60%] h-[50vh] md:h-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-border-line relative">
      {!fileUrl ? (
        <div className="flex items-center justify-center h-full text-secondary-text animate-pulse">
          Waiting for document...
        </div>
      ) : (
        <div className="h-full">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer 
              fileUrl={fileUrl} 
              plugins={[defaultLayoutPluginInstance]} 
              theme={{ theme: 'auto' }}
            />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default LeftSide;