import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

export default function HomePage() {
  // Redirect to a default site or show site selection
  // For now, redirect to admin
  redirect('/admin/login');
}

