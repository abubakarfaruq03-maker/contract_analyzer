import { useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom';
import Home from './app/Home/Home';
import Dashboard from './app/dashboard/DBpage';
import AnalysisWorkspace from './app/analysis/Apage';

const App = () => {
 
  return (
<div className="min-h-screen w-screen">
 <Routes>
<Route path="/" element={<Dashboard />} />
        
        {/* The Workspace - handles both new uploads and historical IDs */}
        <Route path="/analyze" element={<AnalysisWorkspace />} />
        <Route path="/analyze/:id" element={<AnalysisWorkspace />} /> </Routes>
    </div>
  )
}

export default App
