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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->integer('account_index')->unique();
            $table->string('account_name');
            $table->string('is_max_account');
            $table->text('account_description');
            $table->string('account_image_path')->nullable();
            $table->string('account_thumbnail')->nullable();
            $table->string('end_user_account_price')->nullable();
            $table->string('account_price')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
