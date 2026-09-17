<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Messages;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = request()->user()->id;

        $messages = Messages::with(['sender', 'receiver'])
            ->where('sender_id', $userId)
            ->orWhere('receiver_id', $userId)
            ->latest()
            ->get();

        $conversations = $messages
            ->groupBy(fn (Messages $message) => $message->sender_id === $userId
                ? $message->receiver_id
                : $message->sender_id)
            ->map(function ($conversation) use ($userId) {
                $lastMessage = $conversation->first();
                $otherUser = $lastMessage->sender_id === $userId
                    ? $lastMessage->receiver
                    : $lastMessage->sender;

                return [
                    'id' => $lastMessage->id,
                    'otherUserId' => $otherUser->id,
                    'prof' => trim($otherUser->name . ' ' . $otherUser->firstname),
                    'instrument' => 'Accompagnement personnalisé',
                    'extrait' => $lastMessage->content,
                    'heure' => $lastMessage->created_at->toISOString(),
                    'lu' => $lastMessage->sender_id === $userId || $lastMessage->is_read,
                ];
            })
            ->values();

        return response()->json($conversations);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string',
        ]);

        $validate['sender_id'] = $request->user()->id;

        $message = Messages::create($validate);
        return response()->json($message, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Messages $messages)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Messages $messages)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Messages $messages)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Messages $messages)
    {
        //
    }
}
