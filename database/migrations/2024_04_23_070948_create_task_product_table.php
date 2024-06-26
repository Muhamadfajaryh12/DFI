<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_product', function (Blueprint $table) {
            $table->id();
            $table->string('task_type');
            $table->string('std_value');
            $table->string('remark')->nullable();
            $table->string('min_spec')->nullable();
            $table->string('max_spec')->nullable();
            $table->foreignId('id_master_product')->constrained('master_product')->onDelete('cascade');
            $table->foreignId('id_item_product')->constrained('item_product')->onDelete('cascade');
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
        Schema::dropIfExists('task_product');
    }
}