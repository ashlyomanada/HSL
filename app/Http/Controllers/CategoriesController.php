<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;
use Illuminate\Support\Facades\Storage;

class CategoriesController extends Controller
{
    public function index(){
        return Categories::all();
    }

    public function store(Request $request){
       try{

            $request->validate([
                'category' => 'required',
                'image_url' => 'required'
            ]);

            $path = $request->file('image_url')->store('images', 'public');
            $categories = Categories::create([
                'category' => $request->category,
                'image_url' => $path
            ]);

            return response()->json($categories, 200);
            
       }catch(\Exception $e){
            return response()->json(['error' => 'something went wrong'. $e->getMessage()], 500);
       }
    }

    public function show(Categories $category){
        return $category;
    }

    public function update(Request $request, Categories $category){
         try{
             $request->validate([
                'category' => 'required',
                'image_url' => 'required'
            ]);
            
            $category->category = $request->category;

            if ($request->hasFile('image_url')) {
                if ($category->image_url && Storage::disk('public')->exists($category->image_url)) {
                    Storage::disk('public')->delete($category->image_url);
                }
                $path = $request->file('image_url')->store('logos', 'public');
                $category->image_url = $path;
            }

            $category->save();

            return response()->json([
                'message' => 'successfully updated category',
                'category' => $category->fresh(),
            ], 200);
            
       }catch(\Exception $e){
            return response()->json(['error' => 'something went wrong'. $e->getMessage()], 500);
       }
    }

    public function destroy(Categories $category){
        try{
           $category->delete();
           return response()->json(['message' => 'category successfully deleted'], 200);
       }catch(\Exception $e){
            return response()->json(['error' => 'something went wrong'. $e->getMessage()], 500);
       }
    }
}