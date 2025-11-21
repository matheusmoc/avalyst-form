<?php

namespace Api\Services;

use Api\Models\User;

class UserService extends BaseService
{
    public function register($data)
    {
        if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
            return $this->error('Name, email and password are required', 400);
        }

        $existingUser = User::where('email', $data['email'])->first();
        if ($existingUser) {
            return $this->error('Email already registered', 409);
        }

        $user = User::create([
            'name' => trim($data['name']),
            'email' => trim($data['email']),
            'password' => password_hash($data['password'], PASSWORD_DEFAULT)
        ]);

        return $this->ok($user->toArray());
    }

    public function list()
    {
        return $this->ok(User::all()->toArray());
    }
}
