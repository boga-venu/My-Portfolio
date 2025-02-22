export default function sitemap() {
    const baseUrl = 'https://vgb-profile.minimaledgetech.com/'; 
    
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
      },
      ];
  }