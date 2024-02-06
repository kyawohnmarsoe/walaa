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
        Schema::create('affiliates_payments', function (Blueprint $table) {
            $table->id();
             $table->string('affiliate_name')->nullable();
             $table->string('affiliate_index');
             $table->bigInteger('prev_balance');
             $table->bigInteger('paid_amount');
             $table->bigInteger('current_balance');
             $table->string('notes')->nullable();
             $table->string('modify_user');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliates_payments');
    }
};
