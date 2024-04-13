<?php

namespace App\Models\product;

use App\Models\Item;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patrol extends Model
{
    use HasFactory;

    protected $fillable = [
    'patrol_type',
    'patrol_value',
    'remark',
    'id_master_product',
    'id_item_product',
    'id_user',
    ];

    public function item(){
        return $this->belongsTo(Item::class,'item_id');
    }
    public function product(){
        return $this->belongsTo(Product::class,'product_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}