<?php

namespace App\Policies;

use App\Models\ReceiptItem;
use App\Models\User;

class ReceiptItemPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasPermissionTo('view-receipt_items');
    }

    /**
     * Determine whether el usuario puede ver un elemento específico del recibo.
     */
    public function view(User $user, ReceiptItem $receiptItem): bool
    {
        return $user->hasPermissionTo('view-receipt_items');
    }

    /**
     * Determine whether el usuario puede crear elementos de recibos.
     */
    public function create(User $user): bool
    {
        return $user->hasPermissionTo('create-receipt_items');
    }

    /**
     * Determine whether el usuario puede actualizar un elemento de recibo.
     */
    public function update(User $user, ReceiptItem $receiptItem): bool
    {
        return $user->hasPermissionTo('edit-receipt_items');
    }

    /**
     * Determine whether el usuario puede eliminar un elemento de recibo.
     */
    public function delete(User $user, ReceiptItem $receiptItem): bool
    {
        return $user->hasPermissionTo('delete-receipt_items');
    }

    /**
     * Determine whether el usuario puede restaurar un elemento de recibo.
     */
    public function restore(User $user, ReceiptItem $receiptItem): bool
    {
        //
    }

    /**
     * Determine whether el usuario puede eliminar permanentemente un elemento de recibo.
     */
    public function forceDelete(User $user, ReceiptItem $receiptItem): bool
    {
        //
    }
}
