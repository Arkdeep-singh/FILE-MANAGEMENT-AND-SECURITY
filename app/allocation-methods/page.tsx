import Link from "next/link"
import { ArrowLeft, ArrowRight, HardDrive } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AllocationMethodsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">File Allocation Methods</h1>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How Files are Stored on Disk</h2>
          <p className="text-muted-foreground mb-4">
            File allocation methods determine how file data is physically stored on storage devices. The choice of
            allocation method affects performance, efficiency, and the ability to access files randomly or sequentially.
          </p>
          <div className="flex justify-center my-8">
            <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
              <HardDrive className="h-32 w-32 text-primary" />
            </div>
          </div>
        </section>

        <Tabs defaultValue="contiguous" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contiguous">Contiguous Allocation</TabsTrigger>
            <TabsTrigger value="linked">Linked Allocation</TabsTrigger>
            <TabsTrigger value="indexed">Indexed Allocation</TabsTrigger>
          </TabsList>
          <TabsContent value="contiguous" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Contiguous Allocation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  In contiguous allocation, each file occupies a set of contiguous blocks on the disk. The file
                  allocation table needs to record only the location of the first block and the length of the file.
                </p>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Simple implementation</li>
                  <li>Excellent read performance (especially for sequential access)</li>
                  <li>Direct access to any block of the file</li>
                </ul>
                <h4 className="font-medium mb-2">Disadvantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>External fragmentation</li>
                  <li>Difficult to grow files</li>
                  <li>Files may need to be periodically reorganized (defragmentation)</li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Implementation Details:</h4>
                <p className="mb-2">Each file entry in the directory contains:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Starting block number</li>
                  <li>Length of the file in blocks</li>
                </ul>
                <div className="p-3 bg-background rounded-md font-mono text-sm">
                  File: example.txt
                  <br />
                  Starting block: 14
                  <br />
                  Length: 3 blocks
                </div>
                <p className="mt-4 text-muted-foreground">
                  To access the ith block of the file, the system calculates: starting_block + i
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="linked" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Linked Allocation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  In linked allocation, each file is a linked list of disk blocks. The directory contains a pointer to
                  the first and last blocks of the file. Each block contains a pointer to the next block.
                </p>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>No external fragmentation</li>
                  <li>Files can easily grow</li>
                  <li>No need for contiguous space</li>
                </ul>
                <h4 className="font-medium mb-2">Disadvantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Poor random access performance</li>
                  <li>Space overhead for pointers</li>
                  <li>Reliability issues (a single pointer error can lose the rest of the file)</li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Implementation Details:</h4>
                <p className="mb-2">Each file entry in the directory contains:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Pointer to first block</li>
                  <li>Pointer to last block (optional)</li>
                </ul>
                <div className="p-3 bg-background rounded-md font-mono text-sm">
                  File: document.pdf
                  <br />
                  First block: 9<br />
                  Block 9 → Block 16 → Block 1 → Block 25 → NULL
                </div>
                <p className="mt-4 text-muted-foreground">
                  FAT (File Allocation Table) is a variation of linked allocation where all the pointers are stored in a
                  separate table, improving random access.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="indexed" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Indexed Allocation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  Indexed allocation brings all pointers together into an index block. Each file has its own index
                  block, which is an array of disk block addresses.
                </p>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Supports direct access</li>
                  <li>No external fragmentation</li>
                  <li>Files can easily grow (up to a limit)</li>
                </ul>
                <h4 className="font-medium mb-2">Disadvantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Space overhead for index blocks</li>
                  <li>Maximum file size limited by index block size</li>
                  <li>Additional disk I/O to access the index block</li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Implementation Details:</h4>
                <p className="mb-2">Each file entry in the directory contains:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Pointer to the index block</li>
                </ul>
                <div className="p-3 bg-background rounded-md font-mono text-sm">
                  File: video.mp4
                  <br />
                  Index block: 3<br />
                  <br />
                  Index Block 3 contents:
                  <br />
                  [0] → Block 7<br />
                  [1] → Block 12
                  <br />
                  [2] → Block 4<br />
                  [3] → Block 18
                  <br />
                  ...
                </div>
                <p className="mt-4 text-muted-foreground">
                  For large files, multi-level indexing or combined schemes can be used (e.g., Unix i-nodes).
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Performance Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Allocation Method</th>
                  <th className="border p-2 text-left">Sequential Access</th>
                  <th className="border p-2 text-left">Random Access</th>
                  <th className="border p-2 text-left">Space Efficiency</th>
                  <th className="border p-2 text-left">File Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">Contiguous</td>
                  <td className="border p-2">Excellent</td>
                  <td className="border p-2">Excellent</td>
                  <td className="border p-2">Poor (external fragmentation)</td>
                  <td className="border p-2">Difficult</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Linked</td>
                  <td className="border p-2">Good</td>
                  <td className="border p-2">Poor</td>
                  <td className="border p-2">Fair (pointer overhead)</td>
                  <td className="border p-2">Excellent</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">FAT (Linked)</td>
                  <td className="border p-2">Good</td>
                  <td className="border p-2">Good</td>
                  <td className="border p-2">Fair (table overhead)</td>
                  <td className="border p-2">Excellent</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Indexed</td>
                  <td className="border p-2">Good</td>
                  <td className="border p-2">Excellent</td>
                  <td className="border p-2">Fair (index overhead)</td>
                  <td className="border p-2">Good (up to limit)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4">Real-World Examples</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>FAT File System</CardTitle>
                <CardDescription>Used in Windows, removable media</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Uses a variation of linked allocation with a file allocation table that stores all the pointers in a
                  central location.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Unix File System</CardTitle>
                <CardDescription>Used in Unix, Linux, macOS</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Uses a combination of direct, indirect, double indirect, and triple indirect blocks (a form of indexed
                  allocation).
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>NTFS</CardTitle>
                <CardDescription>Used in modern Windows</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Uses a Master File Table (MFT) with a complex allocation scheme that combines aspects of indexed
                  allocation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="flex justify-between mt-10">
          <Button variant="outline" asChild>
            <Link href="/file-directories">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: File Directories
            </Link>
          </Button>
          <Button asChild>
            <Link href="/access-methods">
              Next: Access Methods
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

