import { ItemLocationType } from "./ItemLocationType";
import { MasterLocationType } from "./MasterLocationType";

export interface TaskLocationType {
  id: number;
  remark: string;
  std_value: string;
  task_type: string;
  created_at: string;
  updated_at: string;
  master: MasterLocationType;
  item: ItemLocationType;
}

export interface InputTaskLocationProps {
  id?: number;
  task_type: string;
  std_value: string;
  remark: string;
  id_master_location: number;
  id_item_location: number;
}
