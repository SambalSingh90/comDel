'use client';

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from 'lucide-react'
import { UserCard } from "../components/user-card"

// Fetch users function
async function fetchUsers() {
  // Replace this with your API/database fetch logic
  return [
    { id: "1", name: "Alice", phoneNumber: "123-456-7890", email: "alice@example.com", location: "New York" },
    { id: "2", name: "Bob", phoneNumber: "987-654-3210", email: "bob@example.com", location: "San Francisco" },
  ];
}

// Main Page Component
export default async function Page() {
  const users = await fetchUsers();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* About Section */}
        <h1 className="text-3xl font-bold mb-8">About Person Search</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Person Search is a demonstration project showcasing the power of Next.js, React, and modern web technologies.
              It provides a simple yet effective interface for searching and displaying user information.
            </p>
            <p className="mb-4">
              This project utilizes Next.js 14 with the App Router, React 18, TypeScript, and a variety of
              cutting-edge libraries to create a responsive and accessible user experience.
            </p>
            <p>
              Key features include asynchronous search functionality, server-side filtering,
              and a dark mode toggle for user comfort.
            </p>
          </CardContent>
        </Card>

        {/* Developer Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About the Developer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Hi, I&apos;m <code>Callum Bir</code>, the developer behind Person Search. I&apos;m passionate about creating
              efficient, user-friendly web applications using the latest technologies.
            </p>
            <p className="mb-4">
              This project serves as a demonstration of my skills in Next.js, React, and modern frontend development.
              I&apos;m always looking to learn and improve, so feel free to reach out with any questions or feedback!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href="https://www.linkedin.com/in/callumbir/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="https://github.com/gocallum" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="https://x.com/callumbir">
                  <Twitter className="mr-2 h-4 w-4" /> Contact Me
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User List Section */}
        <h2 className="text-2xl font-bold mb-6">User List</h2>
        <div className="grid gap-6">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        <Button asChild variant="link" className="mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </main>
    </div>
  );
}
