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
        Schema::create('ports', function (Blueprint $table) {
            $table->id();
            $table->integer('device_id');
            $table->string('port_name');
            $table->string('port_number')->nullable();
            $table->string('port_type')->nullable();
            $table->integer('no_of_clients')->default(0);
            $table->longText('notes')->nullable();
            $table->integer('port_status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ports');
    }
};
