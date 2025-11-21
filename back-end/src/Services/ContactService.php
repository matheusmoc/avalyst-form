<?php

namespace Api\Services;

use Api\Validators\ContactValidator;
use Api\Models\{Contact, ContactPhone};

class ContactService extends BaseService
{
    public function search($data)
    {
        $term = trim($data['query'] ?? '');

        return $this->ok(
            Contact::with('phones')
                ->when($term !== '', function ($query) use ($term) {
                    $query->where('name', 'LIKE', "%{$term}%")
                        ->orWhere('email', 'LIKE', "%{$term}%");
                })
                ->get()
                ->toArray()
        );
    }

    public function get($id = null)
    {
        if ($id) {
            $contact = Contact::with('phones')->find($id);

            if (!$contact) {
                return $this->error('Not found', 404);
            }

            return $this->ok($contact->toArray());
        }

        return $this->ok(
            Contact::with('phones')
                ->get()
                ->toArray()
        );
    }

    public function post($data)
    {
        $validator = new ContactValidator();
        if (!$validator->validate($data)) {
            return $this->error($validator->errors, 422);
        }

        $contact = Contact::create([
            'name'  => trim($data['name']),
            'email' => trim($data['email']),
        ]);

        $phones = collect($data['phones'] ?? [])->filter();

        foreach ($phones as $phone) {
            ContactPhone::create([
                'contactId' => $contact->contactId,
                'phone'     => $phone
            ]);
        }

        return $this->ok($contact->load('phones')->toArray());
    }

    public function put($id, $data)
    {
        $validator = new ContactValidator();
        if (!$validator->validate($data)) {
            return $this->error($validator->errors, 422);
        }

        $contact = Contact::find($id);
        if (!$contact) {
            return $this->error('Not found', 404);
        }

        $contact->update([
            'name'  => trim($data['name']),
            'email' => trim($data['email']),
        ]);

        ContactPhone::where('contactId', $id)->delete();

        $phones = collect($data['phones'] ?? [])->filter();

        foreach ($phones as $phone) {
            ContactPhone::create([
                'contactId' => $id,
                'phone'     => $phone
            ]);
        }

        return $this->ok($contact->load('phones')->toArray());
    }
}
