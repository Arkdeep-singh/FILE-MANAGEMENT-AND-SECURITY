import Link from "next/link"
import { ArrowLeft, ArrowRight, HardDrive } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FreeSpacePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Free Space Management</h1>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Tracking Available Disk Space</h2>
          <p className="text-muted-foreground mb-4">
            Free space management is the process of keeping track of available disk space and allocating it when needed. Efficient free space management is crucial for optimizing storage utilization and minimizing fragmentation.
          </p>
          <div className="flex justify-center my-8">
            <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
              <HardDrive className="h-32 w-32 text-primary" />
            </div>
          </div>
        </section>

        <Tabs defaultValue="bit-vector" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bit-vector">Bit Vector</TabsTrigger>
            <TabsTrigger value="linked-list">Linked List</TabsTrigger>
            <TabsTrigger value="grouping">Grouping</TabsTrigger>
            <TabsTrigger value="counting">Counting</TabsTrigger>
          </TabsList>
          <TabsContent value="bit-vector" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Bit Vector (Bitmap)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  A bit vector (or bitmap) uses a bit array where each bit represents one block on the disk. If the block is free, the bit is 1; if the block is allocated, the bit is 0 (or vice versa, depending on the implementation).
                </p>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Simple to implement</li>
                  <li>Easy to find first free block or n consecutive free blocks</li>
                  <li>Efficient space usage for large disks</li>
                </ul>
                <h4 className="font-medium mb-2">Disadvantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Requires extra space for the bitmap</li>
                  <li>Bitmap must be kept in memory for efficiency</li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Implementation Details:</h4>
                <p className="mb-2">For a disk with n blocks, we need n bits for the bitmap.</p>
                <div className="p-3 bg-background rounded-md font-mono text-sm">
                  // Example bitmap for 16 blocks<br />
                  // 1 = free, 0 = allocated<br />
                  [1,0,1,1,0,0,1,1,1,0,1,0,0,1,1,0]<br /><br />
                  // To find if block i is free:<br />
                  if (bitmap[i] == 1) {<br />\
                    &nbsp;&nbsp;// block i is free<br />
                  }
                </div>
                <p className="mt-4 text-muted-foreground">
                  The bitmap is often stored at the beginning of the disk or in a known location. For very large disks, the bitmap itself can be quite large.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="linked-list" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Linked List</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  In this approach, all free blocks are linked together in a linked list. The file system maintains a pointer to the first free block. Each free block contains a pointer to the next free block.
                </p>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>No waste of space (uses space only in free blocks)</li>
                  <li>Simple to implement</li>
                  <li>Easy to merge adjacent free blocks</li>
                </ul>
                <h4 className="font-medium mb-2">Disadvantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Inefficient for finding a sequence of blocks</li>
                  <li>Traversing the list can be slow</li>
                  <li>Pointers take up space in free blocks</li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Implementation Details:</h4>
                <p className="mb-2">The free list is a chain of blocks, with each block pointing to the next free block.</p>
                <div className="p-3 bg-background rounded-md font-mono text-sm">
                  // Free list pointer<br />
                  free_list_head = 3;<br /><br />
                  // Block 3 points to block 6<br />
                  // Block 6 points to block 8<br />
                  // Block 8 points to NULL<br /><br />
                  // To allocate a block:<br />
                  block = free_list_head;<br />
                  free_list_head = get_next_free(block);
                </div>
                <p className="mt-4 text-muted-foreground">
                  Variations include keeping a free list for each size of available block or maintaining both a head and tail pointer for faster appending.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="grouping" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Grouping</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  Grouping is an extension of the linked list approach. Instead of each free block pointing to the next free block, each block contains addresses of multiple free blocks. The first free block contains addresses of n free blocks, the last of which contains addresses of another n free blocks, and so on.
                </p>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Faster allocation than simple linked list</li>
                  <li>Reduced traversal time</li>
                  <li>Better utilization of free block space</li>
                </ul>
                <h4 className="font-medium mb-2">Disadvantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>More complex implementation</li>
                  <li>Still not optimal for finding contiguous blocks</li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Implementation Details:</h4>
                <p className="mb-2">Each free block can store multiple addresses of other free blocks.</p>
                <div className="p-3 bg-background rounded-md font-mono text-sm">
                  // First free block at address 10<br />
                  // It contains addresses of 4 free blocks<br />
                  Block 10: [23, 45, 67, 89]<br /><br />
                  // Block 89 contains next group of free blocks<br />
                  Block 89: [12, 34, 56, 78]<br /><br />
                  // Block 78 contains next group, etc.
                </div>
                <p className="mt-4 text-muted-foreground">
                  This approach is particularly useful for large storage systems where traversing a simple linked list would be too time-consuming.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="counting" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Counting</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  The counting approach takes advantage of the fact that contiguous blocks are often allocated and freed together. Instead of recording each free block, the system keeps track of a starting block address and the count of contiguous free blocks.
                </p>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Efficient for contiguous allocation</li>
                  <li>Compact representation</li>
                  <li>Easy to find blocks of a specific size</li>
                </ul>
                <h4 className="font-medium mb-2">Disadvantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>More complex to maintain</li>
                  <li>Overhead for small, scattered free blocks</li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Implementation Details:</h4>
                <p className="mb-2">The free space list contains entries with an address and count.</p>
                <div className="p-3 bg-background rounded-md font-mono text-sm">
                  // Free space list with (address, count) pairs<br />
                  [(14, 3), (22, 5), (31, 2), (47, 8)]<br /><br />
                  // This means:<br />
                  // 3 contiguous blocks starting at block 14<br />
                  // 5 contiguous blocks starting at block 22<br />
                  // 2 contiguous blocks starting at block 31<br />
                  // 8 contiguous blocks starting at block 47
                </div>
                <p className="mt-4 text-muted-foreground">
                  This method is particularly useful for systems that frequently allocate contiguous blocks, such as file systems with contiguous allocation.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Space Efficiency Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Method</th>
                  <th className="border p-2 text-left">Space Overhead</th>
                  <th className="border p-2 text-left">Allocation Speed</th>
                  <th className="border p-2 text-left">Contiguous Block Finding</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">Bit Vector</td>
                  <td className="border p-2">n/8 bytes for n blocks</td>
                  <td className="border p-2">Fast</td>
                  <td className="border p-2">Good</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Linked List</td>
                  <td className="border p-2">1 pointer per free block</td>
                  <td className="border p-2">Fast for single blocks</td>
                  <td className="border p-2">Poor</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Grouping</td>
                  <td className="border p-2">Varies, but efficient</td>
                  <td className="border p-2">Moderate</td>
                  <td className="border p-2">Moderate</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Counting</td>
                  <td className="border p-2">2 values per free region</td>
                  <td className="border p-2">Moderate</td>
                  <td className="border p-2">Excellent</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4">Real-World Implementations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Unix File System</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Traditional Unix file systems use a combination of bitmap and linked list approaches. The superblock contains a summary of available blocks.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>NTFS</CardTitle>
              </CardHeader>
              <CardContent>
                <p>NTFS uses a bitmap to track free clusters. The bitmap is stored as a special system file called $Bitmap.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>FAT File System</CardTitle>
              </CardHeader>
              <CardContent>
                <p>FAT uses the File Allocation Table itself to track free clusters, with a special value (usually 0) indicating a free cluster.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Fragmentation Issues</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>External Fragmentation</CardTitle>
                <CardDescription>Free space is broken into small, non-contiguous blocks</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">External fragmentation occurs when free space is broken into small pieces scattered throughout the disk, making it difficult to allocate large contiguous blocks.</p>
                <h4 className="font-medium mb-2">Solutions:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Compaction (defragmentation)</li>
                  <li>Better allocation algorithms</li>
                  <li>Using non-contiguous allocation methods</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Internal Fragmentation</CardTitle>
                <CardDescription>Allocated space is larger than needed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Internal fragmentation occurs when more space is allocated than is needed, resulting in wasted space within allocated blocks.</p>
                <h4 className="font-medium mb-2">Solutions:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Variable block sizes</li>
                  <li>Efficient block size selection</li>
                  <li>File system with multiple block sizes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="flex justify-between mt-10">
          <Button variant="outline" asChild>
            <Link href="/access-methods">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Access Methods
            </Link>
          </Button>
          <Button asChild>
            <Link href="/security">
              Next: Security Measures
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

