<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
