import {SupabaseClient} from "@supabase/supabase-js";

export async function getUser(client: SupabaseClient) {

    return (await client.auth.getSession()).data?.session?.user ?? null;

}

