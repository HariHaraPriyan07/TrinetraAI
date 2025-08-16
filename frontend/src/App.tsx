import React from 'react';
import HomePage from './pages/HomePage';
import { TooltipProvider } from './components/ui/Tooltip';

function App() {
  return (
    <TooltipProvider>
      <div className="App">
        <HomePage />
      </div>
    </TooltipProvider>
  );
}

export default App;