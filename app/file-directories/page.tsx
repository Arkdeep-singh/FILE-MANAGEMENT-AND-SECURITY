import Link from "next/link"
import { ArrowLeft, Folder, FolderTree, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FileDirectoriesPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">File Directories</h1>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What are File Directories?</h2>
          <p className="text-muted-foreground mb-4">
            File directories are the organizational structures that contain files and other directories. They provide a
            way to organize files on a storage device, making it easier to locate and manage them.
          </p>
          <div className="flex justify-center my-8">
            <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
              <FolderTree className="h-32 w-32 text-primary" />
            </div>
          </div>
        </section>

        <Tabs defaultValue="structures" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="structures">Directory Structures</TabsTrigger>
            <TabsTrigger value="operations">Directory Operations</TabsTrigger>
            <TabsTrigger value="naming">Path Naming</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>
          <TabsContent value="structures" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Directory Structures</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Single-Level Directory</CardTitle>
                  <CardDescription>The simplest directory structure</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    All files are contained in the same directory, which creates a flat file system.
                  </p>
                  <p className="text-muted-foreground">
                    Limitations: Naming conflicts when multiple users share the system, difficult organization with many
                    files.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Two-Level Directory</CardTitle>
                  <CardDescription>Separate directory for each user</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    Each user has their own user file directory (UFD). A master file directory (MFD) is used to point to
                    each UFD.
                  </p>
                  <p className="text-muted-foreground">
                    Advantages: Isolates users from one another, allows same file names for different users.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tree-Structured Directory</CardTitle>
                  <CardDescription>Hierarchical organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    Directories can contain both files and other directories, creating a hierarchical structure.
                  </p>
                  <p className="text-muted-foreground">
                    Advantages: Efficient organization, grouping of related files, path naming to locate files.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Acyclic-Graph Directory</CardTitle>
                  <CardDescription>Sharing of directories and files</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">
                    Extends the tree structure to allow sharing of files and directories through links.
                  </p>
                  <p className="text-muted-foreground">
                    Challenges: Avoiding cycles, handling dangling pointers, implementing file deletion.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="operations" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Directory Operations</h3>
            <ul className="space-y-4">
              <li className="p-4 bg-muted rounded-md">
                <div className="flex items-center">
                  <Folder className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-semibold">Create</span>
                </div>
                <p className="mt-2">
                  Creates a new directory that is empty except for . and .. entries (in most systems).
                </p>
              </li>
              <li className="p-4 bg-muted rounded-md">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-semibold">Delete</span>
                </div>
                <p className="mt-2">Removes a directory, which must be empty (except for . and .. entries).</p>
              </li>
              <li className="p-4 bg-muted rounded-md">
                <div className="flex items-center">
                  <Folder className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-semibold">Open</span>
                </div>
                <p className="mt-2">Opens a directory to access its entries. Directory must be closed after use.</p>
              </li>
              <li className="p-4 bg-muted rounded-md">
                <div className="flex items-center">
                  <Folder className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-semibold">Close</span>
                </div>
                <p className="mt-2">Closes an open directory when it is no longer needed.</p>
              </li>
              <li className="p-4 bg-muted rounded-md">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-semibold">Read/Search</span>
                </div>
                <p className="mt-2">Returns the next entry in an open directory, allowing traversal of all entries.</p>
              </li>
              <li className="p-4 bg-muted rounded-md">
                <div className="flex items-center">
                  <Folder className="h-6 w-6 mr-2 text-primary" />
                  <span className="font-semibold">Rename</span>
                </div>
                <p className="mt-2">Changes the name of a directory.</p>
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="naming" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Path Naming</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Absolute Path</h4>
                <p className="mb-2">Specifies the location of a file starting from the root directory.</p>
                <div className="p-3 bg-muted rounded-md font-mono">/home/user/documents/report.txt</div>
                <p className="mt-2 text-muted-foreground">
                  Always starts with the root directory (/ in Unix-like systems).
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Relative Path</h4>
                <p className="mb-2">Specifies the location of a file relative to the current working directory.</p>
                <div className="p-3 bg-muted rounded-md font-mono">documents/report.txt</div>
                <p className="mt-2 text-muted-foreground">Does not start with the root directory symbol.</p>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Special Directory Entries</h4>
                <ul className="space-y-2">
                  <li className="p-3 bg-muted rounded-md">
                    <span className="font-mono">.</span> - Current directory
                  </li>
                  <li className="p-3 bg-muted rounded-md">
                    <span className="font-mono">..</span> - Parent directory
                  </li>
                  <li className="p-3 bg-muted rounded-md">
                    <span className="font-mono">~</span> - Home directory (in Unix-like systems)
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="implementation" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Directory Implementation</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Linear List</h4>
                <p>
                  A simple list of file names with pointers to the data blocks. Sequential search is used to find a
                  specific file.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Advantages: Simple implementation. Disadvantages: Inefficient for large directories.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">Hash Table</h4>
                <p>Uses a hash function to map file names to entries in the directory structure.</p>
                <p className="mt-2 text-muted-foreground">
                  Advantages: Faster lookup than linear list. Disadvantages: Fixed size, collision handling required.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">B-Tree</h4>
                <p>A balanced tree structure that allows for efficient insertion, deletion, and search operations.</p>
                <p className="mt-2 text-muted-foreground">
                  Advantages: Efficient for large directories, dynamic sizing. Disadvantages: More complex
                  implementation.
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-md border border-primary/20 mt-4">
                <h4 className="text-lg font-medium mb-2">Directory Entry Information</h4>
                <p>Each directory entry typically contains:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>File name</li>
                  <li>File attributes (size, type, permissions, etc.)</li>
                  <li>Pointer to file location on disk (inode number, FAT entry, etc.)</li>
                  <li>Creation/modification/access timestamps</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Common File System Implementations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Unix File System</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Uses inodes to store file metadata</li>
                  <li>Hierarchical directory structure</li>
                  <li>Everything is treated as a file</li>
                  <li>Supports hard and symbolic links</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>FAT File System</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Uses File Allocation Table</li>
                  <li>Simple structure, widely compatible</li>
                  <li>Limited security features</li>
                  <li>Variants: FAT12, FAT16, FAT32, exFAT</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>NTFS</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Uses Master File Table (MFT)</li>
                  <li>Advanced security features</li>
                  <li>Supports file compression</li>
                  <li>Journaling for crash recovery</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="flex justify-between mt-10">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/allocation-methods">Next: Allocation Methods</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

