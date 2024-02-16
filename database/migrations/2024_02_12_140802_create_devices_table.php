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
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->integer('tower_id');
            $table->string('device_name');
            $table->string('ip_address')->nullable();
            $table->string('device_type')->nullable();
            $table->string('device_model')->nullable();
            $table->integer('no_of_ports')->default(0);
            $table->longText('notes')->nullable();
            $table->integer('device_status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};
