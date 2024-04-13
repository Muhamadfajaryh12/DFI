<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatrolLocationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patrol_location', function (Blueprint $table) {
            $table->id();
            $table->string('patrol_type');
            $table->string('patrol_value');
            $table->string('remark')->nullable();
            $table->text('foto');
            $table->timestamps();
            $table->foreignId('id_master_location')->constrained('master_location')->onDelete('cascade');
            $table->foreignId('id_item_location')->constrained('item_location')->onDelete('cascade');
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patrol_location');
    }
}