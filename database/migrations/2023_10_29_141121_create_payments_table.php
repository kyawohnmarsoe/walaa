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
            $table->string('invoiceDescription')->nullable();
            $table->string('invoiceDuration');
            $table->string('salePrice')->nullable();
            $table->string('retailPriceCurrency')->nullable();
            $table->string('retailPrice');
            $table->string('referenceRecord')->nullable();
            $table->string('recordDate');
            $table->string('invoiceStatus');
            $table->string('lastStatusChanged')->nullable();
            $table->string('accountName');
            $table->string('notes')->nullable();
            $table->string('userID');
            $table->string('paidPrice')->nullable();
            $table->string('discountedPrice')->nullable();
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
