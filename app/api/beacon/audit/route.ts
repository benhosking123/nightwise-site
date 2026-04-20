import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are a venue visibility auditor for London nightlife and hospitality venues. Analyse the venue data provided and score it honestly across 6 pillars. Do not inflate scores. Base scores only on evidence in the data provided.

Return ONLY valid JSON, no markdown, no code fences:
{
  "overallScore": number,
  "pillars": {
    "googlePresence": { "score": number, "assessment": string, "recommendation": string },
    "socialDiscovery": { "score": number, "assessment": string, "recommendation": string },
    "reviewReputation": { "score": number, "assessment": string, "recommendation": string },
    "searchVisibility": { "score": number, "assessment": string, "recommendation": string },
    "websiteSignals": { "score": number, "assessment": string, "recommendation": string },
    "aiRecommendations": { "score": number, "assessment": string, "recommendation": string }
  },
  "competitors": [
    { "name": string, "score": number, "reason": string },
    { "name": string, "score": number, "reason": string },
    { "name": string, "score": number, "reason": string }
  ],
  "current_ai_description": string,
  "better_description": string,
  "topRecommendations": [string, string, string]
}

Scoring guide:
- googlePresence: rating, review count, photo count, hours completeness, business status
- socialDiscovery: website social links, Instagram/TikTok signals visible in data
- reviewReputation: average rating, volume, recency, sentiment
- searchVisibility: listing completeness, categories accuracy
- websiteSignals: has website, phone number, price level
- aiRecommendations: based on overall online presence, would this venue appear in AI recommendations for its category
- competitors: 3 real rival venues same type same area, estimated visibility score, one sentence why
- current_ai_description: 2-3 sentences how AI likely describes this venue now based on its online presence
- better_description: optimised 3-4 sentence AI-ready description, occasion-rich, attribute-complete
overallScore = average of all 6 pillar scores, rounded.`;

export async function POST(request: Request) {
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!mapsKey) {
    console.error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set');
    return Response.json({ error: 'Audit failed. Please try again.' }, { status: 500 });
  }
  if (!anthropicKey) {
    console.error('ANTHROPIC_API_KEY is not set');
    return Response.json({ error: 'Audit failed. Please try again.' }, { status: 500 });
  }

  let body: { placeId?: string; venueName?: string; address?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Audit failed. Please try again.' }, { status: 400 });
  }

  const { placeId, venueName, address } = body;
  if (!placeId || !venueName) {
    return Response.json({ error: 'Audit failed. Please try again.' }, { status: 400 });
  }

  try {
    const fields = [
      'name', 'formatted_address', 'rating', 'user_ratings_total', 'website',
      'opening_hours', 'photos', 'reviews', 'types', 'formatted_phone_number',
      'business_status', 'price_level',
    ].join(',');

    const placesUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${encodeURIComponent(fields)}&key=${mapsKey}`;
    const placesRes = await fetch(placesUrl);
    if (!placesRes.ok) {
      throw new Error(`Google Places API error: ${placesRes.status}`);
    }
    const placesData = await placesRes.json();

    if (placesData.status !== 'OK') {
      throw new Error(`Google Places API returned status: ${placesData.status}`);
    }

    const placeResult = placesData.result;
    const venueDataForClaude = {
      name: placeResult.name,
      address: placeResult.formatted_address,
      rating: placeResult.rating,
      user_ratings_total: placeResult.user_ratings_total,
      website: placeResult.website || null,
      phone: placeResult.formatted_phone_number || null,
      business_status: placeResult.business_status,
      price_level: placeResult.price_level,
      types: placeResult.types,
      opening_hours: placeResult.opening_hours
        ? {
            open_now: placeResult.opening_hours.open_now,
            periods_count: placeResult.opening_hours.periods?.length ?? 0,
            weekday_text: placeResult.opening_hours.weekday_text,
          }
        : null,
      photo_count: placeResult.photos?.length ?? 0,
      reviews: placeResult.reviews?.slice(0, 5).map((r: any) => ({
        rating: r.rating,
        text: r.text?.slice(0, 300),
        time: r.relative_time_description,
      })) ?? [],
    };

    const client = new Anthropic({ apiKey: anthropicKey });
    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Audit this venue:\n\n${JSON.stringify(venueDataForClaude, null, 2)}`,
        },
      ],
    });

    const rawText = message.content[0].type === 'text' ? message.content[0].text : '';
    const cleaned = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
    let auditResult: any;
    try {
      auditResult = JSON.parse(cleaned);
    } catch {
      console.error('Claude raw response:', cleaned.slice(0, 500));
      throw new Error('Claude returned invalid JSON');
    }

    const overallScore: number = auditResult.overallScore ?? 0;
    let confidence: { level: string; note: string };
    if (overallScore >= 70) {
      confidence = { level: 'High', note: 'Scored from live Google Places data with strong signals.' };
    } else if (overallScore >= 40) {
      confidence = { level: 'Medium', note: 'Scored from live Google Places data.' };
    } else {
      confidence = { level: 'Low', note: 'Limited data available from Google Places.' };
    }

    return Response.json({ ...auditResult, confidence });
  } catch (err: any) {
    console.error('Audit error:', err?.message ?? err);
    return Response.json({ error: 'Audit failed. Please try again.' }, { status: 500 });
  }
}
