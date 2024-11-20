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

    // Initialize Airtable with your base and table ID
    const base = new Airtable({
      apiKey: process.env.AIRTABLE_TOKEN,
      endpointUrl: 'https://api.airtable.com',
    }).base('appRaduTEE1BfE56V');
    
    const records = await base('tbldXHe9UDetH1wlm').create([
      {
        fields: {
          'Email': email  // Make sure this matches your column name exactly
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