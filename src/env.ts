import productionEnv from './env.production.json'

interface Env { EXPO_PUBLIC_BACKEND_URL:string }

const env: Env = process.env.EXPO_PUBLIC_BACKEND_URL
  ? process.env as unknown as Env
  : productionEnv

export const { EXPO_PUBLIC_BACKEND_URL:BACKEND_URL } = env