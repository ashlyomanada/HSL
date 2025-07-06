<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Matches;
class MatchesController extends Controller
{
    public function index()
    {
        try {
            $matches = Matches::with([
                    'league:id,category_id',
                    'league.category:id,category',
                    'teamA:id,school_id,name',
                    'teamA.school:id,name,logo_url',
                    'teamB:id,school_id,name',
                    'teamB.school:id,name,logo_url',
                    'score',
                ])
                ->orderBy('scheduled_datetime', 'asc') 
                ->get();

            return response()->json($matches);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function showMatchesCategory(Request $request)
    {
        try {
            $request->validate([
                'category_id' => 'required|integer|exists:categories,id',
                'status' => 'required',
            ]);

            $matches = Matches::with([
                    'league:id,category_id',
                    'league.category:id,category', 
                    'teamA:id,school_id,name',
                    'teamA.school:id,name,logo_url',
                    'teamB:id,school_id,name',
                    'teamB.school:id,name,logo_url',
                    'score',
                ])
                ->where('status',$request->status)
                ->whereHas('league', function ($query) use ($request) {
                    $query->where('category_id', $request->category_id);
                })
                ->orderBy('scheduled_datetime', 'asc') 
                ->get();

            return response()->json($matches);
        } catch (\Illuminate\Validation\ValidationException $ve) {
            return response()->json(['error' => $ve->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function nextMatches(Request $request)
    {
        try {
            $request->validate([
                'status' => 'required',
            ]);

            $matches = Matches::with([
                    'league:id,category_id',
                    'league.category:id,category', 
                    'teamA:id,school_id,name',
                    'teamA.school:id,name,logo_url',
                    'teamB:id,school_id,name',
                    'teamB.school:id,name,logo_url',
                    'score',
                ])
                ->where('status',$request->status)
                ->orderBy('scheduled_datetime', 'asc') 
                ->get();

            return response()->json($matches);
        } catch (\Illuminate\Validation\ValidationException $ve) {
            return response()->json(['error' => $ve->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }



    public function store (Request $request) {
        try{
            $request->validate([
            'league_id' => 'required',
            'team_a_id' => 'required',
            'team_b_id' => 'required',
            'scheduled_datetime' => 'required',
            'venue' => 'required',
            'status' => 'required',
            'referee_id' => 'required',
        ]);

        $matches = Matches::create([
            'league_id' => $request->league_id,
            'team_a_id' => $request->team_a_id,
            'team_b_id' => $request->team_b_id,
            'scheduled_datetime' => $request->scheduled_datetime,
            'venue' => $request->venue,
            'status' => $request->status,
            'referee_id' => $request->referee_id,
        ]);

        return response()->json($matches, 201);
        }catch(\Exceptions $e){
             return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

   public function show(Matches $match)
    {
        try {
            $match->load([
                'league:id,category_id',
                'teamA:id,school_id,name',
                'teamA.school:id,name,logo_url',
                'teamB:id,school_id,name',
                'teamB.school:id,name,logo_url',
                'score',
            ]);

            return response()->json($match);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function update(Request $request, Matches $match){
        try{
            $request->validate([
            'league_id' => 'required',
            'team_a_id' => 'required',
            'team_b_id' => 'required',
            'scheduled_datetime' => 'required',
            'venue' => 'required',
            'status' => 'required',
            'referee_id' => 'required',
        ]);

        $match->league_id = $request->league_id; 
        $match->team_a_id = $request->team_a_id; 
        $match->team_b_id = $request->team_b_id; 
        $match->scheduled_datetime = $request->scheduled_datetime; 
        $match->venue = $request->venue; 
        $match->status = $request->status; 
        $match->referee_id = $request->referee_id; 
        $match->save();

        return response()->json([
                'message' => 'Matches updated successfully',
                'matches' => $match->fresh()
            ], 200);
        
        }catch(\Exceptions){
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Matches $match){
        try {
            $match->delete();
            return response()->json([
                'message' => 'Matches deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong: ' . $e->getMessage()
            ], 500);
        }
    }
}