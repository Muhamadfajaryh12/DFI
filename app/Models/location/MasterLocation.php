<?php

namespace App\Models\location;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_name',
        'check_allow',
        'location_code',
        'no_referensi',
        'foto_qr'
    ];
}