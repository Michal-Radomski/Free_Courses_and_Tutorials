Meta headers are crucial for optimizing both React applications and traditional HTML pages for search engines and improving
user experience. Here’s a breakdown of the essential meta tags you should use in both contexts.

## Essential Meta Tags for React Applications

1. **Title Tag**:

   - Defines the title of the webpage, displayed in search engine results and browser tabs.

   ```jsx
   <Helmet>
     <title>Your Page Title</title>
   </Helmet>
   ```

2. **Meta Description**:

   - Provides a brief summary of the page content, influencing click-through rates from search results.

   ```jsx
   <Helmet>
     <meta name="description" content="Brief description of your page content" />
   </Helmet>
   ```

3. **Viewport**:

   - Ensures proper scaling on mobile devices.

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```

4. **Keywords** (less commonly used now):

   - Specifies keywords relevant to the page content.

   ```jsx
   <Helmet>
     <meta name="keywords" content="keyword1, keyword2, keyword3" />
   </Helmet>
   ```

5. **Robots**:

   - Directs search engine crawlers on how to index the page.

   ```jsx
   <Helmet>
     <meta name="robots" content="index, follow" />
   </Helmet>
   ```

6. **Canonical Link**:

   - Helps prevent duplicate content issues by specifying the preferred version of a webpage.

   ```jsx
   <Helmet>
     <link rel="canonical" href="https://www.example.com/page-url" />
   </Helmet>
   ```

7. **Open Graph Tags** (for social media sharing):

   - Enhances how links are displayed on social media platforms.

   ```jsx
   <Helmet>
     <meta property="og:title" content="Your Page Title" />
     <meta property="og:description" content="Description for social media." />
     <meta property="og:image" content="URL to image" />
     <meta property="og:url" content="https://www.example.com/page-url" />
   </Helmet>
   ```

8. **Twitter Card Tags** (for Twitter sharing):
   - Similar to Open Graph but specifically for Twitter.
   ```jsx
   <Helmet>
     <meta name="twitter:card" content="summary_large_image" />
     <meta name="twitter:title" content="Your Page Title" />
     <meta name="twitter:description" content="Description for Twitter." />
     <meta name="twitter:image" content="URL to image" />
   </Helmet>
   ```

## Essential Meta Tags for HTML Pages

For traditional HTML pages, the same meta tags apply but are placed directly within the `<head>` section:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your Page Title</title>
    <meta name="description" content="Brief description of your page content" />
    <meta name="keywords" content="keyword1, keyword2, keyword3" />
    <link rel="canonical" href="https://www.example.com/page-url" />
    <!-- Open Graph Tags -->
    <meta property="og:title" content="Your Page Title" />
    <meta property="og:description" content="Description for social media." />
    <meta property="og:image" content="URL to image" />
    <meta property="og:url" content="https://www.example.com/page-url" />
  </head>
  <body>
    <!-- Page Content -->
  </body>
</html>
```

### Conclusion

Incorporating these meta tags into your React application using libraries like **React Helmet** or directly into HTML pages
is essential for enhancing SEO and improving how your pages are presented in search results and on social media platforms.
Properly managing these tags can lead to better visibility and engagement with your audience.

Citations: [1] https://www.seocopilot.com/meta-tags/meta-tag-in-react [2] https://dev.to/facubotta/meta-data-in-react-1p93
[3] https://quickcreator.io/seo/optimize-seo-react-meta-tags-step-by-step-guide/ [4]
https://nexgentechsolutions.com/quick-efficient-way-to-implement-seo-meta-tags-in-reactjs/ [5]
https://stackoverflow.com/questions/37734150/how-to-update-meta-tags-in-react-js/37734302 [6]
https://designcode.io/react-hooks-handbook-seo-and-metadata/ [7]
https://www.fullstack.com/labs/resources/blog/improving-seo-in-react-apps-with-react-helmet [8]
https://www.linkedin.com/pulse/seo-optimization-react-part-1-meta-data-source-code-dhanesh-mane-4snif
