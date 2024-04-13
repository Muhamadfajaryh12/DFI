<?php

namespace App\Http\Controllers\location;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\location\ItemLocation;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class ItemLocationController extends Controller
{
    public function insert(Request $request){

        $validator = Validator::make($request->all(),[
            'item_name'=>'required'
        ]);

        if($validator->fails()){
            $response = new ResponseResource(false,$validator->errors(),400);
            return response()->json($response,422);
        }

        try{
            $itemLocation = ItemLocation::create([
                'item_name'=>$request->input('item_name')
            ]);
            $response = new ResponseResource(true,'Created Successfuly',$itemLocation);
            return response()->json($response);
        }
        catch(QueryException $e){
            $response = new ResponseResource(false,$e,null);
            return response()->json($response,400);
        }

    }

    public function getAll(){
        $itemLocation = ItemLocation::all();
        $response = new ResponseResource(true,'Location Item',$itemLocation);
        return response()->json($response,200);
    }

    public function detail($id){
        $itemLocation = ItemLocation::find($id);
        if(!$itemLocation){
            $response = new ResponseResource(true,'User not found',null);
            return response()->json($response,500);
        }else{
            $response = new ResponseResource(true,'Detail Item Location',$itemLocation);
            return response()->json($response,200);
        }
    }

    public function update($id, Request $request){
        $validator = Validator::make($request->all(),[
            'item_name'=>'required'
        ]);

        if($validator->fails()){
            $response = new ResponseResource(false,$validator->errors(),400);
            return response()->json($response,422);
        }
        try{
            $itemLocation = ItemLocation::find($id);
            
            $itemLocation->update([
                'item_name'=>$request->input('item_name')
            ]);
            
            $response = new ResponseResource(true,'Updated Successfuly',$itemLocation);
            return response()->json($response,200);
        }
        catch(QueryException $e){
            $response = new ResponseResource(false,$e,null);
            return response()->json($response,400);
        }
    }

    public function delete($id){
        $itemLocation = ItemLocation::find($id);
        if(!$itemLocation){
            $response = new ResponseResource(true,'User not found',null);
            return response()->json($response,500);
        }else{
            $itemLocation->delete();
            $response = new ResponseResource(true,'Deleted Successfully',$itemLocation);
            return response()->json($response,200);
        }
    }
}