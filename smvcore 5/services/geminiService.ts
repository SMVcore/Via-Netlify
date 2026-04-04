import { GoogleGenAI } from "@google/genai";

// Helper to get the API key safely across different environments (Vite vs others)
const getApiKey = () => {
  // @ts-ignore - Vite specific
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
    // @ts-ignore
    return import.meta.env.VITE_API_KEY;
  }
  // Fallback for other environments
  return process.env.API_KEY || "";
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a quick structural analysis based on user input.
 * Represents the "Digital Assistent" product capability.
 */
export const getQuickAnalysis = async (challenge: string): Promise<string> => {
  if (!apiKey) {
    console.error("API Key mangler. Tjek din .env fil eller hosting indstillinger.");
    return "Systemfejl: Kunne ikke forbinde til AI-motoren (manglende konfiguration). Kontakt os direkte.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Brugerens udfordring: "${challenge}"`,
      config: {
        systemInstruction: `
          Du er en AI-rådgiver for SMVcore. Din tone er direkte, professionel og skandinavisk minimalistisk.
          Målgruppen er ejerledere (10-250 ansatte), der er flaskehalse.
          
          Din filosofi er: "Struktur før automatisering".
          
          Opgave:
          Giv et kort, konkret svar (max 3 sætninger) på, hvordan man løser brugerens udfordring ved at fjerne personafhængighed.
          Foreslå først en strukturel ændring (proces/beslutning), og nævn kort, hvordan en AI/Digital Assistent kunne støtte det bagefter.
          Undgå salgsgas. Vær konkret. Svar på dansk.
        `,
        temperature: 0.7,
      },
    });

    return response.text || "Kunne ikke generere et svar lige nu. Prøv igen senere.";
  } catch (error) {
    console.error("Fejl ved generering af analyse:", error);
    return "Vi oplever tekniske problemer med AI-forbindelsen. Kontakt os direkte for en snak.";
  }
};