<?php

namespace Api\Models;

final class ContactPhone extends BaseModel
{
    protected $primaryKey = 'contactPhoneId';
    protected $table = 'contact_phone';

    protected $fillable = [
        'contactId',
        'phone'
    ];

    public $timestamps = false;
}
