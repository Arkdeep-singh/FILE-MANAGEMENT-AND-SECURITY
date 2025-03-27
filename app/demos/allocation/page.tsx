"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AllocationSimulatorPage() {
  const [totalBlocks, setTotalBlocks] = useState(20)
  const [fileSize, setFileSize] = useState(3)
  const [allocationType, setAllocationType] = useState("contiguous")
  const [diskState, setDiskState] = useState<Array<{ allocated: boolean; fileId: number | null }>>([])
  const [files, setFiles] = useState<Array<{ id: number; size: number; startBlock?: number; blocks?: number[] }>>([])
  const [nextFileId, setNextFileId] = useState(1)

  // Initialize disk state
  useEffect(() => {
    resetDisk()
  }, [totalBlocks])

  const resetDisk = () => {
    const newDiskState = Array(totalBlocks)
      .fill(null)
      .map(() => ({ allocated: false, fileId: null }))
    setDiskState(newDiskState)
    setFiles([])
    setNextFileId(1)
  }

  const allocateFile = () => {
    if (fileSize <= 0 || fileSize > totalBlocks) return

    const newFileId = nextFileId
    let allocated = false

    if (allocationType === "contiguous") {
      // Find contiguous free blocks
      for (let i = 0; i <= totalBlocks - fileSize; i++) {
        let contiguousFree = true
        for (let j = 0; j < fileSize; j++) {
          if (diskState[i + j].allocated) {
            contiguousFree = false
            break
          }
        }

        if (contiguousFree) {
          // Allocate blocks
          const newDiskState = [...diskState]
          for (let j = 0; j < fileSize; j++) {
            newDiskState[i + j] = { allocated: true, fileId: newFileId }
          }
          setDiskState(newDiskState)

          // Add file to list
          setFiles([...files, { id: newFileId, size: fileSize, startBlock: i }])
          setNextFileId(newFileId + 1)
          allocated = true
          break
        }
      }
    } else if (allocationType === "linked") {
      // Count free blocks
      const freeBlocks = diskState.filter((block) => !block.allocated).length

      if (freeBlocks >= fileSize) {
        const newDiskState = [...diskState]
        const fileBlocks: number[] = []

        // Find and allocate free blocks
        let count = 0
        for (let i = 0; i < totalBlocks && count < fileSize; i++) {
          if (!newDiskState[i].allocated) {
            newDiskState[i] = { allocated: true, fileId: newFileId }
            fileBlocks.push(i)
            count++
          }
        }

        setDiskState(newDiskState)
        setFiles([...files, { id: newFileId, size: fileSize, blocks: fileBlocks }])
        setNextFileId(newFileId + 1)
        allocated = true
      }
    } else if (allocationType === "indexed") {
      // Count free blocks (need fileSize + 1 for index block)
      const freeBlocks = diskState.filter((block) => !block.allocated).length

      if (freeBlocks >= fileSize + 1) {
        const newDiskState = [...diskState]
        const fileBlocks: number[] = []

        // Find index block first
        let indexBlock = -1
        for (let i = 0; i < totalBlocks; i++) {
          if (!newDiskState[i].allocated) {
            indexBlock = i
            newDiskState[i] = { allocated: true, fileId: newFileId }
            break
          }
        }

        // Find and allocate data blocks
        let count = 0
        for (let i = 0; i < totalBlocks && count < fileSize; i++) {
          if (i !== indexBlock && !newDiskState[i].allocated) {
            newDiskState[i] = { allocated: true, fileId: newFileId }
            fileBlocks.push(i)
            count++
          }
        }

        setDiskState(newDiskState)
        setFiles([...files, { id: newFileId, size: fileSize, startBlock: indexBlock, blocks: fileBlocks }])
        setNextFileId(newFileId + 1)
        allocated = true
      }
    }

    if (!allocated) {
      alert("Not enough free space to allocate file!")
    }
  }

  const deleteFile = (fileId: number) => {
    // Remove file from disk state
    const newDiskState = diskState.map((block) =>
      block.fileId === fileId ? { allocated: false, fileId: null } : block,
    )
    setDiskState(newDiskState)

    // Remove file from files list
    setFiles(files.filter((file) => file.id !== fileId))
  }

  const getBlockColor = (fileId: number | null) => {
    if (fileId === null) return "bg-gray-200 dark:bg-gray-700"

    // Generate a color based on fileId
    const colors = [
      "bg-red-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-yellow-400",
      "bg-purple-400",
      "bg-pink-400",
      "bg-indigo-400",
      "bg-orange-400",
      "bg-teal-400",
    ]

    return colors[(fileId - 1) % colors.length]
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/demos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Demos
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">File Allocation Simulator</h1>
      </div>

      <div className="grid gap-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Disk Configuration</CardTitle>
              <CardDescription>Configure the disk and allocation method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="total-blocks">Total Disk Blocks: {totalBlocks}</Label>
                  <Slider
                    id="total-blocks"
                    min={10}
                    max={50}
                    step={1}
                    value={[totalBlocks]}
                    onValueChange={(value) => setTotalBlocks(value[0])}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="allocation-type">Allocation Method</Label>
                  <Tabs defaultValue="contiguous" value={allocationType} onValueChange={setAllocationType}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="contiguous">Contiguous</TabsTrigger>
                      <TabsTrigger value="linked">Linked</TabsTrigger>
                      <TabsTrigger value="indexed">Indexed</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="file-size">File Size (in blocks)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file-size"
                      type="number"
                      min={1}
                      max={totalBlocks}
                      value={fileSize}
                      onChange={(e) => setFileSize(Number.parseInt(e.target.value) || 1)}
                    />
                    <Button onClick={allocateFile}>Allocate File</Button>
                    <Button variant="outline" onClick={resetDisk}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset Disk
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Disk Visualization</CardTitle>
              <CardDescription>
                {allocationType === "contiguous" && "Contiguous allocation stores files in adjacent blocks"}
                {allocationType === "linked" &&
                  "Linked allocation stores files in blocks that may be scattered across the disk"}
                {allocationType === "indexed" && "Indexed allocation uses an index block to track file blocks"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Disk Blocks</h3>
                <div className="grid grid-cols-10 gap-1">
                  {diskState.map((block, index) => (
                    <div
                      key={index}
                      className={`aspect-square flex items-center justify-center rounded-md border ${getBlockColor(block.fileId)}`}
                    >
                      {index}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Allocated Files</h3>
                {files.length === 0 ? (
                  <p className="text-muted-foreground">No files allocated yet.</p>
                ) : (
                  <div className="space-y-2">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-2 ${getBlockColor(file.id)}`}></div>
                          <span className="font-medium">File {file.id}</span>
                          <span className="ml-2 text-muted-foreground">Size: {file.size} blocks</span>

                          {allocationType === "contiguous" && file.startBlock !== undefined && (
                            <span className="ml-2 text-muted-foreground">
                              Blocks: {file.startBlock} to {file.startBlock + file.size - 1}
                            </span>
                          )}

                          {allocationType === "linked" && file.blocks && (
                            <span className="ml-2 text-muted-foreground">Blocks: {file.blocks.join(" → ")}</span>
                          )}

                          {allocationType === "indexed" && file.startBlock !== undefined && file.blocks && (
                            <span className="ml-2 text-muted-foreground">
                              Index: {file.startBlock}, Data: {file.blocks.join(", ")}
                            </span>
                          )}
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => deleteFile(file.id)}>
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Allocation Method Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={allocationType} value={allocationType} onValueChange={setAllocationType}>
                <TabsContent value="contiguous">
                  <div className="space-y-4">
                    <p>
                      <strong>Contiguous Allocation</strong> stores a file in adjacent blocks on the disk. The file
                      system needs to know only the starting block and the length of the file.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Advantages:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Simple implementation</li>
                          <li>Excellent read performance</li>
                          <li>Direct access to any block</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Disadvantages:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>External fragmentation</li>
                          <li>Difficult to grow files</li>
                          <li>Requires defragmentation</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="linked">
                  <div className="space-y-4">
                    <p>
                      <strong>Linked Allocation</strong> stores a file as a linked list of blocks. Each block contains a
                      pointer to the next block. The directory needs to store only the first block of the file.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Advantages:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>No external fragmentation</li>
                          <li>Files can easily grow</li>
                          <li>No need for contiguous space</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Disadvantages:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Poor random access performance</li>
                          <li>Space overhead for pointers</li>
                          <li>Reliability issues (pointer errors)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="indexed">
                  <div className="space-y-4">
                    <p>
                      <strong>Indexed Allocation</strong> uses an index block that contains pointers to all the blocks
                      of the file. The directory entry points to the index block.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Advantages:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Supports direct access</li>
                          <li>No external fragmentation</li>
                          <li>Files can easily grow</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Disadvantages:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Space overhead for index blocks</li>
                          <li>Maximum file size limited by index block</li>
                          <li>Additional disk I/O for index access</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-between mt-10">
          <Button variant="outline" asChild>
            <Link href="/demos">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Demos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

