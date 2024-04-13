<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskLocationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_location', function (Blueprint $table) {
            $table->id();
            $table->string('task_type');
            $table->string('std_value');
            $table->string('remark');
            $table->timestamps();
            $table->foreignId('id_master_location')->constrained('master_location')->onDelete('cascade');
            $table->foreignId('id_item_location')->constrained('item_location')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_location');
    }
}