<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('sku')->unique(); // SKU único
            $table->string('barcode')->unique(); // Código de barras único
            $table->unsignedBigInteger('category_id'); // Relación con la categoría
            $table->unsignedBigInteger('user_id'); // Relación con el usuario
            $table->decimal('price', 8, 2);
            $table->decimal('cost', 8, 2);
            $table->integer('quantity');
            $table->integer('reorder_level');
            $table->timestamps();

            // Claves foráneas
            $table->foreign('category_id')
                  ->references('id')
                  ->on('categories')
                  ->onDelete('cascade');

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
