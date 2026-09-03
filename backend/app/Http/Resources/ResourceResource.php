<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResourceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "titre" => $this->titre,
            "type" => $this->type,
            "fichier" => $this->file,
            "lesson_id" => $this->lesson_id
        ];
    }
}
