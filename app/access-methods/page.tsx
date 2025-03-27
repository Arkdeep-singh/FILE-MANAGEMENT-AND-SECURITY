import Link from "next/link"
import { ArrowLeft, ArrowRight, FileSearch } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccessMethodsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">File Access Methods</h1>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How Files are Accessed</h2>
          <p className="text-muted-foreground mb-4">
            File access methods define how data within files is accessed and manipulated. The appropriate access method depends on the file's organization and the application's requirements.
          </p>
          <div className="flex justify-center my-8">
            <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
              <FileSearch className="h-32 w-32 text-primary" />
            </div>
          </div>
        </section>

        <Tabs defaultValue="sequential" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sequential">Sequential Access</TabsTrigger>
            <TabsTrigger value="direct">Direct Access</TabsTrigger>
            <TabsTrigger value="indexed">Indexed Access</TabsTrigger>
          </TabsList>
          <TabsContent value="sequential" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Sequential Access</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  Sequential access is the simplest access method. Information in the file is processed in order, one record after another. This is the most common access method for tape-based storage systems.
                </p>
                <h4 className="font-medium mb-2">Operations:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>read_next(): Read the next record</li>
                  <li>write_next(): Write the next record</li>
                  <li>reset(): Reset to the beginning of the file</li>
                  <li>skip_n(): Skip forward n records</li>
                </ul>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Simple implementation</li>
                  <li>Efficient for applications that process all records</li>
                  <li>Low overhead</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Disadvantages:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Inefficient for random access</li>
                  <li>Time-consuming to reach a specific record</li>
                  <li>Limited flexibility</li>
                </ul>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Use Cases:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Batch processing</li>
                    <li>Log files</li>
                    <li>Text files being read from beginning to end</li>
                    <li>Streaming media (audio/video)</li>
                    <li>Tape backups</li>
                  </ul>
                  <div className="p-3 mt-4 bg-background rounded-md font-mono text-sm">
                    // Pseudocode for sequential read<br />
                    file.reset();<br />
                    while (!file.end_of_file()) {<br />\
                    &nbsp;&nbsp;record = file.read_next();<br />
                    &nbsp;&nbsp;process(record);<br />
                    }
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="direct" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Direct Access</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  Direct access (also called random access) allows records to be read or written in any order. The file is viewed as a numbered sequence of blocks or records, and you can access any block directly by specifying its number.
                </p>
                <h4 className="font-medium mb-2">Operations:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>read(n): Read record/block n</li>
                  <li>write(n): Write record/block n</li>
                  <li>position_to(n): Position to record/block n</li>
                  <li>read_next(): Read the next record</li>
                  <li>write_next(): Write the next record</li>
                </ul>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Fast access to any record</li>
                  <li>Efficient for applications that need random access</li>
                  <li>Supports both sequential and random processing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Disadvantages:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>More complex implementation</li>
                  <li>Requires additional metadata</li>
                  <li>May have more overhead for sequential processing</li>
                </ul>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Use Cases:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Database systems</li>
                    <li>File systems</li>
                    <li>Applications with interactive queries</li>
                    <li>Random data access patterns</li>
                  </ul>
                  <div className="p-3 mt-4 bg-background rounded-md font-mono text-sm">
                    // Pseudocode for direct access<br />
                    // Read the 5th, 10th, and 2nd records<br />
                    record5 = file.read(5);<br />
                    record10 = file.read(10);<br />
                    record2 = file.read(2);<br /><br />
                    // Update the 7th record<br />
                    file.write(7, new_data);
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="indexed" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Indexed Access</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  Indexed access uses an index to locate records in a file. The index contains key-pointer pairs, where each key corresponds to a record in the data file, and the pointer indicates the record's location.
                </p>
                <h4 className="font-medium mb-2">Components:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Data file: Contains the actual records</li>
                  <li>Index file: Contains keys and pointers to records</li>
                </ul>
                <h4 className="font-medium mb-2">Operations:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>find(key): Find record with given key</li>
                  <li>insert(record): Insert a new record</li>
                  <li>delete(key): Delete record with given key</li>
                  <li>update(key, record): Update record with given key</li>
                </ul>
                <h4 className="font-medium mb-2">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Fast access based on key values</li>
                  <li>Supports complex queries</li>
                  <li>Efficient for large datasets</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Disadvantages:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Index maintenance overhead</li>
                  <li>Additional storage for indexes</li>
                  <li>Complex implementation</li>
                </ul>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Index Types:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Primary index: Based on the primary key, records sorted by key</li>
                    <li>Secondary index: Based on non-primary keys, allows multiple indexes</li>
                    <li>Clustered index: Records physically ordered by the index</li>
                    <li>Non-clustered index: Logical ordering different from physical</li>
                  </ul>
                  <div className="p-3 mt-4 bg-background rounded-md font-mono text-sm">
                    // Pseudocode for indexed access<br />
                    // Find a customer by ID<br />
                    index_entry = customer_index.find("ID123");<br />
                    if (index_entry) {<br />
                    &nbsp;&nbsp;customer = data_file.read(index_entry.pointer);<br />
                    &nbsp;&nbsp;display(customer);<br />
                    }
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Choosing the Right Access Method</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Factor</th>
                  <th className="border p-2 text-left">Sequential Access</th>
                  <th className="border p-2 text-left">Direct Access</th>
                  <th className="border p-2 text-left">Indexed Access</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">Data Size</td>
                  <td className="border p-2">Any size</td>
                  <td className="border p-2">Any size</td>
                  <td className="border p-2">Better for large datasets</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Access Pattern</td>
                  <td className="border p-2">Sequential processing</td>
                  <td className="border p-2">Random access</td>
                  <td className="border p-2">Key-based queries</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Update Frequency</td>
                  <td className="border p-2">Low to moderate</td>
                  <td className="border p-2">Any</td>
                  <td className="border p-2">Moderate (index maintenance)</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Implementation Complexity</td>
                  <td className="border p-2">Simple</td>
                  <td className="border p-2">Moderate</td>
                  <td className="border p-2">Complex</td>
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Storage Overhead</td>
                  <td className="border p-2">Low</td>
                  <td className="border p-2">Low to moderate</td>
                  <td className="border p-2">High (for indexes)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4">Real-World Applications</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Database Management Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Use a combination of indexed and direct access methods to provide efficient data retrieval based on various query types.</p>
                <ul className="list-disc pl-5 mt-4">
                  <li>B-tree indexes for range queries</li>
                  <li>Hash indexes for equality queries</li>
                  <li>Sequential scans for full table scans</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>File Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Use direct access for file blocks and indexed access (through directory structures) to locate files.</p>
                <ul className="list-disc pl-5 mt-4">
                  <li>FAT: Direct access to file clusters</li>
                  <li>NTFS: B-tree for MFT lookups</li>
                  <li>Unix: Indexed access via inodes</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Multimedia Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Use sequential access for streaming and direct access for seeking to specific positions.</p>
                <ul className="list-disc pl-5 mt-4">
                  <li>Video players: Sequential for playback</li>
                  <li>Audio editors: Direct for editing</li>
                  <li>Image libraries: Indexed for metadata</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="flex justify-between mt-10">
          <Button variant="outline" asChild>
            <Link href="/allocation-methods">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Allocation Methods
            </Link>
          </Button>
          <Button asChild>
            <Link href="/free-space">
              Next: Free Space Management
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

