<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //

    protected $fillable = [
        'name',
        'description',
        'sku',
        'barcode',
        'price',
        'cost',
        'quantity',
        'reorder_level',
        'category_id',
        'supplier_id',
    ];

    public function user()
    {
        return $this->belongsto(User::class);
    }
}
