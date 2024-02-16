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
        Schema::create('towers', function (Blueprint $table) {
            $table->id();
            $table->string('tower_name');
            $table->string('ip_address')->nullable();
            $table->bigInteger('rent_price')->default(0);
            $table->bigInteger('electric_price')->default(0);
            $table->bigInteger('line_price')->default(0);
            $table->string('address')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('owner_name')->nullable();
            $table->string('mobile_number')->nullable();
            $table->string('mobile_number2')->nullable();
            $table->longText('notes')->nullable();
            $table->integer('tower_status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('towers');
    }
};
