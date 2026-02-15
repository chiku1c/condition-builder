import { useState } from 'react';
import { createInitialTree } from './utils/conditionTree';
import ConditionBuilder from './components/ConditionBuilder';
import './App.css';

function App() {
  const [conditionTree, setConditionTree] = useState(() =>
    createInitialTree(true)
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Condition Builder</h1>
      </header>
      <main className="App-main">
        <ConditionBuilder
          tree={conditionTree}
          onTreeChange={setConditionTree}
        />
      </main>
    </div>
  );
}

export default App;
