<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notification = $request->user()->notifications()->latest()->get();
        $nonLues = $request->user()->unreadNotifications()->get();
        $nonLuesCount = $request->user()->unreadNotifications()->count();
        
        return response()->json([
            "notification" => $notification,
            "nonLues" => $nonLues,
            "nonLuesCount" => $nonLuesCount
        ]);
    }
}
