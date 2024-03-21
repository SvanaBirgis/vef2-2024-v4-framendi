'use server'

import { revalidatePath } from "next/cache";

export async function getPostBodyByFormData(formData) {
    if (!formData) {
        return null;
    }
    if (!formData.get('home') || !formData.get('away') || !formData.get('homeScore') || !formData.get('awayScore') || !formData.get('date')) {
        console.log(formData);
        console.error("Missing required fields");
        return null;
    }
    
    const postBody = {
        home: formData.get('home'),
        away: formData.get('away'),
        home_score: parseInt(formData.get('homeScore')),
        away_score: parseInt(formData.get('awayScore')),
        date: new Date(formData.get('date')).toISOString(),
    }

    return postBody;
}