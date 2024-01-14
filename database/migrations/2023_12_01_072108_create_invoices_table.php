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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->string('invoinceID');
            $table->string('userIndex');
            $table->string('displayName')->nullable();
            $table->string('affiliateName');
            $table->string('invoiceType');
             $table->string('accountName');
              $table->string('invoiceDuration');
            $table->string('invoiceDescription')->nullable();
            $table->string('referenceRecord')->nullable();
             $table->string('notes')->nullable();
            $table->string('salePrice')->nullable();
            $table->string('retailPriceCurrency')->nullable();
            $table->string('retailPrice')->nullable();
            $table->string('recordDate')->nullable();
            $table->string('invoiceStatus')->nullable();
            $table->string('lastStatusChanged')->nullable();
            $table->string('userID')->nullable();
            $table->string('paidPrice')->default(0);
            $table->string('discountedPrice')->nullable();
            $table->string('balance')->nullable();
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
        Schema::dropIfExists('invoices');
    }
};
