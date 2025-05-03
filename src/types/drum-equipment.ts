export interface DrumEquipment {
  id?: number;
  jenis: string;
  merk: string;
  gambar: string;
  harga: number;
  stok: number;
}

export type DrumEquipmentType = 'snare' | 'tom' | 'cymbal'; 