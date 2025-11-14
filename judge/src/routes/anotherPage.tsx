import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/anotherPage')({
  component: AnotherPage
})
function AnotherPage() {
  

  return (
    <main className="p-8 flex flex-col gap-16">
      Hello from another page!
      <Link to="/">Go back home</Link>
    </main>
  )
}
