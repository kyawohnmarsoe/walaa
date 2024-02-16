<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Port extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class, 'port_id', 'id');
    }
}
