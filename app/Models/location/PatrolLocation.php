<?php

namespace App\Models\location;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatrolLocation extends Model
{
    protected $table = 'patrol_location';

    use HasFactory;
    protected $fillable = [
        'patrol_type',
        'patrol_value',
        'remark',
        'foto',
        'id_master_location',
        'id_item_location',
        'id_user'
    ];

    public function master(){
        return $this->belongsTo(MasterLocation::class,'id_master_location');
    }

    public function item(){
        return $this->belongsTo(ItemLocation::class,'id_item_location');
    }

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
}