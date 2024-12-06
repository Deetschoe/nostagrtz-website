
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

    try {
      // Simple duplicate check
      const records = await base('tbldXHe9UDetH1wlm').select({
        maxRecords: 1,
        filterByFormula: `Email = '${email}'`
      }).firstPage();
      
      if (records.length > 0) {
        return NextResponse.json(
          { message: 'Email already subscribed' },
          { status: 400 }
        );
      }
    } catch (e) {
      // If check fails, continue with create
      console.error('Duplicate check failed:', e);
    }

    const newRecord = await base('tbldXHe9UDetH1wlm').create([
      {
        fields: {
          'Email': email
        }
      }
    ]);

    return NextResponse.json(
      { message: 'Subscription successful', newRecord },
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