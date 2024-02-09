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
        Schema::create('devticket_remarks', function (Blueprint $table) {
            $table->id();
            $table->integer('devticket_id');
            $table->string('remarks')->nullable();
            $table->string('rm_attach_file')->nullable();
            $table->integer('remark_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devticket_remarks');
    }
};
