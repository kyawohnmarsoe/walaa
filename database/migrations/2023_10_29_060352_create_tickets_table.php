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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->longText('title')->nullable();
            $table->string('topic');
            $table->string('level_of_importance'); 
            $table->string('ticket_number')->unique();
            $table->integer('ticket_status')->default(0);
            $table->longText('attach_file')->nullable();
            $table->integer('updated_by_loggedin_user')->default(0); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
