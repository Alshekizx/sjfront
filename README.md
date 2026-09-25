# Student website

Run `npm run dev` for development. Validate changes with `npm run typecheck`,
`npm test`, and `npm run build`.

## Supabase setup

Both websites must use the same Supabase project. Configure `VITE_SUPABASE_URL`
and `VITE_SUPABASE_ANON_KEY` in `.env.local`; never put a service-role key in a
browser environment variable.

For a new database, apply `../adminWebsite/supabase/schema.sql`, followed by
`../adminWebsite/supabase/migrations/202609250001_shared_content.sql` in the
Supabase SQL Editor. For an existing database with the base schema, apply only
the migration. It adds the duration and objectives columns and the published
catalog count functions required by this website.

From the workspace root, run `node scripts/check-public-supabase.mjs` to verify
the public queries. RPC errors `PGRST202` and a missing `duration_months` column
indicate that the migration has not been applied, or its changes are not yet
visible in the API schema cache.

## Password recovery

In Supabase Authentication URL Configuration, allow the website's
`/reset-password` URL for each deployed or local origin. The forgot-password
form sends a real reset email; the callback page lets the user set a new
password after Supabase establishes a session. See
[Supabase password recovery](https://supabase.com/docs/reference/javascript/auth-resetpasswordforemail).

## Payment limitation

Checkout currently has no payment initialization endpoint to call. Its payment
button reports that checkout is unavailable; it cannot charge a customer or
create a subscription. The existing webhook alone does not implement checkout.
