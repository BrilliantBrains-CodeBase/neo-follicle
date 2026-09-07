import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container py-section-y">
      <h1 className="text-h1 font-head text-secondary">Page Not Found</h1>
      <p className="mt-gap-sm text-body text-body">
        <Link to="/">Return to the homepage</Link>
      </p>
    </div>
  )
}
