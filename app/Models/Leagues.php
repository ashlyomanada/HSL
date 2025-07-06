<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Categories;

class Leagues extends Model
{
    use HasFactory;

    protected $fillable = ['name','season','category_id','start_date','end_date'];

    public function category() {
        return $this->belongsTo(Categories::class, 'category_id');
    }
}