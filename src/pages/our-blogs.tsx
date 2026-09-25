import BlogListing from '../components/BlogListing'
import { BLOG_LABEL } from '../config/nav'
import { seoFor } from '../seo/pages'

/**
 * /our-blogs/ -- the blog listing.
 *
 * The h1 is the captured one, "Our Blogs", which is also what the <title> says
 * -- scripts/verify-seo.mjs fixes that title byte-for-byte against the capture,
 * so taking it back puts the two in agreement again.
 *
 * The section around it is called "Media & Blogs" in the nav, but that is a
 * dropdown over two pages now: this one and /media-coverage/. The section's
 * name is not this page's name.
 *
 * Everything else is in BlogListing, which /category/uncategorized/ shares.
 */
export default function OurBlogs() {
  return <BlogListing heading={seoFor('our-blogs').h1 ?? 'Our Blogs'} crumb={BLOG_LABEL} />
}
