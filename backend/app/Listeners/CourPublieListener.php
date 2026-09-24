<?php

namespace App\Listeners;

use App\Events\CourPublieEvent;
use App\Jobs\SendCourPublieNotificationJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CourPublieListener
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
    public function handle(CourPublieEvent $event): void
    {
        SendCourPublieNotificationJob::dispatch($event->cour);
    }
}
