<?php

namespace App\Http\Controllers\location;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\location\PatrolLocation;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PatrolLocationController extends Controller
{
    public function getAll(){
        $patrol_location = PatrolLocation::all();
        $patrol_location->load('master');
        $patrol_location->load('item');
        $patrol_location->load('user');
        $response = new ResponseResource(true,'List Patrol Location',$patrol_location);
        return response()->json($response,200);
    }

    public function detail($id){
        $patrol_location = PatrolLocation::find($id);
        $patrol_location->load('master');
        $patrol_location->load('item');
        $patrol_location->load('user');
        $response = new ResponseResource(true,'Detail Patrol Location',$patrol_location);
        return response()->json($response,200);
    }

    public function insert(Request $request){
        $validator = Validator::make($request->all(),[
            'patrol_type' =>'required',
            'patrol_value' => 'required',
            'patrol_status'=>'required',
            'id_master_location'=>'required',
            'id_item_location'=>'required',
            'id_user'
        ]);
        
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }

        try{
         
            $patrol_location = PatrolLocation::create([
                'patrol_type'=>$request->input('patrol_type'),
                'patrol_value'=>$request->input('patrol_value'),
                'patrol_status'=>$request->input('patrol_status'),
                'remark'=>$request->input('remark'),
                'id_master_location'=>$request->input('id_master_location'),
                'id_item_location'=>$request->input('id_item_location'),
                'id_user'=>$request->input('id_user')
            ]);

            $patrol_location->load('master');
            $patrol_location->load('item');
            $patrol_location->load('user');
            return response()->json(new ResponseResource(true, 'Created Successfully', $patrol_location), 201);

        }catch(QueryException $e){
            return response()->json([
                'message'=>$e
            ],400);
        }
    }

    public function update($id, Request $request){
        $validator = Validator::make($request->all(),[
            'patrol_type' =>'required',
            'patrol_value' => 'required',
            'patrol_status'=>'required',
            'id_master_location'=>'required',
            'id_item_location'=>'required',
            'id_user'
        ]);
        
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
            $patrol_location = PatrolLocation::find($id);

        
            $patrol_location->update([
                'patrol_type'=>$request->input('patrol_type'),
                'patrol_value'=>$request->input('patrol_value'),
                'patrol_status'=>$request->input('patrol_status'),
                'remark'=>$request->input('remark'),
                'id_master_location'=>$request->input('id_master_location'),
                'id_item_location'=>$request->input('id_item_location'),
                'id_user'=>$request->input('id_user')
            ]);

            $patrol_location->load('master');
            $patrol_location->load('item');
            $patrol_location->load('user');
            return response()->json(new ResponseResource(true, 'Updated Successfully', $patrol_location), 200);
    }
    
    public function destroy($id){
        $patrol_location = PatrolLocation::find($id);
        $patrol_location->load('master');
        $patrol_location->load('item');
        $patrol_location->load('user');
        $patrol_location->delete();
        $response = new ResponseResource(true,'Deleted Successfuly',$patrol_location);
        return response()->json($response,200);
    }

}