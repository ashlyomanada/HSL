<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Leagues;

class LeagueController extends Controller
{
    public function index(){
        $leagues = Leagues::with([
            'category'
        ])->get();

        return response()->json($leagues, 200);
    }

    public function getLeagueCategory(Request $request)
    {
        $leagues = Leagues::with('category')
            ->where('category_id', $request->category_id)
            ->first();

        return response()->json($leagues, 200);
    }


    public function store(Request $request) {
       try {
            $request->validate([
                'name' => 'required',
                'season' => 'required',
                'category_id' => 'required',
                'start_date' => 'required',
                'end_date' => 'required',
            ]);

            $leagues = Leagues::create([
                'name' => $request->name,
                'season' => $request->season,
                'category_id' => $request->category_id,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

             return response()->json($leagues, 201);
       } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
       }
    }

    public function show(Leagues $league){
        return $league;
    }

    public function update(Request $request, Leagues $league){
        $request->validate([
            'name' => 'required',
            'season' => 'required',
            'category_id' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

         try {
            $league->name = $request->name;
            $league->season = $request->season;
            $league->category_id = $request->category_id;
            $league->start_date = $request->start_date;
            $league->end_date = $request->end_date;
            $league->save(); 
            
            return response()->json([
                'message' => 'league updated successfully',
                'league' => $league->fresh()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Leagues $league)
    {
        try {
            $league->delete();
            return response()->json([
                'message' => 'League deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong: ' . $e->getMessage()
            ], 500);
        }
    }
}