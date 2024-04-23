<?php

namespace App\Models\location;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemLocation extends Model
{
    protected $table = 'item_location';
    use HasFactory;

    protected $fillable = [
        'item_name'
    ];
}   