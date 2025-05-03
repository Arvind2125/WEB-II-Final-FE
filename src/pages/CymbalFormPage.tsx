import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cymbalApi } from '../utils/api';
import { DrumEquipment } from '../types/drum-equipment';
import { motion } from 'framer-motion';

export default function CymbalFormPage() {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<DrumEquipment>({
    id: 0,
    jenis: '',
    merk: '',
    harga: 0,
    stok: 0,
    gambar: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await cymbalApi.getById(Number(id));
          if (response?.data) {
            setEquipment(response.data);
          }
        } catch (error) {
          setError('Failed to fetch cymbal details');
          console.error('Error:', error);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        jenis: equipment.jenis,
        merk: equipment.merk,
        gambar: equipment.gambar,
        harga: equipment.harga,
        stok: equipment.stok
      };

      if (id) {
        await cymbalApi.update(Number(id), payload);
      } else {
        await cymbalApi.create(payload);
      }
      navigate('/cymbal');
    } catch (error) {
      setError('Failed to save cymbal');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEquipment((prev) => ({
      ...prev,
      [name]: name === 'harga' ? parseInt(value) : name === 'stok' ? parseFloat(value) : value,
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-8"
        >
          {id ? 'Edit' : 'Add New'} Cymbal
        </motion.h1>
        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          >
            {error}
          </motion.div>
        )}
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label htmlFor="jenis" className="block text-sm font-medium text-gray-700">
              Jenis
            </label>
            <input
              type="text"
              id="jenis"
              name="jenis"
              value={equipment.jenis}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label htmlFor="merk" className="block text-sm font-medium text-gray-700">
              Merk
            </label>
            <input
              type="text"
              id="merk"
              name="merk"
              value={equipment.merk}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label htmlFor="gambar" className="block text-sm font-medium text-gray-700">
              Gambar URL
            </label>
            <input
              type="url"
              id="gambar"
              name="gambar"
              value={equipment.gambar}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label htmlFor="harga" className="block text-sm font-medium text-gray-700">
              Harga
            </label>
            <input
              type="number"
              id="harga"
              name="harga"
              value={equipment.harga}
              onChange={handleChange}
              required
              min="0"
              step={1}
              pattern="\d*"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <label htmlFor="stok" className="block text-sm font-medium text-gray-700">
              Stok
            </label>
            <input
              type="number"
              id="stok"
              name="stok"
              value={equipment.stok}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div 
            className="flex justify-end space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => navigate('/cymbal')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Saving...' : id ? 'Update' : 'Create'}
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
} 