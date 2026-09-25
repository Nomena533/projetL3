<?php

namespace App\Listeners;

use App\Events\SoumissionCreatedEvent;
use App\Jobs\SendNewSoumissionSentNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SoumissionCreatedListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SoumissionCreatedEvent $event): void
    {
        SendNewSoumissionSentNotification::dispatch($event->soumission);
    }
}
