<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable= [
        'item_name',
        'slug',
        'item_value',
        'remark',
        'opt',
        'no',
        'category_id'
    ];

    public function category(){
        return $this->belongsTo(Category::class,'category_id');
    }
}