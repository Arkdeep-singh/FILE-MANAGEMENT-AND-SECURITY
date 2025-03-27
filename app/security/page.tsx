import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SecurityPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">File Security</h1>
      </div>

      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Protecting Your Data</h2>
          <p className="text-muted-foreground mb-4">
            File security involves protecting files from unauthorized access, corruption, and loss. Implementing proper
            security measures is essential for maintaining data integrity, confidentiality, and availability.
          </p>
          <div className="flex justify-center my-8">
            <div className="p-8 bg-muted rounded-lg flex items-center justify-center">
              <Shield className="h-32 w-32 text-primary" />
            </div>
          </div>
        </section>

        <Tabs defaultValue="access-control" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="access-control">Access Control</TabsTrigger>
            <TabsTrigger value="encryption">Encryption</TabsTrigger>
            <TabsTrigger value="backup">Backup & Recovery</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
          </TabsList>
          <TabsContent value="access-control" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Access Control</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  Access control mechanisms determine who can access files and what operations they can perform. These
                  mechanisms are fundamental to file security and are implemented at various levels in the operating
                  system.
                </p>
                <h4 className="font-medium mb-2">Types of Access Control:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Discretionary Access Control (DAC)</li>
                  <li>Mandatory Access Control (MAC)</li>
                  <li>Role-Based Access Control (RBAC)</li>
                  <li>Attribute-Based Access Control (ABAC)</li>
                </ul>
                <h4 className="font-medium mb-2">Common Access Rights:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Read: View file contents</li>
                  <li>Write: Modify file contents</li>
                  <li>Execute: Run the file as a program</li>
                  <li>Delete: Remove the file</li>
                  <li>List: View directory contents</li>
                  <li>Append: Add to file without modifying existing content</li>
                </ul>
              </div>
              <div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-2">Unix/Linux File Permissions:</h4>
                  <div className="p-3 bg-background rounded-md font-mono text-sm">
                    # File permission representation
                    <br />
                    -rwxr-xr-- 1 owner group 4096 Jan 1 12:00 file.txt
                    <br />
                    <br /># Breakdown:
                    <br /># - : File type (regular file)
                    <br /># rwx : Owner permissions (read, write, execute)
                    <br /># r-x : Group permissions (read, execute)
                    <br /># r-- : Others permissions (read only)
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Access Control Lists (ACLs):</h4>
                  <p className="mb-2">
                    ACLs provide more granular control by allowing permissions to be set for specific users or groups
                    beyond the basic owner/group/others model.
                  </p>
                  <div className="p-3 bg-background rounded-md font-mono text-sm">
                    # Example ACL
                    <br />
                    file: project.doc
                    <br />
                    owner: alice (read, write)
                    <br />
                    group: developers (read)
                    <br />
                    user: bob (read, write)
                    <br />
                    user: charlie (read)
                    <br />
                    default: (no access)
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="encryption" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Encryption</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  Encryption transforms data into a format that is unreadable without the proper decryption key. It
                  ensures that even if unauthorized access occurs, the data remains protected.
                </p>
                <h4 className="font-medium mb-2">Types of Encryption:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Symmetric Encryption: Uses the same key for encryption and decryption</li>
                  <li>
                    Asymmetric Encryption: Uses different keys for encryption (public key) and decryption (private key)
                  </li>
                  <li>Hybrid Encryption: Combines both symmetric and asymmetric methods</li>
                </ul>
                <h4 className="font-medium mb-2">Encryption Levels:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>File-level encryption: Individual files are encrypted</li>
                  <li>Folder-level encryption: All files in a folder are encrypted</li>
                  <li>Disk-level encryption: The entire disk or partition is encrypted</li>
                  <li>Database encryption: Data within databases is encrypted</li>
                </ul>
              </div>
              <div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-2">Common Encryption Algorithms:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>AES (Advanced Encryption Standard): Symmetric, widely used</li>
                    <li>RSA: Asymmetric, used for secure communications</li>
                    <li>ECC (Elliptic Curve Cryptography): Asymmetric, efficient for mobile devices</li>
                    <li>Blowfish: Symmetric, fast for bulk encryption</li>
                    <li>ChaCha20: Symmetric, high-performance stream cipher</li>
                  </ul>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Encryption Implementation:</h4>
                  <p className="mb-2">Encryption can be implemented at various levels:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Application-level: The application handles encryption/decryption</li>
                    <li>File system-level: The file system encrypts/decrypts transparently</li>
                    <li>Hardware-level: Specialized hardware performs encryption operations</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">
                    Examples: BitLocker (Windows), FileVault (macOS), LUKS (Linux), VeraCrypt (cross-platform)
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="backup" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Backup & Recovery</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  Backup and recovery strategies protect against data loss due to hardware failure, human error,
                  malware, or disasters. A comprehensive backup strategy is essential for data security.
                </p>
                <h4 className="font-medium mb-2">Types of Backups:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Full Backup: Complete copy of all selected data</li>
                  <li>Incremental Backup: Only changes since the last backup</li>
                  <li>Differential Backup: All changes since the last full backup</li>
                  <li>Mirror Backup: Exact copy of the selected data</li>
                </ul>
                <h4 className="font-medium mb-2">Backup Media:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>External hard drives</li>
                  <li>Network-attached storage (NAS)</li>
                  <li>Cloud storage</li>
                  <li>Tape drives</li>
                  <li>Optical media (DVD, Blu-ray)</li>
                </ul>
              </div>
              <div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-2">3-2-1 Backup Strategy:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>3 copies of your data (original + 2 backups)</li>
                    <li>2 different storage types</li>
                    <li>1 copy stored offsite</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">
                    This strategy provides redundancy and protection against various types of failures and disasters.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Recovery Considerations:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Recovery Time Objective (RTO): Maximum acceptable time to restore data</li>
                    <li>Recovery Point Objective (RPO): Maximum acceptable data loss period</li>
                    <li>Testing: Regular testing of backup restoration</li>
                    <li>Documentation: Detailed recovery procedures</li>
                    <li>Versioning: Keeping multiple versions of backups</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="authentication" className="p-4 border rounded-md mt-2">
            <h3 className="text-xl font-semibold mb-4">Authentication</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="mb-4">
                  Authentication verifies the identity of users before granting access to files and systems. Strong
                  authentication is the foundation of effective access control.
                </p>
                <h4 className="font-medium mb-2">Authentication Factors:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Something you know (passwords, PINs)</li>
                  <li>Something you have (security tokens, smart cards)</li>
                  <li>Something you are (biometrics: fingerprints, facial recognition)</li>
                  <li>Somewhere you are (location-based authentication)</li>
                </ul>
                <h4 className="font-medium mb-2">Authentication Methods:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Password-based authentication</li>
                  <li>Multi-factor authentication (MFA)</li>
                  <li>Biometric authentication</li>
                  <li>Certificate-based authentication</li>
                  <li>Single Sign-On (SSO)</li>
                </ul>
              </div>
              <div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-medium mb-2">Password Best Practices:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use strong, unique passwords for each system</li>
                    <li>Implement password complexity requirements</li>
                    <li>Set appropriate password expiration policies</li>
                    <li>Use password managers to store and generate passwords</li>
                    <li>Implement account lockout after failed attempts</li>
                  </ul>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">Advanced Authentication:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>FIDO2/WebAuthn: Passwordless authentication standard</li>
                    <li>OAuth and OpenID Connect: For third-party authentication</li>
                    <li>Kerberos: Network authentication protocol</li>
                    <li>LDAP: Directory service for authentication</li>
                    <li>Adaptive authentication: Risk-based approach</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Common File Security Threats</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Unauthorized Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Occurs when individuals gain access to files they shouldn't have permission to view or modify.
                </p>
                <h4 className="font-medium mb-2">Mitigation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Proper access controls</li>
                  <li>Strong authentication</li>
                  <li>Regular permission audits</li>
                  <li>Principle of least privilege</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Malware</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Malicious software that can corrupt, encrypt, or steal file data.</p>
                <h4 className="font-medium mb-2">Mitigation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Anti-malware software</li>
                  <li>Regular system updates</li>
                  <li>User education</li>
                  <li>Application whitelisting</li>
                  <li>Regular backups</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ransomware</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Encrypts files and demands payment for the decryption key.</p>
                <h4 className="font-medium mb-2">Mitigation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Offline backups</li>
                  <li>Email filtering</li>
                  <li>Restricted execution policies</li>
                  <li>Network segmentation</li>
                  <li>Security awareness training</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Data Leakage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Unauthorized transmission of data outside the organization.</p>
                <h4 className="font-medium mb-2">Mitigation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Data Loss Prevention (DLP) tools</li>
                  <li>Encryption of sensitive data</li>
                  <li>Monitoring of data transfers</li>
                  <li>Clear data handling policies</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Insider Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Malicious actions by authorized users who abuse their access.</p>
                <h4 className="font-medium mb-2">Mitigation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Principle of least privilege</li>
                  <li>Separation of duties</li>
                  <li>Activity monitoring</li>
                  <li>Regular access reviews</li>
                  <li>Employee training</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Physical Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Theft, damage, or loss of physical storage devices.</p>
                <h4 className="font-medium mb-2">Mitigation:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Physical security measures</li>
                  <li>Device encryption</li>
                  <li>Remote wipe capabilities</li>
                  <li>Secure disposal procedures</li>
                  <li>Offsite backups</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-semibold mb-4">Security Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Organizational Policies</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Data Classification:</span> Categorize data based on sensitivity and
                  apply appropriate security controls.
                </li>
                <li>
                  <span className="font-medium">Access Control Policy:</span> Define who can access what resources and
                  under what conditions.
                </li>
                <li>
                  <span className="font-medium">Backup Policy:</span> Establish regular backup schedules, retention
                  periods, and testing procedures.
                </li>
                <li>
                  <span className="font-medium">Incident Response Plan:</span> Prepare procedures for responding to
                  security breaches.
                </li>
                <li>
                  <span className="font-medium">Security Awareness Training:</span> Educate users about security risks
                  and best practices.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Technical Controls</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Regular Updates:</span> Keep systems and applications patched and
                  updated.
                </li>
                <li>
                  <span className="font-medium">Defense in Depth:</span> Implement multiple layers of security controls.
                </li>
                <li>
                  <span className="font-medium">Encryption:</span> Encrypt sensitive data both at rest and in transit.
                </li>
                <li>
                  <span className="font-medium">Monitoring and Logging:</span> Track file access and changes for audit
                  purposes.
                </li>
                <li>
                  <span className="font-medium">Security Testing:</span> Regularly test security controls through
                  vulnerability assessments and penetration testing.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-between mt-10">
          <Button variant="outline" asChild>
            <Link href="/free-space">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous: Free Space Management
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

