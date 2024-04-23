<?php

namespace App\Models\product;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'master_product';

    use HasFactory;
    protected $fillable = [
        'product_name',
        'barcode',
        'category_id',
        'slug',
        'foto_barcode'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}