<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MatchScores;

class ScoresController extends Controller
{
    public function index(){
         return MatchScores::with('matches')->get();
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'match_id' => 'required',
                'team_a_id' => 'required',
                'team_b_id' => 'required',
                'team_a_score' => 'required|numeric',
                'team_b_score' => 'required|numeric',
                'updated_by' => 'required',
            ]);

            $score = MatchScores::where('match_id', $request->match_id)->first();

            if ($score) {
                // Update existing
                $score->team_a_id = $request->team_a_id;
                $score->team_b_id = $request->team_b_id;
                $score->team_a_score = $request->team_a_score;
                $score->team_b_score = $request->team_b_score;
                $score->updated_by = $request->updated_by;
                $score->save();

                $message = 'Scores updated successfully';
            } else {
                $score = MatchScores::create([
                    'match_id' => $request->match_id,
                    'team_a_id' => $request->team_a_id,
                    'team_b_id' => $request->team_b_id,
                    'team_a_score' => $request->team_a_score,
                    'team_b_score' => $request->team_b_score,
                    'updated_by' => $request->updated_by,
                ]);

                $message = 'Scores created successfully';
            }

            return response()->json([
                'message' => $message,
                'scores' => $score->fresh(),
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }
    public function show(MatchScores $score){
        return $score;
    }

    public function update(Request $request, MatchScores $score){
        try{
             $request->validate([
                'match_id' => 'required',
                'team_a_id' => 'required',
                'team_b_id' => 'required',
                'team_a_score' => 'required',
                'team_b_score' => 'required',
                'updated_by' => 'required',
            ]);
            
            $score->match_id = $request->match_id;
            $score->team_a_id = $request->team_a_id;
            $score->team_b_id = $request->team_b_id;
            $score->team_a_score = $request->team_a_score;
            $score->team_b_score = $request->team_b_score;
            $score->updated_by = $request->updated_by;
            $score->save(); 
            
            return response()->json([
                'message' => 'Scores updated successfully',
                'scores' => $score->fresh()
            ], 200);

        }catch(\Exception $e){
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(MatchScores $score)
    {
        try {
            $score->delete();
            return response()->json([
                'message' => 'Scores deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Something went wrong: ' . $e->getMessage()
            ], 500);
        }
    }

}