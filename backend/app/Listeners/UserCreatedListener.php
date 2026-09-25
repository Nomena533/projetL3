<?php

namespace App\Listeners;

use App\Events\UserCreatedEvent;
use App\Jobs\SendNewUserNotificationJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UserCreatedListener
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
    public function handle(UserCreatedEvent $event): void
    {
        SendNewUserNotificationJob::dispatch($event->user);
    }
}
