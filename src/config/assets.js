// Vercel Storage Asset URLs
// Replace these URLs with your actual Vercel Blob Storage URLs

const VERCEL_STORAGE_BASE_URL = 'https://8fnxbvmrii6srs9b.public.blob.vercel-storage.com';

export const ASSETS = {
  // Images
  LOGO_MAIN: `${VERCEL_STORAGE_BASE_URL}/20250301_193715.png`,
  LOGO_ML: `${VERCEL_STORAGE_BASE_URL}/ML.png`,
  SONY_HEADPHONE: `${VERCEL_STORAGE_BASE_URL}/Sony_Headphone_ShowWeb.png`,
  FRAME: `${VERCEL_STORAGE_BASE_URL}/Frame.png`,
  YT_SS: `${VERCEL_STORAGE_BASE_URL}/YT_SS.png`,
  ADVERTISE_SS: `${VERCEL_STORAGE_BASE_URL}/Advertise_SS.png`,
  FLOATING_SS: `${VERCEL_STORAGE_BASE_URL}/floating_SS.png`,
  PREMIUM_EDIT_SS: `${VERCEL_STORAGE_BASE_URL}/Premium_Edit_SS.png`,
  
  // Videos
  DEMO_EDIT: `${VERCEL_STORAGE_BASE_URL}/Demo_Edit_1.mp4`,
  FLOAT_ICONS: `${VERCEL_STORAGE_BASE_URL}/Float icons.mp4`,
  FRAMEFUSION_PERPLEXITY: `${VERCEL_STORAGE_BASE_URL}/Framefusion_Perplexity_Edit_2.mp4`,
  PREMIUM_EDIT_1: `${VERCEL_STORAGE_BASE_URL}/Premium Edit_1.mp4`,
  PREMIUM_EDIT_2: `${VERCEL_STORAGE_BASE_URL}/Premium_Edit_1.mp4`,
};

// Alternative: If you want to use environment variables
// Create a .env file with: REACT_APP_VERCEL_STORAGE_URL=your-storage-url
// Then use: process.env.REACT_APP_VERCEL_STORAGE_URL

export default ASSETS;
