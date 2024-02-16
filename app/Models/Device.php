<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Device extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function tower(): BelongsTo
    {
        return $this->belongsTo(Tower::class);
    }

    public function ports()
    {
        return $this->hasMany(Port::class, 'device_id', 'id');
    }

    public function customers()
    {
        return $this->hasMany(Customer::class, 'device_id', 'id');
    }
}
