<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AffiliateResource extends JsonResource
{
    public static $wrap = false;
    
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'affiliate_index' => $this->affiliate_index,
            'affiliate_name' => $this->affiliate_name,
        ];
    }
}
