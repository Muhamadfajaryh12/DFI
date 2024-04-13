<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ResponseResource;
class ProductController extends Controller
{
    public function insert(Request $request){
        $validator = Validator::make($request->all(),[
            'product_name'=>'required',
            'barcode'=>'required|numeric|digits:5',
            'category_id'=>'required'
        ]);       
        
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        
        try{
            $generator = new \Picqer\Barcode\BarcodeGeneratorPNG();
            $barcode = $generator->getBarcode($request->input('barcode'), $generator::TYPE_CODE_128);
            $barcodePath = 'barcode/' . $request->input('barcode') . '.png';
            Storage::disk('public')->put($barcodePath, $barcode);
            
            $product = Product::create([
                    'product_name'=>$request->input('product_name'),
                    'slug'=>strtolower($request->input('product_name')),
                    'barcode'=>$request->input('barcode'),
                    'category_id'=>$request->input('category_id'),
                    'foto_barcode'=>$barcodePath
            ]);
            $product->load('category');
            $responseData = new ResponseResource(true, 'Created Successfully', $product) ;
            return response()->json( $responseData );
        }
        catch(QueryException $e){
            return response()->json([
                'message'=>$e
            ],400);
        }
    }
    
    public function getAll(){
        $product = Product::with('category')->get();
        $responseData = new ResponseResource(true, 'List Products', $product) ;
        return response()->json($responseData);
    }

    public function detail($id){
        $product = Product::with('category')->find($id);
        $responseData = new ResponseResource(true, 'Created Successfully', $product) ;
        return response()->json($responseData);
    }

    public function update(Request $request,$id){
        $validator = Validator::make($request->all(),[
            'product_name'=>'required',
            'barcode'=>'required|numeric|digits:5',
            'category_id'=>'required'
        ]);       
        
        if($validator->fails()){
            return response()->json($validator->errors(),400);
        }
        
        try{
            
            $product = Product::find($id);

            $path= $product->qr;
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }
            $generator = new \Picqer\Barcode\BarcodeGeneratorPNG();

            $barcode = $generator->getBarcode($request->input('barcode'), $generator::TYPE_CODE_128);
            $barcodePath = 'qr/' . $request->input('barcode') . '.png';
            Storage::disk('public')->put($barcodePath, $barcode);
            
                $product->update([
                    'product_name'=>$request->input('product_name'),
                    'slug'=>strtolower($request->input('product_name')),
                    'barcode'=>$request->input('barcode'),
                    'category_id'=>$request->input('category_id'),
                    'foto_barcode'=>$barcodePath
                ]);
                
                $product->load('category');
                return response()->json(new ResponseResource(true, 'Updated Successfully', $product), 200);
        }
        catch(QueryException $e){
            return response()->json([
                'message'=>$e
            ],400);
        }
    }

    public function delete($id){
        $product = Product::find($id);
        $barcodePath = $product->barcode;

        if (Storage::disk('public')->exists($barcodePath)) 
        {
            Storage::disk('public')->delete($barcodePath);
        }
        
        $product->delete();
        $responseData = new ResponseResource(true, 'Deleted Successfully', $product) ;
        return response()->json($responseData);
    }

    public function search(Request $request){
        try {
            $keyword = $request->input('search');
            $product = Product::where('product_name', 'like', "%$keyword%")->get();
            return response()->json([
                'data' => $product
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to perform search. ' . $e->getMessage()
            ], 500);
        }
    }
    
}