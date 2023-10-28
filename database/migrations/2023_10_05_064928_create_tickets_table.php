<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {            
            $table->id();
            $table->integer('user_id');
            $table->string('ticket_source'); //Phone, Email, Other
            $table->string('topic'); // inquiries, subscriber data, maintenance, the accounts, administration
            $table->string('ticket_address');
            $table->string('level_of_importance'); // not important, normal, a task, very important
            $table->string('ticket_number')->nullable();
            $table->integer('ticket_status')->default(0);
            $table->timestamps();
        });
    }
   
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
