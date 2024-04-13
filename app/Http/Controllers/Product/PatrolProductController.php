<?php

namespace App\Http\Controllers\product;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\product\Patrol;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PatrolProductController extends Controller
{
    public function insert(Request $request){
        $validator = Validator::make($request->all(),[
            'patrol_type'=>'required',
            'patrol_value'=>'required',
            'id_master_product'=>'required',
            'id_item_product'=>'required',
            'id_user'=>'required'
        ]);

        if($validator->fails()){
            return response()->json(new ResponseResource(false, $validator->errors()->first(), null), 400);
        }
        
        try{
            $patrol = Patrol::create([
                'patrol_type' => $request->input('patrol_type'),
                'patrol_value' => $request-> input('patrol_value'),
                'id_master_product' => $request-> input('id_master_product'),
                'id_item_product'=> $request->input('id_item_product'),
                'id-user'=> $request->input('id_user')
            ]);

            $patrol->load('product');
            $patrol->load('item');

            return response()->json(
                new ResponseResource(true, 'Created Successfuly', $patrol)
            );
        }
        catch(QueryException $e){
            return response()->json([
                'message'=>$e
            ],400);
        }
    }

    public function getAll(){
        $patrol = Patrol::all();
        $patrol->load('product');
        $patrol->load('item');
        return response()->json(
            new ResponseResource(true, 'Patrol Product', $patrol )
        );
    }

    public function detail($id){
        $patrol = Patrol::find($id);
        $patrol->load('product');
        $patrol->load('item');
        return response()->json(
            new ResponseResource(true,'Detail Patrol Product',$patrol)
        );
    }

    public function delete($id){
        $patrol = Patrol::find($id);
        $patrol->delete();
        return response()->json(
            new ResponseResource(true,'Deleted Successfuly',$patrol)
        );
    }

    public function update($id, Request $request){
        $validator = Validator::make($request->all(),[
            'patrol_type'=>'required',
            'patrol_value'=>'required',
            'id_master_product'=>'required',
            'id_item_product'=>'required',
            'id_user'=>'required'
        ]);

        if($validator->fails()){
            return response()->json(['message'=>$validator->errors()->first()]);
        }

        $patrol = Patrol::find($id);
        $patrol->update([
            'patrol_type' => $request->input('patrol_type'),
            'patrol_value' => $request-> input('patrol_value'),
            'id_master_product' => $request-> input('id_master_product'),
            'id_item_product'=> $request->input('id_item_product'),
            'id-user'=> $request->input('id_user')
        ]);
        $patrol->load('product');
        $patrol->load('item');

        return response()->json(
            new ResponseResource(true, 'Updated Successfuly',$patrol)
        );
    }
    
}