<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

#[Signature('portfolio:create-owner')]
#[Description('Interactively create or promote the private portfolio owner account')]
class CreatePortfolioOwner extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $name = (string) $this->ask('Owner name', 'Rumel B. Eumague Jr.');
        $email = (string) $this->ask('Owner email');
        $password = (string) $this->secret('Owner password');

        $validator = Validator::make(compact('name', 'email', 'password'), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'password' => ['required', Password::defaults()],
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

            return self::FAILURE;
        }

        $owner = User::query()->firstOrNew(['email' => $email]);
        $owner->forceFill([
            'name' => $name,
            'password' => Hash::make($password),
            'email_verified_at' => now(),
            'is_owner' => true,
        ])->save();

        $this->info('Portfolio owner account is ready.');

        return self::SUCCESS;
    }
}
