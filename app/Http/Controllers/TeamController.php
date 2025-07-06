<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Teams;
use Illuminate\Support\Facades\Storage;

class TeamController extends Controller
{
    public function index()
    {
        return Teams::with('school', 'category')->get();
    }

    public function getCategoryType(Request $request){
        try{
            $categories = Teams::with('school','category')->where('category_id',$request->category_id)->get();
            return response()->json($categories, 200);
        }catch(\Exception $e){
            return response()->json(['Error' => 'Something went wrong'. $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'school_id' => 'required',
                'name' => 'required',
                'category_id' => 'required',
            ]);

            $teams = Teams::create([
                'school_id' => $request->school_id,
                'name' => $request->name,
                'category_id' => $request->category_id,
            ]);

            return response()->json($teams, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function show(Teams $team)
    {
        return $team;
    }

    public function update(Request $request, Teams $team)
    {
        $request->validate([
            'school_id' => 'required|exists:schools,id',
            'name' => 'required|string|max:255',
            'category_id' => 'required',
        ]);

        try {
            $team->school_id = $request->school_id;
            $team->name = $request->name;
            $team->category_id = $request->category_id;
            $team->save(); 
            
            return response()->json([
                'message' => 'Team updated successfully',
                'team' => $team->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Teams $team)
    {
        try {
            $team->delete();
            return response()->json([
                'message' => 'Team deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong: ' . $e->getMessage()
            ], 500);
        }
    }
}