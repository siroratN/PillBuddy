import { authMiddleware, clerkMiddleware } from "@clerk/nextjs/server";
import { Socket } from "socket.io-client";

import { NextRequest } from "next/server";

export default clerkMiddleware();
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

