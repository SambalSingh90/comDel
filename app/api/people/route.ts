import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/actions/schemas";
import { searchUsers } from "@/app/actions/actions";
import { revalidatePath } from "next/cache";

// Mock function: Replace this with your actual database logic
async function deletePersonFromDatabase(id: string): Promise<boolean> {
  console.log(`Deleted person with ID: ${id}`);
  return true; // Simulate successful deletion
}

// GET Method to search users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const users: User[] = await searchUsers(query);

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE Method to delete user (supports both request body and dynamic route parameters)
export async function DELETE(request: Request, { params }: { params: { id?: string } }) {
  try {
    let id = params?.id;

    // If no `id` in route params, extract it from the request body
    if (!id) {
      const body = await request.json();
      id = body.id;

      if (!id) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }
    }

    // Perform delete operation
    const isDeleted = await deletePersonFromDatabase(id);

    if (!isDeleted) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Revalidate the path to update the UI
    revalidatePath("/");

    return new Response(null, { status: 204 }); // No content response
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
