<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Photos;
use Illuminate\Support\Facades\Storage;

class PhotosController extends Controller
{
    public function index(){
        return Photos::all();
    }

    public function store(Request $request){
        try{
            $request->validate([
            'category_id' => 'required',
            'name' => 'required',
            'description' => 'required',
            'image' => 'required',
        ]);

        $path = $request->file('image')->store('photos', 'public');

        $photos = Photos::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'description' => $request->description,
            'image' => $path,
        ]);

        return response()->json($photos, 201);
        }catch(\Exception $e){
            return response()->json(['error' => 'something went wrong'.$e->getMessage()], 500);
        }
    }

    public function show(Photos $photo){
        return $photo;
    }

    public function getCategoryType($categoryId)
    {
        $photos = Photos::where('category_id', $categoryId)->get();
        return response()->json($photos);
    }


    public function update(Request $request, Photos $photo){
        try{
            $request->validate([
            'category_id' => 'required',
            'name' => 'required',
            'description' => 'required',
            'image' => 'required',
        ]);

            $photo->category_id = $request->category_id;
            $photo->name = $request->name;
            $photo->description = $request->description;

         if ($request->hasFile('image')) {
                if ($photo->image && Storage::disk('public')->exists($photo->image)) {
                    Storage::disk('public')->delete($photo->image);
                }
                $path = $request->file('image')->store('image', 'public');
                $photo->image = $path;
        }

        $photo->save();
        
        return response()->json([
                'message' => 'successfully updated category',
                'photo' => $photo->fresh(),
            ], 200);

        }catch(\Exception $e){
             return response()->json(['error' => 'something went wrong'.$e->getMessage()], 500);
        }
    }

    public function destroy(Photos $photo){
        try{
            $photo->delete();
            return response()->json(['message' => 'category successfully deleted'], 200);
        }catch(\Exception $e){
            return response()->json(['error' => 'something went wrong'.$e->getMessage()], 500);
        }
    }
}