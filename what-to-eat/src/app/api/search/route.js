
import { NextResponse } from "next/server";


// Get Data that front-end sent.

export async function POST (request) {
    const user_info = await request.json();

    const body = {
        "includedTypes": ["restaurant"],
        "maxResultCount": 10,
        "locationRestriction": {
            "circle": {
                "center" : {
                    "latitude": user_info.latitude,
                    "longitude": user_info.longitude,
                },
                "radius": user_info.radius,
            }
        }
    };

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': process.env.NEXT_PUBLIC_MAPS,
            'X-Goog-FieldMask': 'places.displayName,places.location,places.rating,places.priceLevel'
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();

    return NextResponse.json(data);
}