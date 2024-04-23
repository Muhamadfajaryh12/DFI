<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatrolProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patrol_product', function (Blueprint $table) {
            $table->id();
            $table->string('patrol_type');
            $table->string('patrol_value');
            $table->string('remark')->nullable();
            $table->foreignId('id_master_product')->constrained('master_product')->onDelete('cascade');
            $table->foreignId('id_item_product')->constrained('item_product')->onDelete('cascade');
            $table->foreignId('id_user')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patrol_product');
    }
}