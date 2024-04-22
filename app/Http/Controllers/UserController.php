<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResponseResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{   
    
    public function getAll(){
        $user = User::all();
        return response()->json(
            new ResponseResource(true,'Employee',$user)
        );
    }
    public function Register(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'username'=>'required',
            'role'=>'required',
            'no_telp'=>'required',
            'jenis_kelamin'=>'required',
            'kota'=>'required',
            'password'=>'required'
        ]);

        if($validator->fails()){
            return response()->json(new ResponseResource(false,'There is an error',$validator->errors()));
        }

        $user = User::create([
            'name' => $request->input('name'),
            'username'=> $request->input('username'),
            'role' => $request->input('role'),
            'no_telp'=> $request->input('no_telp'),
            'jenis_kelamin' => $request->input('jenis_kelamin'),
            'kota'=>$request->input('kota'),
            'password' => bcrypt($request->input('password')),
        ]);

        $responseData = new ResponseResource(true, 'Created successfully', $user);
        return response()->json($responseData);
  
    }
    public function Login(Request $request){
        $validator = Validator::make($request->all(),[
            'username' => 'required',
            'password'=> 'required'
        ]);
        
        if($validator->fails()){
            return response()->json(new ResponseResource(false,'There is an error',$validator->errors()));
        }
        $credentials = $request->only('username', 'password');

        if (!$token = auth()->attempt($credentials)) {
            $responseData = new ResponseResource(false, 'Incorrect username or password', null);
            return response()->json($responseData,400);      
          }
        
          $user = auth()->user();

          $responseData = new ResponseResource(true, 'Login Successfully', [
              'token' => $token,
              'user' => $user, 
          ]);         
           return response()->json($responseData);
    }
    
    public function Profile($id)
    {
        $user = User::find($id);
        $responseData = new ResponseResource(true, 'Profile', $user);
        return response()->json($responseData);
    }

    public function ChangePassword($id,Request $request)
    {
        $validator = Validator::make($request->all(),[
            'password' => 'required',
            'password_new'=> 'required'
        ]);
        if ($validator->fails()) {
            return response()->json(new ResponseResource(false, 'Validation error', $validator->errors()), 400);
        }
    
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(new ResponseResource(false, 'User not found', null), 404);
        }
    
        if (!password_verify($request->input('password'), $user->password)) {
            return response()->json(new ResponseResource(false, 'Incorrect current password', null), 401);
        }
    
        $user->password = bcrypt($request->input('password_new'));
        $user->save();
    
        return response()->json(new ResponseResource(true, 'Password changed successfully', null), 200);
    }
    
    public function ChangeProfile($id,Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name'=>'required',
            'kota'=>'required',
            'no_telp'=>'required',
            'jenis_kelamin'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json(new ResponseResource(false, 'Validation error', $validator->errors()), 400);
        }
    
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(new ResponseResource(false, 'User not found', null), 404);
        }
        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $image->storeAs('public/images', $imageName);

        $user->name = $request->input('name');
        $user->kota = $request->input('kota');
        $user->no_telp = $request->input('no_telp');
        $user->jenis_kelamin = $request->input('jenis_kelamin');
        $user->foto = 'images/'.$imageName;
        $user->save();
    
        return response()->json(new ResponseResource(true, 'Profile changed successfully', $user), 200);
    }
    public function Delete($id)
    {
        $user = User::find($id);
        if(!$user)
        {
            $responseData = new ResponseResource(false, 'User Not Found', null);
            return response()->json($responseData);
        }else
        {
            $user->delete();
            $responseData = new ResponseResource(true, 'Deleted successfully', $user);
            return response()->json($responseData);
        }
    }
    public function Logout(){
        auth()->logout();
        $responseData = new ResponseResource(true, 'Logout Successfully', null);
        return response()->json($responseData);
    }
}