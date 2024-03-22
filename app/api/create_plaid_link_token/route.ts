import { auth } from '@/auth';
import { NextAuthRequest } from 'next-auth/lib';
import { NextResponse } from 'next/server';
import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products
} from 'plaid';

export const POST = auth(async (req: NextAuthRequest) => {

  if (!!req.auth) {
    let parent = req.auth?.user;

    const configuration: Configuration = new Configuration({
      basePath: PlaidEnvironments.sandbox,
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.NEXT_PLAID_CLIENT_ID!,
          'PLAID-SECRET': process.env.NEXT_PLAID_SECRET_KEY!,
        },
      },
    });

    const client = new PlaidApi(configuration);

    try {
      const createTokenResponse = await client.linkTokenCreate({
        user: {
          client_user_id: parent?.customer_id?.toString() ?? '1',
        },
        client_name: 'TSL Adventures',
        products: [Products.Auth],
        language: 'en',
        country_codes: [CountryCode.Us],
      });

      return NextResponse.json(createTokenResponse.data, { status: 200 });
    } catch (err) {
      const errorMessage: string = err instanceof Error ? err.message : 'Internal server error';
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
  }

  return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });

});
