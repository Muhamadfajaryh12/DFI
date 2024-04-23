<?php

namespace App\Models\product;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'item_product';

    use HasFactory;
    protected $fillable= [
        'item_name',
        'slug',
        'item_value',
        'remark',
        'category_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class,'category_id');
    }
}