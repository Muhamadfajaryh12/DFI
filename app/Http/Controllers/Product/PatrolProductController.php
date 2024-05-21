<?php

namespace App\Http\Controllers\product;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\product\Patrol;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PatrolProductController extends Controller
{
    public function insert(Request $request){
        $validator = Validator::make($request->all(),[
            'patrol_type'=>'required',
            'patrol_value'=>'required',
            'patrol_status'=>'required',
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
                'patrol_status'=>$request->input('patrol_status'),
                'remark'=>$request->input('remark'),
                'id_master_product' => $request-> input('id_master_product'),
                'id_item_product'=> $request->input('id_item_product'),
                'id_user'=> $request->input('id_user')
            ]);

            $patrol->load('product');
            $patrol->load('item');
            $patrol->load('user');

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
        $patrol->load('user');

        return response()->json(
            new ResponseResource(true, 'Patrol Product', $patrol )
        );
    }

    public function detail($id){
        $patrol = Patrol::find($id);
        $patrol->load('product');
        $patrol->load('item');
        $patrol->load('user');

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
            'patrol_status'=>'required',
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
            'patrol_status'=>$request->input('patrol_status'),
            'id_master_product' => $request-> input('id_master_product'),
            'id_item_product'=> $request->input('id_item_product'),
            'id-user'=> $request->input('id_user')
        ]);
        $patrol->load('product');
        $patrol->load('item');
        $patrol->load('user');

        return response()->json(
            new ResponseResource(true, 'Updated Successfuly',$patrol)
        );
    }
    public function getPatrol(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $idMasterProduct = $request->input('id_master_product');
    
        $query = Patrol::select(
            'id_item_product',
            DB::raw('SUM(CASE WHEN patrol_status = \'OK\' THEN 1 ELSE 0 END) AS ok_count'),
            DB::raw('SUM(CASE WHEN patrol_status = \'NOT OK\' THEN 1 ELSE 0 END) AS not_ok_count')
        )->groupBy('id_item_product');
    
        if ($startDate && $endDate && $idMasterProduct) {
            $query->where('id_master_product', $idMasterProduct)
                  ->whereBetween(DB::raw('DATE(created_at)'), [$startDate, $endDate]);
        } elseif ($startDate && $endDate) {
            $query->whereBetween(DB::raw('DATE(created_at)'), [$startDate, $endDate]);
        } elseif ($idMasterProduct) {
            $query->where('id_master_product', $idMasterProduct);
        }
        
    
        $patrols = $query->get();
    
        $patrols->load('item');
    
        return response()->json(
            new ResponseResource(true, 'Patrol Data', $patrols)
        );
    }
    

    public function getProductMaster()
    {
        $patrols = Patrol::select(
            'id_master_product',
            DB::raw('(SUM(CASE WHEN patrol_status = \'OK\' THEN 1 ELSE 0 END) + SUM(CASE WHEN patrol_status = \'NOT OK\' THEN 1 ELSE 0 END)) AS total_count')

        )
        ->groupBy('id_master_product')
        ->get();
    
        $totalMasterProducts = $patrols->count();
            $patrols->load('product');
        return response()->json(
            new ResponseResource(true, 'Patrol Data',$patrols)
        );
    }


}