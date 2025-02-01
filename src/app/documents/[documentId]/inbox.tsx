import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { BellIcon } from "lucide-react"
import { ClientSideSuspense } from "@liveblocks/react"
import { useInboxNotifications } from "@liveblocks/react/suspense"
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui"
import { Separator } from "@/components/ui/separator"

export const Inbox = () => {
    return (
        <ClientSideSuspense fallback={
            <>
                <Button variant="ghost" size='icon' className="relative" disabled>
                    <BellIcon className="size-5" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
            </>
        }>
            <InboxMenu />
        </ClientSideSuspense>
    )
}



const InboxMenu = () => {

    const { inboxNotifications } = useInboxNotifications();

    return (

        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size='icon' className="relative">
                        <BellIcon className="size-5" />

                        {
                            inboxNotifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-sky-500 size-4 rounded-full text-sx text-white flex items-center justify-center">
                                    {inboxNotifications.length}
                                </span>

                            )
                        }

                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto" align="end">
                    {
                        inboxNotifications.length > 0 ? (
                            <InboxNotificationList>
                                {inboxNotifications.map((notificaton) => (
                                    <InboxNotification key={notificaton.id} inboxNotification={notificaton} />
                                ))}
                            </InboxNotificationList>

                        ) : (
                            <div className="p-2 w-[400px] text-xs text-center text-muted-foreground">
                                No notification
                            </div>
                        )
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="h-6" />
        </>


    )
}