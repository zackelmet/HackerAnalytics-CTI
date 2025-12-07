import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check which env vars are available (without exposing values)
        const envCheck = {
            NEXT_PUBLIC_APP_URL: !!process.env.NEXT_PUBLIC_APP_URL,
            NEXT_PUBLIC_BASE_URL: !!process.env.NEXT_PUBLIC_BASE_URL,
            NEXT_PUBLIC_BASE_URL_VALUE: process.env.NEXT_PUBLIC_BASE_URL || 'not set',
        };

        return res.status(200).json({
            success: true,
            environment: process.env.NODE_ENV,
            netlifyContext: process.env.CONTEXT || 'unknown',
            envVarsPresent: envCheck,
            allEnvVarsSet: Object.entries(envCheck).filter(([k, v]) => !k.includes('LENGTH') && !k.includes('VALUE')).every(([k, v]) => v === true),
        });
    } catch (error: any) {
        return res.status(200).json({
            success: false,
            error: error.message,
            stack: error.stack,
        });
    }
}
