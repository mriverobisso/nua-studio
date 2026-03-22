import { redirect } from 'next/navigation';

export default function Home() {
  // Directly enforce the login portal as the main entry point
  redirect('/login');
}
