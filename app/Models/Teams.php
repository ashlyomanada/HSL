<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\School;
use App\Models\Categories;


class Teams extends Model
{
    use HasFactory;

    protected $fillable = ['school_id', 'name', 'category_id'];

    public function school()
    {
        return $this->belongsTo(School::class, 'school_id');
    }

    public function category() {
        return $this->belongsTo(Categories::class, 'category_id');
    }
}