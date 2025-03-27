import Link from "next/link"
import { ArrowLeft, HardDrive, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DemosPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Interactive Demonstrations</h1>
      </div>

      <div className="grid gap-8">
        <section>
          <p className="text-muted-foreground mb-8">
            These interactive demonstrations will help you understand key concepts in file management and security
            through hands-on experience.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>File Allocation Simulator</CardTitle>
                <CardDescription>Visualize how different allocation methods work</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center mb-4">
                  <HardDrive className="h-16 w-16 text-muted-foreground" />
                </div>
                <p>This simulator demonstrates how files are allocated on disk using different methods:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Contiguous allocation</li>
                  <li>Linked allocation</li>
                  <li>Indexed allocation</li>
                </ul>
                <p className="mt-2">
                  You can create and delete files to see how each method handles space allocation and fragmentation.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/demos/allocation">Try Simulator</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Encryption Demo</CardTitle>
                <CardDescription>See how file encryption protects your data</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="h-40 w-full bg-muted rounded-md flex items-center justify-center mb-4">
                  <Shield className="h-16 w-16 text-muted-foreground" />
                </div>
                <p>This demonstration shows how encryption works to protect sensitive data:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Caesar cipher (simple substitution)</li>
                  <li>XOR encryption</li>
                  <li>Substitution cipher</li>
                </ul>
                <p className="mt-2">
                  You can encrypt and decrypt messages to understand the principles behind data protection.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/demos/encryption">Try Encryption</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4">Learning Through Interaction</h2>
          <p className="mb-4">
            These demonstrations are designed to help you understand complex file management and security concepts
            through hands-on experience. By interacting with these simulations, you can:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Visualize abstract concepts</li>
            <li>Experiment with different parameters</li>
            <li>See the effects of different algorithms</li>
            <li>Develop a deeper understanding of the underlying principles</li>
          </ul>
          <p className="mt-4">
            We recommend trying both demonstrations and experimenting with different settings to get the most out of
            your learning experience.
          </p>
        </section>

        <div className="flex justify-between mt-10">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

