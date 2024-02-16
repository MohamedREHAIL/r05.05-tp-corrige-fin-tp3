import { NextApiRequest, NextApiResponse } from 'next'
import {generateStaticParams} from "../../[categorySlug]/[productSlug]/page";
import {revalidatePath} from "next/cache";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const supabaseWebhookKey = process.env.SUPABASE_WEBHOOK_KEY;
    const apiKey = req.headers['api-key'];

    if (!apiKey) {
        return res.status(401).json({error: '"API-Key" header is missing'});
    }

    if (apiKey !== supabaseWebhookKey) {
        return res.status(403).json({error: 'API Key is not valid'});
    }
    console.log("rebuilding posts...");

    const products = await generateStaticParams();

    for (const product of products) {
        revalidatePath(`/${product.categorySlug}/${product.productSlug}`);
    }
    console.log(req.headers);
    return res.status(200).json({
        revalidated: true,
        date: new Date().toISOString(),
    });
}
