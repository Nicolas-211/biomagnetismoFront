import { useEffect, useState } from 'react';


type Par = {
  _id: string;
  nombre: string;
  tipo: string;
  zona: string;
  PATOGENO: string;
  PAR_GOIZ: string;
  PUNTO_APLICACIÓN_1: string;
  PUNTO_APLICACIÓN_2: string;
  enfermedad?: string;
  info_adicional?: string;
};

export default function ParDetail({ id, onBack }: { id: string; onBack: () => void }) {
  const [par, setPar] = useState<Par | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPar = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pares/${id}`);
        if (!response.ok) throw new Error('Par no encontrado');
        const data = await response.json();
        setPar(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchPar();
  }, [id]);

  // Función para formatear el nombre de la imagen
  const formatImageName = (name: string) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-') // Reemplaza espacios con un solo guión
      .replace(/[^a-z0-9-]/g, '') // Elimina caracteres especiales
      .replace(/-+/g, '-'); // Reemplaza múltiples guiones consecutivos por uno solo
  };
  

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!par) return <div className="text-center py-8">No se encontró el par</div>;

  const imageBasePath = "https://res.cloudinary.com/dtfdvztc6/image/upload/biomagnetismo";
  const formattedName = formatImageName(par.nombre);
  const image1 = `https://res.cloudinary.com/dtfdvztc6/image/upload/biomagnetismo/${formattedName}-p1.jpg`;
  const image2 = `https://res.cloudinary.com/dtfdvztc6/image/upload/biomagnetismo/${formattedName}-p2.jpg`;
  console.log(formattedName)

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Volver
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{par.nombre}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Información Básica</h2>
            <p><span className="font-medium">Tipo:</span> {par.tipo}</p>
            <p><span className="font-medium">Zona:</span> {par.zona}</p>
            <p><span className="font-medium">Patógeno:</span> {par.PATOGENO}</p>
            <p><span className="font-medium">Par Goiz:</span> {par.PAR_GOIZ}</p>
          </div>

          {par.enfermedad && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Enfermedad Asociada</h2>
              <p>{par.enfermedad}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <img
              src={image1}
              alt={`Punto de aplicación 1 para ${par.nombre}`}
              className="mx-auto rounded-lg shadow-md mb-4 max-h-64"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
              }}
            />
            <h3 className="text-lg font-semibold">Punto de Aplicación 1</h3>
            <p className="mt-2 text-gray-700">{par.PUNTO_APLICACIÓN_1}</p>
          </div>

          <div className="text-center">
            <img
              src={image2}
              alt={`Punto de aplicación 2 para ${par.nombre}`}
              className="mx-auto rounded-lg shadow-md mb-4 max-h-64"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
              }}
            />
            <h3 className="text-lg font-semibold">Punto de Aplicación 2</h3>
            <p className="mt-2 text-gray-700">{par.PUNTO_APLICACIÓN_2}</p>
          </div>
        </div>

        {par.info_adicional && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Información Adicional</h2>
            <p className="text-gray-700">{par.info_adicional}</p>
          </div>
        )}
      </div>
    </div>
  );
}