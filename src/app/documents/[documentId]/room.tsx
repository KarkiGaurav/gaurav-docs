"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {

    const params = useParams()

  return (
    <LiveblocksProvider publicApiKey={"pk_dev_p0wAi4Oe9gk2vCrsHyT6T0FMoDI6BNOyuEYZcyo0WpzzYPnaXUFJA_-iQp7jUlBJ"}>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}