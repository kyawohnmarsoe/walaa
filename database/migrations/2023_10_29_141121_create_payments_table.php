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
            $table->string('invoinceID');
            $table->string('userIndex');
            $table->string('displayName');
            $table->string('affiliateName');
            $table->string('invoiceType');
            $table->string('invoiceDescription');
            $table->string('invoiceDuration');
            $table->string('salePrice');
            $table->string('retailPriceCurrency');
            $table->string('retailPrice')->nullable();
            $table->string('referenceRecord')->nullable();
            $table->string('recordDate')->nullable();
            $table->string('invoiceStatus')->nullable();
            $table->string('lastStatusChanged')->nullable();
            $table->string('accountName')->nullable();
            $table->string('notes')->nullable();
            $table->string('userID')->nullable();
            $table->string('paidPrice')->nullable();
            $table->string('discountedPrice')->nullable();
            $table->string('modifyUser')->nullable();
            $table->string('paymentDueDate')->nullable();
            $table->string('paymentDueDateTime')->nullable();
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
