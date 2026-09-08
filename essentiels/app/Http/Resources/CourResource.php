<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "prof_id" => $this->prof_id,
            "instrument_id" => $this->instrument_id,
            "titre" => $this->titre,
            "description" => $this->description,
            "prix" => $this->prix,
            "image" => $this->image,
            "duree" => $this->duree
        ];
    }
}
