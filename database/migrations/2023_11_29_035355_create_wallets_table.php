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
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->bigInteger('balance')->default(0);
            $table->string('type');
            $table->integer('fromWallet')->nullable();
            $table->integer('toWallet')->nullable();
            $table->string('description')->nullable();
            $table->bigInteger('amount');
            $table->string('modifyUser');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wallets');
    }
};
