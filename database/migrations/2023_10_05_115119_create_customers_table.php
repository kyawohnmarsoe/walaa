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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->integer('account_index');
            $table->integer('sub_account_id')->dafault(0);
            $table->integer('affiliate_index');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('customer_user_id');
            $table->integer('customer_user_index');
            $table->string('mobile_number')->nullable();
            $table->string('mobile_number2')->nullable();
            $table->string('address')->nullable();
            $table->string('email');
            $table->string('city')->nullable();
            $table->string('user_active_manage')->nullable();
            $table->string('company')->nullable();
            $table->string('state')->nullable();
            $table->string('display_name')->nullable();
            $table->string('caller_id')->nullable();
            $table->text('customer_user_notes')->nullable();
            $table->string('status')->nullable();
            $table->string('account_status')->nullable();
            $table->string('account_package_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
