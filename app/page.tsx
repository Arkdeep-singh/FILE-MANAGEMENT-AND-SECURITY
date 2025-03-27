import Link from "next/link"
import { ArrowRight, FileText, Lock, HardDrive, Database, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="hidden font-bold sm:inline-block">FileManagement & Security</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/file-directories" className="transition-colors hover:text-foreground/80">
                File Directories
              </Link>
              <Link href="/allocation-methods" className="transition-colors hover:text-foreground/80">
                Allocation Methods
              </Link>
              <Link href="/access-methods" className="transition-colors hover:text-foreground/80">
                Access Methods
              </Link>
              <Link href="/free-space" className="transition-colors hover:text-foreground/80">
                Free Space
              </Link>
              <Link href="/security" className="transition-colors hover:text-foreground/80">
                Security
              </Link>
            </nav>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">
            Login
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Introduction to File Management and Security
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Learn about file systems, allocation methods, access control, and security measures to protect your
                  data.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/file-directories">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/demos">Interactive Demos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Core Concepts
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Understanding File Management
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  File management is the process of organizing, storing, and retrieving files efficiently. Learn how
                  operating systems handle files and directories.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                    <FileText className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                    <HardDrive className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                    <Database className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                    <Lock className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Topics</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore the fundamental concepts of file management and security
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-primary/20 transition-all hover:border-primary hover:shadow-md">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">File Directories</CardTitle>
                  <CardDescription>Organization and structure of file systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Directory structures</li>
                    <li>Path naming</li>
                    <li>Directory operations</li>
                    <li>Hierarchical systems</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/file-directories">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-primary/20 transition-all hover:border-primary hover:shadow-md">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Allocation Methods</CardTitle>
                  <CardDescription>How files are stored on storage devices</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Contiguous allocation</li>
                    <li>Linked allocation</li>
                    <li>Indexed allocation</li>
                    <li>Performance comparisons</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/allocation-methods">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-primary/20 transition-all hover:border-primary hover:shadow-md">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Access Methods</CardTitle>
                  <CardDescription>Techniques for accessing file data</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Sequential access</li>
                    <li>Direct access</li>
                    <li>Indexed access</li>
                    <li>Use cases and efficiency</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/access-methods">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-primary/20 transition-all hover:border-primary hover:shadow-md">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Free Space Management</CardTitle>
                  <CardDescription>Tracking and allocating available storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Bit vectors</li>
                    <li>Linked lists</li>
                    <li>Grouping</li>
                    <li>Counting</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/free-space">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-primary/20 transition-all hover:border-primary hover:shadow-md">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">File Organization</CardTitle>
                  <CardDescription>Structuring files for efficient access</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>File naming conventions</li>
                    <li>File types and formats</li>
                    <li>Metadata management</li>
                    <li>File system types</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/file-organization">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-primary/20 transition-all hover:border-primary hover:shadow-md">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Security Measures</CardTitle>
                  <CardDescription>Protecting files from unauthorized access</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Access control</li>
                    <li>Encryption techniques</li>
                    <li>Backup strategies</li>
                    <li>Recovery methods</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/security">Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Interactive Demonstrations
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Practical implementations to help you understand file management concepts
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
                <Card className="border-primary/20 transition-all hover:border-primary hover:shadow-md">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">File Allocation Simulator</CardTitle>
                    <CardDescription>Visualize how different allocation methods work</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-6">
                    <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center">
                      <HardDrive className="h-16 w-16 text-muted-foreground" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/demos/allocation">Try Simulator</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="border-primary/20 transition-all hover:border-primary hover:shadow-md">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Encryption Demo</CardTitle>
                    <CardDescription>See how file encryption protects your data</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-6">
                    <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center">
                      <Shield className="h-16 w-16 text-muted-foreground" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/demos/encryption">Try Encryption</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 File Management & Security. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

