<?php

namespace App\Jobs;

use App\Models\Inscription;
use App\Models\User;
use App\Notifications\NewInscriptionEleveNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Notification;

class SendNewInscritpionEleveNotificationJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Inscription $inscription)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $admin = User::where("role_id", "1")->get();
        Notification::send($admin,new NewInscriptionEleveNotification($this->inscription));
    }
}
