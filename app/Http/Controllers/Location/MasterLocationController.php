<?php

namespace App\Http\Controllers\location;

use App\Http\Controllers\Controller;
use App\Http\Resources\ResponseResource;
use App\Models\location\MasterLocation;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;

class MasterLocationController extends Controller
{
    public function insert(Request $request){
        $validator = Validator::make($request->all(),[
            'location_name'=>'required',
            'no_referensi'=>'required',
            'check_allow'=>'required'
        ]);

        if($validator->fails()){
            $response = new ResponseResource(false,$validator->errors()->first(),null);
            return response()->json($response,422);
        }

        try{
            $qrCode = QrCode::format('png')->size(300)->errorCorrection('H')->generate($request->input('qrcode'));
            $qrCodePath = 'qrcode/' . $request->input('qrcode') . '.png';
            Storage::disk('public')->put($qrCodePath, $qrCode);
            $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // daftar karakter yang dapat digunakan
            $randomString = '';
            $length = 8; // panjang karakter acak yang diinginkan
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, strlen($characters) - 1)];
            }
            
            $locationCode = substr($randomString, 0, 4) . '-' . substr($randomString, 4, 4) . '-' . $request->input('no_referensi');
                    $masterLocation = MasterLocation::create([
                'location_name' => $request->input('location_name'),
                'no_referensi' => $request->input('no_referensi'),
                'check_allow' => $request->input('check_allow'),
                'location_code' => $locationCode,
                'foto_qr'=>$qrCodePath
            ]);

            $response = new ResponseResource(true,'Created Successfully',$masterLocation);
            return response()->json($response);
        }catch(QueryException $e){
            return response()->json([
                'message'=>$e
            ],400);
        }
    }

    public function getAll(){
        $master_location = MasterLocation::all();
        $response = new ResponseResource(true,'List Master Location',$master_location);
        return response()->json($response);
    }

    public function detail($id){
        $master_location = MasterLocation::findOrFail($id);
        $response = new ResponseResource(true,'Detail Master Location',$master_location);
        return response()->json($response);
    }

    public function destroy($id){
        $master_location = MasterLocation::findOrFail($id);
        $master_location->delete();
        $response = new ResponseResource(true,'Deleted Successfully',$master_location);
        return response()->json($response);
    }

    public function update($id, Request $request){
        $validator = Validator::make($request->all(),[
            'location_name'=>'required',
            'no_referensi'=>'required',
            'check_allow'=>'required'
        ]);

        if($validator->fails()){
            $response = new ResponseResource(false,$validator->errors()->first(),null);
            return response()->json($response,422);
        }

        try{
            $master_location = MasterLocation::find($id);

            $path= $master_location->foto_qr;
            
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }

            $qrCode = QrCode::format('png')->size(300)->errorCorrection('H')->generate($request->input('qrcode'));
            $qrCodePath = 'qrcode/' . $request->input('qrcode') . '.png';
            Storage::disk('public')->put($qrCodePath, $qrCode);
            $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // daftar karakter yang dapat digunakan
            $randomString = '';
            $length = 8; // panjang karakter acak yang diinginkan
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, strlen($characters) - 1)];
            }
            
            $locationCode = substr($randomString, 0, 4) . '-' . substr($randomString, 4, 4) . '-' . $request->input('no_referensi');
                    $master_location->update([
                'location_name' => $request->input('location_name'),
                'no_referensi' => $request->input('no_referensi'),
                'check_allow' => $request->input('check_allow'),
                'location_code' => $locationCode,
                'foto_qr'=>$qrCodePath
            ]);

            $response = new ResponseResource(true,'Created Successfully',$master_location);
            return response()->json($response);
        }catch(QueryException $e){
            return response()->json([
                'message'=>$e
            ],400);
        }
    }
}