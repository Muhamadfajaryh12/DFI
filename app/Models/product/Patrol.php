<?php

namespace App\Models\product;

use App\Models\product\Item;
use App\Models\product\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patrol extends Model
{
    protected $table = 'patrol_product';

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
        return $this->belongsTo(Item::class,'id_item_product');
    }
    public function product(){
        return $this->belongsTo(Product::class,'id_master_product');
    }
    public function user(){
        return $this->belongsTo(User::class,'id_user');
    }
}