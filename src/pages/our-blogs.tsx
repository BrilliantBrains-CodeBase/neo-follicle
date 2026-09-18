import BlogListing from '../components/BlogListing'
import { seoFor } from '../seo/pages'

/**
 * /our-blogs/ -- the blog listing.
 *
 * The <h1> comes from the captured PageSeo record rather than a literal, so it
 * cannot drift from what the old page ranked with. Everything else is in
 * BlogListing, which /category/uncategorized/ shares.
 */
export default function OurBlogs() {
  return <BlogListing heading={seoFor('our-blogs').h1 ?? 'Our Blogs'} crumb="Blog" />
}
