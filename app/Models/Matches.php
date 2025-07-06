<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Leagues;
use App\Models\Teams;
use App\Models\School;
use App\Models\MatchScores;

class Matches extends Model
{
    use HasFactory;

    protected $fillable = ['league_id','team_a_id','team_b_id','scheduled_datetime','venue','status','referee_id',];

      public function league()
    {
        return $this->belongsTo(Leagues::class, 'league_id');
    }

    public function teamA()
    {
        return $this->belongsTo(Teams::class, 'team_a_id');
    }

    public function teamB()
    {
        return $this->belongsTo(Teams::class, 'team_b_id');
    }

     public function score()
    {
        return $this->hasOne(MatchScores::class, 'match_id');
    }

}