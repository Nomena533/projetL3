<?php

namespace App\Jobs;

use App\Models\Paiement;
use App\Models\User;
use App\Notifications\NewPaiementNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Notification;

class SendPaiementNotificationJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Paiement $paiement)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $admin = User::where("role_id", "1")->get();
        Notification::send($admin, new NewPaiementNotification($this->paiement));
    }
}
