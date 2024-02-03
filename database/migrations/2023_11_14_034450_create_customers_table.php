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
            $table->integer('customer_user_index')->unique();
            $table->string('mobile_number')->nullable();
            $table->string('mobile_number2')->nullable();
            $table->string('address')->nullable();
            $table->string('email');
            $table->string('user_password');
            $table->string('city')->nullable();
            $table->string('company')->nullable();
            $table->string('state')->nullable();
            $table->string('display_name')->nullable();
            $table->string('caller_id')->nullable();
            $table->text('customer_user_notes')->nullable();
            $table->string('status')->nullable();
            $table->integer('active_status')->default(1);
            $table->string('account_status')->nullable();
            $table->string('account_package_type')->nullable();
            $table->integer('user_group_id')->nullable();

            $table->string('manual_expiration_date')->nullable();
            $table->string('can_refill')->nullable();
            $table->string('can_change_account')->nullable();
            $table->string('can_extend_user')->nullable();

            $table->integer('sms_status')->default(0);
            $table->integer('sms_sent_by')->default(0);

            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('balance')->default(0);

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
