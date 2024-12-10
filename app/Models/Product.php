<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'sku',
        'barcode',
        'category_id',
        'user_id',
        'price',
        'cost',
        'quantity',
        'reorder_level',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function receiptItems()
    {
        return $this->hasMany(ReceiptItem::class);
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

}
