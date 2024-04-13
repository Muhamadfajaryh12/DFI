<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_id',
        'item_id',
        'task_type',
        'std_value',
        'input_type',
        'opt',
        'remark',
        'min_spec',
        'max_spec'
    ] ;

    public function item(){
        return $this->belongsTo(Item::class,'item_id');
    }
    public function product(){
        return $this->belongsTo(Product::class,'product_id');
    }
}