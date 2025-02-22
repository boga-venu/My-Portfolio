export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: 'https://vgb-profile.vercel.app/sitemap.xml', 
    };
  }