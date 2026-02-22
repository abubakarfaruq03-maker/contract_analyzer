import { useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom';
import Home from './app/Home/Home';
import Dashboard from './app/dashboard/DBpage';
import AnalysisView from './app/analysis/Apage';


const App = () => {
 
  return (
<div className="min-h-screen w-screen">
 <Routes>
      <Route path="/" element={<AnalysisView />} />
 </Routes>
    </div>
  )
}

export default App
