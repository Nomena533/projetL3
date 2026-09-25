<?php

namespace App\Listeners;

use App\Events\InscriptionValidateEvent;
use App\Jobs\SendInscriptionValidateNotificationJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class InscriptionValidateListener
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
    public function handle(InscriptionValidateEvent $event): void
    {
        SendInscriptionValidateNotificationJob::dispatch($event->inscription);
    }
}
