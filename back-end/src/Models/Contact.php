<?php

namespace Api\Models;

final class Contact extends BaseModel
{
    protected $primaryKey = 'contactId';
    protected $table = 'contact';

    protected $fillable = [
        'name', 
        'email',
        'phones'
    ];

    protected $casts = [
        'phones' => 'array'
    ];

    public function phones()
    {
        return $this->hasMany(ContactPhone::class, 'contactId', 'contactId');
    }
}
