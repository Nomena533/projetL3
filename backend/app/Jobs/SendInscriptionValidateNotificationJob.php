<?php

namespace App\Jobs;

use App\Models\Inscription;
use App\Models\User;
use App\Notifications\InscriptionValidateNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Notification;

class SendInscriptionValidateNotificationJob implements ShouldQueue
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
        $eleve = User::where('id', $this->inscription->user_id)->get();
        Notification::send($eleve, new InscriptionValidateNotification($this->inscription));
    }
}
