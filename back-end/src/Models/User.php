<?php

namespace Api\Models;

final class User extends BaseModel
{
    protected $primaryKey = 'userId';
    protected $table = 'user';

    protected $fillable = [
        'name', 
        'email',
        'password'
    ];

    protected $hidden = [
        'password'
    ];
}
