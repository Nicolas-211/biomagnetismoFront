import { useEffect, useState } from 'react';

interface Par {
  _id: string;
  nombre: string;
  tipo: string;
  PATOGENO: string;
}

export default function ParList({ onSelect }: { onSelect: (id: string) => void }) {
  const [pares, setPares] = useState<Par[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pares`)
      .then(res => res.json())
      .then(data => setPares(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Pares Biomagnéticos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pares.map(par => (
          <div 
            key={par._id} 
            onClick={() => onSelect(par._id)}
            className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-blue-50"
          >
            <h2 className="font-bold">{par.nombre}</h2>
            <p>{par.tipo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}