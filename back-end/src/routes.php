<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/**
 * Contact
 */

$app->get('/contact[/{id}]', function (Request $request, Response $response, array $args) 
{
    $service = $this->get('ContactService');

    $id = isset($args['id']) ? $args['id'] : null;

    return $service->get($id);
});

$app->post('/contact', function (Request $request, Response $response, array $args) 
{
    $service = $this->get('ContactService');

    $data = $request->getParsedBody();

    return $service->post($data);
});

$app->post('/contact/search', function (Request $request, Response $response, array $args)
{
    $service = $this->get('ContactService');
    $data = $request->getParsedBody();
    return $service->search($data);
});

$app->put('/contact/{id}', function (Request $request, Response $response, array $args) 
{
    $service = $this->get('ContactService');

    $data = $request->getParsedBody();

    return $service->put($args['id'], $data);
});

$app->delete('/contact', function (Request $request, Response $response, array $args) 
{
    $service = $this->get('ContactService');

    return $service->delete($args);
});

/**
 * User
 */
$app->post('/user', function (Request $request, Response $response, array $args) {
    $service = $this->get('UserService');
    $data = $request->getParsedBody();
    return $service->register($data);
});

$app->get('/user', function (Request $request, Response $response, array $args) {
    $service = $this->get('UserService');
    return $service->list();
});


/**
 * Default
 */

 $app->options('/{routes:.+}', function ($request, $response, $args)
{
    return $response;
});

$app->add(function ($req, $res, $next)
{
    $response = $next($req, $res);

    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Expose-Headers', 'Content-Disposition')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
});