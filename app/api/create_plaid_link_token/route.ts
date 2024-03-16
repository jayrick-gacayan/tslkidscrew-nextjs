
import { auth } from "@/auth";
import { Parent } from "@/models/parent";
import { User } from "next-auth";
import { NextAuthRequest } from "next-auth/lib";
import { NextResponse } from "next/server";
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from 'plaid';



export const POST = auth(async (req: NextAuthRequest) => {
  // req.auth
  let parent = req.auth?.user;
  // console.log('sdafsdfsd', req.auth);

  const configuration = new Configuration({
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
    const request = {
      user: {
        client_user_id: '1'
      },
      client_name: 'TSL Adventures',
      products: [Products.Auth],
      language: 'en',
      country_codes: [CountryCode.Us],
    };

    const createTokenResponse = await client.linkTokenCreate(request);

    // console.log('createToken Resposne', createTokenResponse)
    return NextResponse.json(createTokenResponse.data, { status: 200 });
  } catch (err) {
    const errorMessage: string = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
})



