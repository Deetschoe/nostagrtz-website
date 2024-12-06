// app/api/subscribe/route.js
import Airtable from 'airtable';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    // Initialize Airtable
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_TOKEN,
      endpointUrl: 'https://api.airtable.com',
    }).base('appRaduTEE1BfE56V');

    // Check for existing email
    const existingRecords = await base('tbldXHe9UDetH1wlm')
      .select({
        filterByFormula: `{Email} = '${email}'`
      })
      .firstPage();

    if (existingRecords.length > 0) {
      return NextResponse.json(
        { message: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Create new record if email doesn't exist
    const records = await base('tbldXHe9UDetH1wlm').create([
      {
        fields: {
          'Email': email
        }
      }
    ]);

    console.log('Created records:', records);
    
    return NextResponse.json(
      { message: 'Subscription successful', records },
      { status: 200 }
    );
  } catch (error) {
    console.error('Airtable error:', error);
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}