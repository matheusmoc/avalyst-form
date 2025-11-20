<?php

namespace Api\Validators;

use Respect\Validation\Validator as v;

final class ContactValidator extends SelfValidation
{
    public function validate($data)
    {
        $rules = [
            'name' => v::notEmpty()->length(0,100)->setName('Nome'),
            'email' => v::email()->notEmpty()->length(0,100)->setName('E-mail'),
            'phones' => v::optional(
                v::arrayType()->each(
                    v::stringType()->length(0,30)
                )
            )->setName('Telefones')
        ];

        return $this->validateData($data, $rules);
    }
}
