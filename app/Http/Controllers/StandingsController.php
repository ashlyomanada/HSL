<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Standings;

class StandingsController extends Controller
{
   public function index()
    {
        $standing = Standings::with([
            'league',
            'league.category:id,category',
            'team.school',
        ])->orderBy('points', 'desc')->get();   

        return response()->json($standing, 200);
    }

    public function getStandingsCategory(Request $request)
    {
        $category = $request->category;
        $query = Standings::with([ 
            'league',
            'league.category:id,category',
            'team.school',])
            ->orderBy('points', 'desc');

        if ($category) {
            $query->whereHas('league', function ($q) use ($category) {
                $q->where('category_id', $category);
            });
        }
        $standings = $query->get();
        return response()->json($standings, 200);
    }

   public function store(Request $request)
    {
        try {
            $request->validate([
                'league_id' => 'required',
                'team_id' => 'required',
                'wins' => 'required',
                'losses' => 'required',
                'draws' => 'required',
                'points' => 'required',
            ]);

            $standing = Standings::where('team_id', $request->team_id)->first();

            if ($standing) {
                $standing->league_id =  $request->league_id;
                $standing->team_id =  $request->team_id;
                $standing->wins =  $request->wins;
                $standing->losses =  $request->losses;
                $standing->draws =  $request->draws;
                $standing->points =  $request->points;
                $standing->save();

                $message = 'Standings updated successfully';
            } else {
                $standing = Standings::create([
                    'league_id' => $request->league_id,
                    'team_id' => $request->team_id,
                    'wins' => $request->wins,
                    'losses' => $request->losses,
                    'draws' => $request->draws,
                    'points' => $request->points,
                ]);

                $message = 'Standings created successfully';
            }

            return response()->json([
                'message' => $message,
                'standings' => $standing->fresh()
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }


   public function show(Standings $standing)
   {
        return $standing;
   }

    public function showTeamStandings(Request $request)
    {
        $standing = Standings::where('team_id', $request->team_id)
                            ->where('league_id', $request->league_id)
                            ->first();

        return response()->json($standing);
    }

   public function update(Request $request, Standings $standing)
   {

        try{
            $request->validate([
            'league_id' => 'required',
            'team_id' => 'required',
            'wins' => 'required',
            'losses' => 'required',
            'draws' => 'required',
            'points' => 'required',
        ]);

            $teamId = Standings::where('team_id', $request->team_id)->first();

            $standing->league_id =  $request->league_id;
            $standing->team_id =  $request->team_id;
            $standing->wins =  $request->wins;
            $standing->losses =  $request->losses;
            $standing->draws =  $request->draws;
            $standing->points =  $request->points;
            $standing->save();

            return response()->json([
                'message' => 'Standings updated successfully',
                'standings' => $standing->fresh()
            ], 200);

        }catch(\Exception $e){
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
   }

   public function destroy(Standings $standing)
   {
        try{
            $standing->delete();
            return response()->json(['message' => 'Standings Deleted Successfully'], 200);
        }catch(\Exception $e){
            return response()->json(['error' => 'Something went wrong:'. $e->getMessage()], 500);
        }
   }
}