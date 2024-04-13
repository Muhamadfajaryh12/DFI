<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    public function insert(Request $request){
        $validator = Validator::make($request->all(),[
            'product_id' => 'required',
            'item_id'=> 'required',
            'task_type'=>'required',
            'std_value'=>'required',
            'input_type',
            'opt',
            'remark',
            'min_spec',
            'max_spec'
        ]);

        if($validator->fails()){
            return response()->json(['message'=>$validator->errors()->first()],400);
        }
        
        $task = Task::create([
            'product_id' => $request->input('product_id'),
            'item_id'=> $request->input('item_id'),
            'task_type'=>$request->input('task_type'),
            'std_value'=>$request->input('std_value'),
            'input_type'=>$request->input('input_type'),
            'opt'=>$request->input('opt'),
            'remark'=>$request->input('remark'),
            'min_spec'=>$request->input('min_spec'),
            'max_spec'=>$request->input('max_spec')
        ]);

        $task->load('product');
        $task->load('item');
        return response()->json([
            'message'=>'Created Successfuly',
            'data'=>$task
        ]);
        
    }

    public function getAll(){
        $task = Task::all();
        $task->load('product');
        $task->load('item');
        return response()->json([
            'message'=>'List Tasks',
            'data'=>$task
        ]);
    }

    public function detail($id){
        $task = Task::find($id);
        $task->load('product');
        $task->load('item');
        return response()->json([
            'message'=>'List Tasks',
            'data'=>$task
        ]);
    }

    public function update(Request $request,$id){
        $validator = Validator::make($request->all(),[
            'product_id' => 'required',
            'item_id'=> 'required',
            'task_type'=>'required',
            'std_value'=>'required',
            'input_type',
            'opt',
            'remark',
            'min_spec',
            'max_spec'
        ]);

        if($validator->fails()){
            return response()->json(['message'=>$validator->errors()->first()]);
        }

        $task = Task::find($id);
        $task->update([
            'product_id' => $request->input('product_id'),
            'item_id'=> $request->input('item_id'),
            'task_type'=>$request->input('task_type'),
            'std_value'=>$request->input('std_value'),
            'input_type'=>$request->input('input_type'),
            'opt'=>$request->input('opt'),
            'remark'=>$request->input('remark'),
            'min_spec'=>$request->input('min_spec'),
            'max_spec'=>$request->input('max_spec')
        ]);
        $task->load('product');
        $task->load('item');
        
        return response()->json([
            'message'=>'Updated Successfuly',
            'data'=>$task
        ]);
    }

    public function delete($id){
        $task = Task::find($id)->delete();
        return response()->json([
            'message'=>'Deleted Successfully'
        ]);
    }

    public function search(Request $request){
        $keyword = $request->input('search');
        $task = Task::where('task_type', 'like', "%$keyword%")->get();
        $task->load('product');
        $task->load('item');
        return response()->json([
            'data'=>$task
        ],200);
    }
}