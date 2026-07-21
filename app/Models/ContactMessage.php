<?php

namespace App\Models;

use Database\Factories\ContactMessageFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['name', 'email', 'subject', 'message', 'status', 'read_at', 'replied_at', 'ip_hash'])]
class ContactMessage extends Model
{
    public const STATUS_UNREAD = 'unread';

    public const STATUS_READ = 'read';

    public const STATUS_ARCHIVED = 'archived';

    public const STATUS_REPLIED = 'replied';

    /** @use HasFactory<ContactMessageFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $attributes = ['status' => self::STATUS_UNREAD];

    protected function casts(): array
    {
        return ['read_at' => 'datetime', 'replied_at' => 'datetime'];
    }
}
