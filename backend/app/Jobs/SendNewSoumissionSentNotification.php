<?php

namespace App\Jobs;

use App\Models\Soumission;
use App\Models\User;
use App\Notifications\NewSoumissionSentNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Notification;

class SendNewSoumissionSentNotification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Soumission $soumission)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $prof = User::where("id", $this->soumission->exercice->lesson->cour->prof_id)->get();
        Notification::send($prof, new NewSoumissionSentNotification($this->soumission));
    }
}
