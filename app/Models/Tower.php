<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tower extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function customers()
    {
        return $this->hasMany(Customer::class, 'tower_id', 'id');
    }

    public function devices()
    {
        return $this->hasMany(Device::class, 'tower_id', 'id');
    }
}
