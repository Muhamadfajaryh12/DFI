<?php

namespace App\Http\Controllers\product;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\product\Item;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class ItemProductController extends Controller
{
    public function insert(Request $request){
        $validator = Validator::make($request->all(),[
            'item_name'=>'required',
            'item_value'=>'required',
            'category_id'=>'required'
        ]);

        if($validator->fails()){
            return response()->json(new ResponseResource(false, $validator->errors()->first(), null), 400);
        }

        try{
            $item = Item::create([
                'item_name'=>$request->input('item_name'),
                'slug'=>strtolower($request->input('item_name')),
                'item_value'=>$request->input('item_value'),
                'category_id'=>$request->input('category_id')
            ]);

            $item->load('category');
            return response()->json(new ResponseResource(true,'Created Successfuly', $item), 201);
        }
        
        catch(QueryException $e){
            return response()->json(new ResponseResource(false, $e, null), 400);

        }
    }

    public function getAll(){
        $item = Item::with('category')->get();
        return response()->json(new ResponseResource(true, 'List Item', $item), 200);

    }

    public function detail($id){
        $item = Item::with('category')->find($id);
        return response()->json(new ResponseResource(true, 'Detail Item', $item), 200);
    }
    public function update(Request $request,$id){
        $validator = Validator::make($request->all(),[
            'item_name'=>'required',
            'item_value'=>'required',
            'category_id'=>'required'
        ]);

        if($validator->fails()){
            return response()->json(new ResponseResource(false, $validator->errors()->first(), null), 400);
        }
        
        $item = Item::find($id);
        $item->update([
            'item_name'=>$request->input('item_name'),
            'slug'=>strtolower(str_replace('','-',$request->input('item_name'))),
            'item_value'=>$request->input('item_value'),
            'category_id'=>$request->input('category_id')
        ]);
        $item->load('category');
        return response()->json(new ResponseResource(true, 'Updated Successfully', $item), 200);
    }

    public function delete($id){
        Item::find($id)->delete();
        
        return response()->json(new ResponseResource(true, 'Deleted Successfully', null), 200);

    }

    public function search(Request $request){
        $keyword = $request->input('search');
        $item = Item::where('item_name', 'like', "%$keyword%")->get();       
        return response()->json([
            'data' => $item
        ], 200);
    }
}