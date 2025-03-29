import { useState } from 'react';
import ParList from './components/ParList';
import ParDetail from './components/ParDetail';

function App() {
  const [selectedParId, setSelectedParId] = useState<string | null>(null);

  return (
    <div className="p-8">
      {selectedParId === null ? (
        <ParList onSelect={(id: string) => setSelectedParId(id)} />
      ) : (
        <ParDetail id={selectedParId} onBack={() => setSelectedParId(null)} />
      )}
    </div>
  );
}

export default App;