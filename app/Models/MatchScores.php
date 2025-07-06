<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Matches;

class MatchScores extends Model
{
    use HasFactory;

    protected $fillable = ['match_id','team_a_id','team_b_id','team_a_score','team_b_score','updated_by',];

     public function matches()
    {
        return $this->belongsTo(Matches::class, 'match_id');
    }
}