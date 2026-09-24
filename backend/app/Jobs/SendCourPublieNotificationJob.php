<?php

namespace App\Jobs;

use App\Models\Cour;
use App\Models\Inscription;
use App\Models\User;
use App\Notifications\CourPublieNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Notification;

class SendCourPublieNotificationJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Cour $cour)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $eleve = User::join("inscriptions", "inscriptions.user_id", "=", "users.id")
            ->where("users.role_id", 2)
            ->where("inscriptions.niveau_id",$this->cour->niveau_id)
            ->select("users.*")
            ->get();
        Notification::send($eleve,new CourPublieNotification($this->cour));
    }
}
