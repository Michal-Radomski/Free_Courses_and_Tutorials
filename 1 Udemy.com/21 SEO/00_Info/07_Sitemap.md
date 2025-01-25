A **sitemap** is a structured list or file that provides information about the pages, videos, and other content on a website,
along with their relationships. It serves as a guide for both users and search engines, facilitating easier navigation and
indexing of the site’s content.

## Types of Sitemaps

1. **XML Sitemap**:

   - Designed primarily for search engines, an XML sitemap contains a list of URLs for all the pages on a website. Each URL
     entry may include additional metadata such as the last modified date and priority, helping search engines understand the
     importance and freshness of each page. XML sitemaps are typically submitted to search engines like Google to enhance
     crawling efficiency.

   Example of an XML Sitemap:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
           <loc>https://www.example.com/</loc>
           <lastmod>2023-08-15</lastmod>
       </url>
       <url>
           <loc>https://www.example.com/about</loc>
           <lastmod>2023-08-10</lastmod>
       </url>
   </urlset>
   ```

2. **HTML Sitemap**:

   - This type is created for website visitors and presents an organized list of links to all pages on the site in a
     user-friendly format. HTML sitemaps help users quickly find content and navigate through the site, especially beneficial
     for larger websites.

   Example of an HTML Sitemap:

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <title>HTML Sitemap</title>
     </head>
     <body>
       <h1>Website Sitemap</h1>
       <ul>
         <li><a href="https://www.example.com/">Home</a></li>
         <li><a href="https://www.example.com/about">About Us</a></li>
         <li><a href="https://www.example.com/services">Services</a></li>
       </ul>
     </body>
   </html>
   ```

## Benefits of Using a Sitemap

- **Improved SEO**: Sitemaps help search engines discover and index all important pages on your site, enhancing visibility in
  search results.
- **User Navigation**: They provide a clear structure for users, making it easier to find specific content.
- **Error Identification**: Sitemaps can help identify broken links or missing pages, allowing for timely updates and fixes.
- **Content Organization**: They serve as a blueprint for organizing website content, which can be useful during site
  development or updates.

In summary, a sitemap is an essential tool for both webmasters and users, improving site navigation and facilitating
efficient indexing by search engines. By providing a clear overview of a website's structure, sitemaps contribute
significantly to enhancing user experience and optimizing search engine performance [1][2][3][5][6].

Citations: [1] https://techterms.com/definition/sitemap [2]
https://www.cohdigital.io/blog/what-is-a-sitemap-in-web-design-and-why-do-i-need-one [3]
https://dev.to/devhots/what-is-a-sitemap-10h2 [4] https://slickplan.com/sitemap/what-is-a-site-map [5]
https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=en&visit_id=637533703645569991-3393536445&rd=1
[6] https://backlinko.com/hub/seo/sitemaps [7] https://www.seoworks.co.uk/what-is-a-sitemap/ [8]
https://www.geeksforgeeks.org/explain-sitemap-with-advantages-disadvantages-and-their-types/
