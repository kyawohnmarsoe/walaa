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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('display_name')->nullable();
            $table->string('mobile_number')->nullable();
            $table->string('customer_user_index');
            $table->string('prev_balance')->nullable();
            $table->string('paid_amount')->nullable();
            $table->string('current_balance')->nullable();
            $table->string('notes')->nullable();
            $table->string('modify_user')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
