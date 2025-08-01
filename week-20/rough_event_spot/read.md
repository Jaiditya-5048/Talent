# Admin User Setup Guide

This guide explains how to set up the admin user for Green Aisle.

## Step 1: Create Admin User in Supabase Auth

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Users**
3. Click **Add User**
4. Enter the following details:
   - **Email**: `admin@greenaisle.com`
   - **Password**: Choose a secure password
   - **Email Confirm**: Check this box to auto-confirm the email
5. Click **Create User**
6. Copy the **User ID** (UUID) from the created user

## Step 2: Update Database Schema

Run the migration to add admin user type support:

```sql
-- This should already be done if you ran the migration
-- But if not, run this in your Supabase SQL editor:

-- Drop the existing constraint
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_user_type_check;

-- Add the new constraint with admin included
ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_type_check 
CHECK (user_type IN ('couple', 'vendor', 'admin'));
```

## Step 3: Create Admin Profile

Replace `YOUR_ADMIN_USER_UUID_HERE` with the actual UUID from Step 1:

```sql
-- Run this in your Supabase SQL editor
INSERT INTO public.profiles (id, full_name, user_type, created_at, updated_at)
VALUES (
  'YOUR_ADMIN_USER_UUID_HERE', 
  'Green Aisle Admin', 
  'admin', 
  NOW(), 
  NOW()
) ON CONFLICT (id) DO UPDATE SET 
  user_type = 'admin',
  updated_at = NOW();
```

## Step 4: Add Admin Policies (Optional)

If you want to add specific RLS policies for admin users, run this:

```sql
-- Admin policies for enhanced access
CREATE POLICY "Admin users can view all profiles"
    ON public.profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

CREATE POLICY "Admin users can update all profiles"
    ON public.profiles FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND user_type = 'admin'
        )
    );

-- Add similar policies for other tables as needed
```

## Step 5: Test Admin Access

1. Go to your application login page
2. Login with `admin@greenaisle.com` and the password you set
3. You should be automatically redirected to `/admin/payment-testing`
4. Verify that you can see the admin dashboard and manage payments

## Step 6: Add More Admin Users (Optional)

To add more admin users:

1. Add their email addresses to the `ADMIN_EMAILS` array in `lib/auth/admin.ts`:

```typescript
const ADMIN_EMAILS = [
  'admin@greenaisle.com',
  'admin2@greenaisle.com', // Add more admin emails here
  'support@greenaisle.com',
];
```

2. Create their user accounts in Supabase Auth (Step 1)
3. Create their profiles with `user_type = 'admin'` (Step 3)

## Security Notes

1. **Admin Email Validation**: The system checks both the email address AND the user_type in the database
2. **Automatic Profile Creation**: If an admin email logs in but doesn't have an admin profile, the middleware will create one automatically
3. **API Protection**: All admin API routes require admin authentication
4. **Route Protection**: Admin routes are protected by middleware

## Troubleshooting

### Admin User Not Redirecting
- Check that the email is in the `ADMIN_EMAILS` array
- Verify the user profile has `user_type = 'admin'`
- Check browser console for any errors

### Admin API Routes Returning 403
- Ensure the user is logged in
- Verify admin authentication is working
- Check that the profile exists with correct user_type

### Database Errors
- Make sure the migration was run successfully
- Verify the user UUID is correct
- Check that RLS policies allow the operations

## Environment Variables

Make sure these environment variables are set:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Admin Features

Once set up, admin users have access to:

1. **Payment Dashboard** (`/admin/payment-testing`)
   - View all tent bookings and product purchases
   - Release payments to vendors/sellers
   - Refund payments to customers
   - Real-time transaction management

2. **Enhanced Permissions**
   - View all user profiles
   - Access all booking data
   - Manage all transactions
   - Override normal user restrictions

3. **Admin Navigation**
   - Special admin navbar with admin badge
   - Quick access to admin functions
   - Secure logout functionality
 