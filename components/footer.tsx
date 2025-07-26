export default function Footer() {
  return (
    <footer className="py-6 position-sticky bottom-0 left-0 right-0 px-6 text-center text-sm text-muted-foreground border-t bg-foreground">
      © {new Date().getFullYear()} Gecknology. All rights reserved.
    </footer>
  )
}
