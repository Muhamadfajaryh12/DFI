<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMasterLocationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('master_location', function (Blueprint $table) {
            $table->id();
            $table->string('location_name');
            $table->string('check_allow');
            $table->string('location_code');
            $table->bigInteger('no_referensi');
            $table->text('foto_qr');
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
        Schema::dropIfExists('master_location');
    }
}