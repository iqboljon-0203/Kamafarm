import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kamafarm.uz';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // We can add dynamic product routes here in the future:
    // ...products.map((product) => ({
    //   url: `${baseUrl}/product/${product.id}`,
    //   lastModified: new Date(product.updated_at),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // }))
  ];
}
