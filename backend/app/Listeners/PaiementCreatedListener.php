<?php

namespace App\Listeners;

use App\Events\PaiementCreatedEvent;
use App\Jobs\SendNewPaiementNotificationJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PaiementCreatedListener
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
    public function handle(PaiementCreatedEvent $event): void
    {
        SendNewPaiementNotificationJob::dispatch($event->paiement);
    }
}
