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
                    'otherUser' => trim($otherUser->name . ' ' . $otherUser->firstname),
                    'prof' => trim($otherUser->name . ' ' . $otherUser->firstname),
                    'instrument' => 'Accompagnement personnalisé',
                    'extrait' => $lastMessage->content,
                    'heure' => $lastMessage->created_at->toISOString(),
                    'lu' => $lastMessage->sender_id === $userId || $lastMessage->is_read,
                    // Le compteur ne concerne que les messages reçus et encore non lus.
                    'unreadCount' => $conversation
                        ->where('receiver_id', $userId)
                        ->where('is_read', false)
                        ->count(),
                    'messages' => $conversation->sortBy('created_at')->values()->map(fn (Messages $message) => [
                        'id' => $message->id,
                        'sender_id' => $message->sender_id,
                        'receiver_id' => $message->receiver_id,
                        'content' => $message->content,
                        'heure' => $message->created_at->toISOString(),
                    ]),
                ];
            })
            ->values();

        return response()->json($conversations);
    }

    /**
     * Marquer comme lus les messages reçus dans une conversation.
     */
    public function markAsRead(int $otherUserId)
    {
        $userId = request()->user()->id;

        // Seuls les messages destinés à l'utilisateur connecté peuvent changer d'état.
        Messages::where('sender_id', $otherUserId)
            ->where('receiver_id', $userId)
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return response()->json(['success' => true]);
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
