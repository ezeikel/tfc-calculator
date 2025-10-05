export const BLOG_CONTENT_PROMPT = `You are a professional content writer specializing in UK childcare, Tax-Free Childcare, and family finance.

Your task is to write a high-quality, engaging blog post with this metadata:
- Title: "{{TITLE}}"
- Summary: "{{SUMMARY}}"
- Keywords: {{KEYWORDS}}
- Category: {{CATEGORY}}

REQUIREMENTS:
- Write in a conversational, accessible tone that's informative but not dry
- Target UK families and working parents specifically (use UK terminology, government schemes, current rates)
- Include specific, actionable advice and practical steps
- Make it engaging with relatable examples and real-world scenarios
- Include relevant calculations and cost examples where appropriate
- Aim for 6-8 minutes reading time (approximately 1200-1600 words)
- Use markdown formatting for headings, lists, emphasis
- Include practical tips and "pro tips" where relevant
- Reference specific UK government schemes, rates, and procedures where applicable
- Use current 2024-2025 rates and figures where relevant

AVOID:
- Overly formal or academic language
- Generic advice that could apply to any country
- Repeating content from these existing posts: {{EXISTING_POSTS}}
- Being overly promotional about specific services
- Including disclaimers or legal warnings (keep it informative but confident)
- Outdated information or rates

STRUCTURE:
- Start with a compelling hook that relates to parents' real challenges
- Use clear headings and subheadings (H2, H3)
- Include bullet points and numbered lists for easy scanning
- Add practical examples with real numbers where appropriate
- Include step-by-step guides where relevant
- End with actionable next steps
- Include relevant calculators or tools references if applicable

FOCUS AREAS:
- Tax-Free Childcare: eligibility, application process, savings calculations
- Government childcare support: 15/30 hours free, Universal Credit childcare element
- Budgeting: realistic cost planning, comparison tools, saving strategies
- Working parent challenges: flexibility, emergency care, return-to-work planning
- Regional variations: London vs other areas, rural vs urban considerations
- Life stages: new babies, starting nursery, school-age wraparound care

Provide genuine value and insights that would help UK families make informed decisions about childcare and manage costs effectively.`;

export const IMAGE_DESCRIPTION_PROMPT = `Create a detailed illustration in a specific artistic style for a blog post about UK childcare and family finance.

ILLUSTRATION STYLE REQUIREMENTS:
- Follow the exact artistic style shown in these reference images: {{REFERENCE_IMAGES}}
- Modern, clean illustration style (not photo-realistic)
- Warm, approachable color palette
- Professional but friendly aesthetic
- Flat design or minimal shading approach
- Vector-style illustration

UK CONTEXT REQUIREMENTS:
- Clearly British setting (UK homes, parks, landmarks)
- Diverse British families and professionals
- Modern UK architecture or recognizable locations
- British cultural elements where appropriate

CONTENT REQUIREMENTS:
- Related to UK childcare, families, or financial planning themes
- Show people, settings, objects, or activities relevant to the topic
- Diverse and inclusive representation
- Contemporary UK family life

CRITICAL RESTRICTIONS:
- ABSOLUTELY NO TEXT, words, letters, numbers, signs, or readable content anywhere
- No documents, screens, calculators, phones showing text/numbers
- No street signs with readable text, no license plates with numbers
- No printed materials, books, or papers with visible text
- No logos, brand names, or written elements
- Focus purely on visual storytelling through illustration

AVOID:
- Photo-realistic imagery
- Overly complex or busy compositions
- Generic stock photo aesthetics
- Non-UK settings or cultural references

Topic: "{{TITLE}}"
Summary: "{{SUMMARY}}"
Category: {{CATEGORY}}

Create an illustration that captures the essence of this childcare topic in the specified artistic style, set in a clearly British context, with absolutely no text elements.`;