<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\School;
use Illuminate\Support\Facades\Storage;

class SchoolController extends Controller
{
    public function index()
    {
        return School::all();
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'address' => 'required',
                'logo_url' => 'required|image|mimes:jpg,jpeg,png,gif,svg|max:2048',
            ]);

            $path = $request->file('logo_url')->store('logos', 'public');

            $school = School::create([
                'name' => $request->name,
                'address' => $request->address,
                'logo_url' => $path,
            ]);

            $school->logo_url = asset('storage/' . $path);

            return response()->json($school, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong: ' . $e->getMessage()], 500);
        }
    }


    public function show(School $school)
    {
        return $school;
    }

    public function update(Request $request, School $school)
    {
        try {
            $request->validate([
                'name' => 'required',
                'address' => 'required',
                'logo_url' => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:2048',
            ]);

            \Log::info('Request data:', $request->all());

            $school->name = $request->name;
            $school->address = $request->address;

            if ($request->hasFile('logo_url')) {
                if ($school->logo_url && Storage::disk('public')->exists($school->logo_url)) {
                    Storage::disk('public')->delete($school->logo_url);
                }

                $path = $request->file('logo_url')->store('logos', 'public');
                $school->logo_url = $path;
            }

            $school->save();

            return response()->json($school, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function destroy(School $school)
    {
        if ($school->logo_url && Storage::disk('public')->exists($school->logo_url)) {
            Storage::disk('public')->delete($school->logo_url);
        }

        $school->delete();

        return response()->json(['message' => 'School deleted successfully'], 200);
    }
}