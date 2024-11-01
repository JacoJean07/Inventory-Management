<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreInformation extends Model
{
    //
    protected $fillable = [
        'name',
        'address',
        'address_reference',
        'city',
        'phone',
        'email',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
