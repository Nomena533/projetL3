<?php

namespace App\Listeners;

use App\Events\InscriptionEleveCreatedEvent;
use App\Jobs\SendNewInscritpionEleveNotificationJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class InscritpionEleveCreatedListener
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
    public function handle(InscriptionEleveCreatedEvent $event): void
    {
        SendNewInscritpionEleveNotificationJob::dispatch($event->inscription);
    }
}
