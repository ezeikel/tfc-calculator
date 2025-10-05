export * from './blog';
export * from './prompts';

// OpenAI Model Configurations
export const OPENAI_MODEL_GPT_4O = 'gpt-4o';
export const OPENAI_MODEL_GPT_IMAGE = 'dall-e-3';

export const OPENAI_MODEL_GPT_IMAGE_OPTIONS = {
  model: OPENAI_MODEL_GPT_IMAGE,
  size: '1024x1024' as const,
  quality: 'hd' as const,
  style: 'natural' as const,
};
