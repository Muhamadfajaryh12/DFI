<?php

namespace App\Http\Controllers\location;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\location\TaskLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
class TaskLocationController extends Controller
{
    public function getAll(){
        $task_location = TaskLocation::all();
        $task_location->load('master');
        $task_location->load('item');
        $response = new ResponseResource(true,'List Task Location',$task_location);
        return response()->json($response,200);
    }

    public function detail($id){
        $task_location = TaskLocation::find($id);
        $task_location->load('master');
        $task_location->load('item');
        $response = new ResponseResource(true,'Detail Task Location',$task_location);
        return response()->json($response,200);
    }

    public function insert(Request $request){
        $validator = Validator::make($request->all(),[
            'task_type' =>'required',
            'std_value' => 'required',
            'id_master_location'=>'required',
            'id_item_location'=>'required'
        ]);     

        if($validator->fails()){
            $response = new ResponseResource(false,$validator->errors()->first(),null);
            return response()->json($response,422);
        }

        try{
            $task_location = TaskLocation::create([
                'task_type'=>$request->input('task_type'),
                'std_value'=>$request->input('std_value'),
                'remark'=>$request->input('remark'),
                'id_master_location'=>$request->input('id_master_location'),
                'id_item_location'=>$request->input('id_item_location')
            ]);

            $task_location->load('master');
            $task_location->load('item');

            return response()->json(new ResponseResource(true,'Created Successfuly', $task_location), 201);
        }
        catch(QueryException $e){
            return response()->json(new ResponseResource(false, $e, null), 400);
        }
    }

    public function update($id, Request $request){
    $validator = Validator::make($request->all(),[
            'task_type' =>'required',
            'std_value' => 'required',
            'id_master_location'=>'required',
            'id_item_location'=>'required'
        ]);     

        if($validator->fails()){
            $response = new ResponseResource(false,$validator->errors()->first(),null);
            return response()->json($response,422);
        }
        
        $task_location = TaskLocation::find($id);
        
        try{
            $task_location->update([
                'task_type'=>$request->input('task_type'),
                'std_value'=>$request->input('std_value'),
                'remark'=>$request->input('remark'),
                'id_master_location'=>$request->input('id_master_location'),
                'id_item_location'=>$request->input('id_item_location')
            ]);

            $task_location->load('master');
            $task_location->load('item');

            return response()->json(new ResponseResource(true,'Updated Successfuly', $task_location), 200);
        }
        catch(QueryException $e){
            return response()->json(new ResponseResource(false, $e, null), 400);
        }
    }

    public function destroy($id){
        $task_location = TaskLocation::find($id);
        $task_location->delete();
        return response()->json(new ResponseResource(true,'Deleted Successfuly', $task_location), 200);
    }
}