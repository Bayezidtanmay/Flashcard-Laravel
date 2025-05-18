<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Word;
use Illuminate\Http\Request;

class WordController extends Controller
{
    public function index()
    {
        return Word::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'finnish' => 'required|string|max:255',
            'english' => 'required|string|max:255',
            'example' => 'nullable|string',
        ]);

        $word = Word::create($validated);
        return response()->json($word, 201);
    }

    public function show($id)
    {
        return Word::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $word = Word::findOrFail($id);

        $validated = $request->validate([
            'finnish' => 'sometimes|string|max:255',
            'english' => 'sometimes|string|max:255',
            'example' => 'nullable|string',
        ]);

        $word->update($validated);
        return response()->json($word);
    }

    public function destroy($id)
    {
        $word = Word::findOrFail($id);
        $word->delete();

        return response()->json(null, 204);
    }
}
