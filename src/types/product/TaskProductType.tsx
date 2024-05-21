export interface InputTaskProductProps {
  id?: number;
  task_type: string;
  std_value: string | number;
  remark: string;
  min_spec: string;
  max_spec: string;
  id_master_product: number;
  id_item_product: number;
}
