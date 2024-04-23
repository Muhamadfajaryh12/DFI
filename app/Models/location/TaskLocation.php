<?php

namespace App\Models\location;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskLocation extends Model
{
    protected $table = 'task_location';

    use HasFactory;
    protected $fillable = [
        'task_type',
        'std_value',
        'remark',
        'id_master_location',
        'id_item_location'
    ];

    public function master(){
        return $this->belongsTo(MasterLocation::class,'id_master_location');
    }

    public function item(){
        return $this->belongsTo(ItemLocation::class,'id_item_location');
    }
    
}