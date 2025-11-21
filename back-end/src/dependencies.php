<?php

$container = $app->getContainer();

$capsule = new Illuminate\Database\Capsule\Manager;
$capsule->addConnection($container['settings']['db']);

$capsule->bootEloquent();
$capsule->setAsGlobal();

$container["ContactService"] = function ($c)
{
    return new \Api\Services\ContactService($c);
};

$container["UserService"] = function ($c)
{
    return new \Api\Services\UserService($c);
};