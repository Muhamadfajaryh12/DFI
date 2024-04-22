<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResponseResource;
use App\Models\Category;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function insert(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>$validator->errors()->first()
            ],422);
        }

        try{
            $categories = Category::create([
                'name' => strtoupper($request->input('name')), 
                'slug' => strtolower($request->input('name'))
            ]);
            return response()->json(new ResponseResource(true, 'Created Successfuly', $categories), 201);

        }
        catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to insert data. ' . $e->getMessage()
            ], 500);
        }
    }
    
    public function getAll(){
        return response()->json([
            'message'=>"List Category",
            'data'=>Category::all()
        ]);
    }

    public function detail ($id){
        $category = Category::find($id);
        return response()->json([
            'message'=>"List Category",
            'data'=>$category
        ]);
    }

    public function update(Request $request,$id){
        $validator = Validator::make($request->all(),[
            'name'=>'required'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        try{
            $category = Category::find($id);
            $category->update([
                'name' => strtoupper($request->input('name')),
                'slug' => strtolower($request->input('name'))
            ]);
            return response()->json([
                'message' => 'Updated Successfully',
                'data' => $category
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update data. ' . $e->getMessage()
            ], 500);
        }
    }
    
    public function delete($id){
        try{
            $category = Category::find($id);
            $category->delete();
            return response()->json([
                'message'=> 'Deleted Successfully',
                'data' => $category
            ],200);
        }
        catch(QueryException $e){
            return response()->json([
                'message'=>$e
            ],422);
        }
    }

    public function search(Request $request){
        try {
            $keyword = $request->input('search');
            $categories = Category::where('name', 'like', "%$keyword%")->get();
            return response()->json([
                'data' => $categories
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to perform search. ' . $e->getMessage()
            ], 500);
        }
    }
}