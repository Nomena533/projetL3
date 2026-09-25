<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        // $notification = $request->user()->notifications()->latest()->get();
        $unread = $request->user()->unreadNotifications()->get();
        $unreadCount = $request->user()->unreadNotifications()->count();
        
        return response()->json([
            // "notification" => $notification,
            "unread" => $unread,
            "unreadCount" => $unreadCount
        ]);
    }

    public function markAsRead(Request $request, $id)
    {
        $user = $request->user();

        $notification = $user->unreadNotifications()->find($id);
        if ($notification) {
            $notification->markAsRead();
        }

        $unreadCount = $user->unreadNotifications()->count();

        return response()->json([
            'message' => 'Notification marqué comme lu',
            'unreadCount' => $unreadCount,
            "notification" => $notification
        ], 201);
    }

    public function markAll(Request $request)
    {
        $user = $request->user();

        $notification = $user->unreadNotifications->each->markAsRead();

        return response()->json([
            'message' => 'Notification marqué comme lu',
            "notification" => $notification
        ], 201);
    }
}
