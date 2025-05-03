import { DrumEquipment, DrumEquipmentType } from '../types/drum-equipment';
import { useNavigate } from 'react-router-dom';

interface EquipmentListProps {
  equipment: DrumEquipment[];
  type: DrumEquipmentType;
  title: string;
}

export default function EquipmentList({ equipment, type, title }: EquipmentListProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/${type}/${item.id}`)}
          >
            <img
              src={item.gambar}
              alt={item.jenis}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{item.jenis}</h3>
            <p className="text-gray-600">{item.merk}</p>
            <p className="text-lg font-bold mt-2">Rp {item.harga.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 