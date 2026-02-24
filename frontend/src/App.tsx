import { useState } from 'react'
import './index.css'
import { Routes, Route } from 'react-router-dom';
import Home from './app/Home/Home';
import Dashboard from './app/dashboard/DBpage';
import AnalysisWorkspace from './app/analysis/Apage';
import Login from './app/auth/Login';
import Register from './app/auth/Register';

const App = () => {
 
  return (
<div className="min-h-screen w-screen">
 <Routes>
<Route path="/" element={<Home />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
        
        {/* The Workspace - handles both new uploads and historical IDs */}
        <Route path="/analyze" element={<AnalysisWorkspace />} />
        <Route path="/analyze/:id" element={<AnalysisWorkspace />} /> </Routes>
    </div>
  )
}

export default App
