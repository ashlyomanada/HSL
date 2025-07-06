<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Leagues;
use App\Models\Teams;
use App\Models\School;

class Standings extends Model
{
    use HasFactory;

    protected $fillable = ['league_id','team_id','wins','losses','draws','points'];

    public function league(){
        return $this->belongsTo(Leagues::class, 'league_id');
    }

    public function team(){
        return $this->belongsTo(Teams::class, 'team_id');
    }

}