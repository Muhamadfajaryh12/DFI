export interface PatrolLocationType {}

export interface InputPatrolLocationProps {
  id?: number;
  patrol_type: string;
  patrol_value: string;
  patrol_status: string;
  remark: string;
  id_master_location: number;
  id_item_location: number;
  id_user: number;
}
