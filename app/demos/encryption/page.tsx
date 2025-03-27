"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Lock, Unlock, Copy, Check, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EncryptionDemoPage() {
  const [plaintext, setPlaintext] = useState("This is a secret message that needs to be encrypted.")
  const [key, setKey] = useState("mysecretkey")
  const [encryptionType, setEncryptionType] = useState("caesar")
  const [encryptedText, setEncryptedText] = useState("")
  const [decryptedText, setDecryptedText] = useState("")
  const [copied, setCopied] = useState(false)
  const [shift, setShift] = useState(3)

  // Simple Caesar cipher implementation
  const caesarCipher = (text: string, shift: number, decrypt = false) => {
    const actualShift = decrypt ? 26 - (shift % 26) : shift
    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0)

        // Uppercase letters
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + actualShift) % 26) + 65)
        }
        // Lowercase letters
        else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + actualShift) % 26) + 97)
        }
        // Non-alphabetic characters
        return char
      })
      .join("")
  }

  // Simple XOR cipher implementation
  const xorCipher = (text: string, key: string) => {
    return text
      .split("")
      .map((char, i) => {
        // XOR the char code with the corresponding key char code
        const keyChar = key[i % key.length]
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0))
      })
      .join("")
  }

  // Simple substitution cipher
  const substitutionCipher = (text: string, key: string, decrypt = false) => {
    // Create a simple substitution table based on the key
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const substitutionTable: Record<string, string> = {}

    // Use the key to create a unique substitution table
    const seed = Array.from(key).reduce((sum, char) => sum + char.charCodeAt(0), 0)
    const shuffled = [...alphabet].sort(() => (seed % 2) - 0.5)

    if (!decrypt) {
      // Encryption: map regular alphabet to shuffled
      for (let i = 0; i < alphabet.length; i++) {
        substitutionTable[alphabet[i]] = shuffled[i]
        substitutionTable[alphabet[i].toUpperCase()] = shuffled[i].toUpperCase()
      }
    } else {
      // Decryption: map shuffled back to regular alphabet
      for (let i = 0; i < alphabet.length; i++) {
        substitutionTable[shuffled[i]] = alphabet[i]
        substitutionTable[shuffled[i].toUpperCase()] = alphabet[i].toUpperCase()
      }
    }

    // Apply substitution
    return text
      .split("")
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          return substitutionTable[char] || char
        }
        return char
      })
      .join("")
  }

  const encrypt = () => {
    let result = ""

    switch (encryptionType) {
      case "caesar":
        result = caesarCipher(plaintext, shift)
        break
      case "xor":
        result = xorCipher(plaintext, key)
        // Convert to Base64 for display since XOR can produce non-printable characters
        result = btoa(result)
        break
      case "substitution":
        result = substitutionCipher(plaintext, key, false)
        break
      default:
        result = "Encryption method not implemented"
    }

    setEncryptedText(result)
    setDecryptedText("")
  }

  const decrypt = () => {
    if (!encryptedText) return

    let result = ""
    let textToDecrypt = encryptedText

    switch (encryptionType) {
      case "caesar":
        result = caesarCipher(textToDecrypt, shift, true)
        break
      case "xor":
        // Convert from Base64 first
        try {
          textToDecrypt = atob(textToDecrypt)
          result = xorCipher(textToDecrypt, key)
        } catch (e) {
          result = "Invalid Base64 input"
        }
        break
      case "substitution":
        result = substitutionCipher(textToDecrypt, key, true)
        break
      default:
        result = "Decryption method not implemented"
    }

    setDecryptedText(result)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateRandomKey = () => {
    if (encryptionType === "caesar") {
      const randomShift = Math.floor(Math.random() * 25) + 1
      setShift(randomShift)
    } else {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      const length = 12
      let result = ""
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setKey(result)
    }
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
        <h1 className="text-3xl font-bold">Encryption Demo</h1>
      </div>

      <div className="grid gap-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Encryption Configuration</CardTitle>
              <CardDescription>Choose an encryption method and configure its parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="encryption-type">Encryption Method</Label>
                  <Select value={encryptionType} onValueChange={setEncryptionType}>
                    <SelectTrigger id="encryption-type">
                      <SelectValue placeholder="Select encryption method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caesar">Caesar Cipher</SelectItem>
                      <SelectItem value="xor">XOR Cipher</SelectItem>
                      <SelectItem value="substitution">Substitution Cipher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {encryptionType === "caesar" ? (
                  <div className="grid gap-2">
                    <Label htmlFor="shift">Shift Value (1-25)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="shift"
                        type="number"
                        min={1}
                        max={25}
                        value={shift}
                        onChange={(e) => setShift(Number.parseInt(e.target.value) || 1)}
                      />
                      <Button variant="outline" onClick={generateRandomKey}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Random
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Caesar cipher shifts each letter in the plaintext by a fixed number of positions in the alphabet.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Label htmlFor="key">Encryption Key</Label>
                    <div className="flex items-center gap-2">
                      <Input id="key" type="text" value={key} onChange={(e) => setKey(e.target.value)} />
                      <Button variant="outline" onClick={generateRandomKey}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Random
                      </Button>
                    </div>
                    {encryptionType === "xor" && (
                      <p className="text-sm text-muted-foreground">
                        XOR cipher performs the exclusive OR operation between each character and the key.
                      </p>
                    )}
                    {encryptionType === "substitution" && (
                      <p className="text-sm text-muted-foreground">
                        Substitution cipher replaces each letter with another letter based on a key-generated mapping.
                      </p>
                    )}
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="plaintext">Plaintext</Label>
                  <Textarea
                    id="plaintext"
                    placeholder="Enter text to encrypt"
                    value={plaintext}
                    onChange={(e) => setPlaintext(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={encrypt} className="flex-1">
                    <Lock className="mr-2 h-4 w-4" />
                    Encrypt
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Encryption Results</CardTitle>
              <CardDescription>View the encrypted text and decrypt it back</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="encrypted">Encrypted Text</Label>
                  <div className="relative">
                    <Textarea
                      id="encrypted"
                      placeholder="Encrypted text will appear here"
                      value={encryptedText}
                      onChange={(e) => setEncryptedText(e.target.value)}
                      rows={4}
                    />
                    {encryptedText && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => copyToClipboard(encryptedText)}
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                </div>

                <Button onClick={decrypt} disabled={!encryptedText}>
                  <Unlock className="mr-2 h-4 w-4" />
                  Decrypt
                </Button>

                <div className="grid gap-2 mt-4">
                  <Label htmlFor="decrypted">Decrypted Text</Label>
                  <Textarea
                    id="decrypted"
                    placeholder="Decrypted text will appear here"
                    value={decryptedText}
                    readOnly
                    rows={4}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>How Encryption Works</CardTitle>
              <CardDescription>Learn about different encryption methods</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={encryptionType} value={encryptionType} onValueChange={setEncryptionType}>
                <TabsContent value="caesar">
                  <div className="space-y-4">
                    <p>
                      <strong>Caesar Cipher</strong> is one of the simplest and oldest encryption techniques. It works
                      by shifting each letter in the plaintext by a fixed number of positions in the alphabet.
                    </p>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Example:</h4>
                      <p>
                        Plaintext: <code>HELLO</code>
                      </p>
                      <p>
                        Shift: <code>3</code>
                      </p>
                      <p>
                        Encrypted: <code>KHOOR</code>
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        H → K (shift 3 positions)
                        <br />E → H (shift 3 positions)
                        <br />L → O (shift 3 positions)
                        <br />L → O (shift 3 positions)
                        <br />O → R (shift 3 positions)
                      </p>
                    </div>
                    <p>
                      While simple to implement, Caesar cipher is extremely weak by modern standards because there are
                      only 25 possible keys to try.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="xor">
                  <div className="space-y-4">
                    <p>
                      <strong>XOR Cipher</strong> uses the exclusive OR (XOR) logical operation to encrypt data. XOR has
                      the special property that applying it twice with the same key restores the original data.
                    </p>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Example:</h4>
                      <p>
                        Plaintext: <code>A</code> (ASCII 65 or binary 01000001)
                      </p>
                      <p>
                        Key: <code>K</code> (ASCII 75 or binary 01001011)
                      </p>
                      <p>
                        XOR operation: <code>01000001 ⊕ 01001011 = 00001010</code>
                      </p>
                      <p>
                        Encrypted: <code>00001010</code> (ASCII 10)
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        To decrypt, apply XOR with the same key again:
                        <br />
                        <code>00001010 ⊕ 01001011 = 01000001</code> (back to 'A')
                      </p>
                    </div>
                    <p>
                      XOR cipher is more secure than Caesar cipher when used with a key that is as long as the message
                      (one-time pad), but becomes less secure with shorter, repeating keys.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="substitution">
                  <div className="space-y-4">
                    <p>
                      <strong>Substitution Cipher</strong> replaces each letter in the plaintext with another letter
                      according to a fixed mapping. The key determines how the substitution alphabet is generated.
                    </p>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Example:</h4>
                      <p>
                        Regular alphabet: <code>ABCDEFGHIJKLMNOPQRSTUVWXYZ</code>
                      </p>
                      <p>
                        Substitution alphabet: <code>QWERTYUIOPASDFGHJKLZXCVBNM</code>
                      </p>
                      <p>
                        Plaintext: <code>HELLO</code>
                      </p>
                      <p>
                        Encrypted: <code>JTGGK</code>
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        H → J (8th letter maps to 10th in substitution)
                        <br />E → T (5th letter maps to 20th in substitution)
                        <br />L → G (12th letter maps to 7th in substitution)
                        <br />L → G (12th letter maps to 7th in substitution)
                        <br />O → K (15th letter maps to 11th in substitution)
                      </p>
                    </div>
                    <p>
                      Substitution ciphers are more secure than Caesar ciphers because there are 26! (factorial)
                      possible substitution alphabets, but they can be broken using frequency analysis.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Note: These are simple demonstrations for educational purposes. Modern encryption uses much more
                sophisticated algorithms like AES, RSA, and ECC that are mathematically proven to be secure.
              </p>
            </CardFooter>
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

