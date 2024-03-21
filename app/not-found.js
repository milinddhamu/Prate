import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-dvh max-h-dvh">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/home" className="underline hover:text-blue-500 transition-all">Return Home</Link>
    </div>
  )
}