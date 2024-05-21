<?php

namespace App\Models\product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\product\Item;
use App\Models\product\Product;
class Task extends Model
{
    protected $table = 'task_product';

    use HasFactory;
    protected $fillable = [
        'id_master_product',
        'id_item_product',
        'task_type',
        'std_value',
        'remark',
        'min_spec',
        'max_spec'
    ] ;

    public function item(){
        return $this->belongsTo(Item::class,'id_item_product');
    }
    public function product(){
        return $this->belongsTo(Product::class,'id_master_product');
    }
}