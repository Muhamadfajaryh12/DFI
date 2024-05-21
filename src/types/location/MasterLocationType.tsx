export interface MasterLocationType {
  id: number;
  check_allow: string;
  location_code: string;
  location_name: string;
  no_referensi: number;
  foto_qr: string;
  created_at: string;
  updated_at: string;
}

export interface InputMasterLocationProps {
  id?: number;
  location_name: string;
  no_referensi: number;
  check_allow: string;
}
