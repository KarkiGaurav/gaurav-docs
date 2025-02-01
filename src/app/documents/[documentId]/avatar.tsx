import { Separator } from "@/components/ui/separator";
import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

const AVATAR_SIZE = 36;

export const Avatars = () => {
    return (
        <ClientSideSuspense fallback={null}>
            <AvatarStack />
        </ClientSideSuspense>
    )
}
const AvatarStack = () => {
    const users = useOthers();
    const currentUser = useSelf()

    if (users.length === 0) return null

    return (
        <>
            <div className="flex items-center">
                {currentUser && (
                    <div className="relative mt-2">
                        <img src={currentUser.info.avatar} alt="You" />
                    </div>
                )}
                <div className="flex">
                    {users.map(({ connectionId, info }) => {
                        return (
                            <Avatar key={connectionId} src={info.avatar} name={info.name} />
                        )
                    })}
                </div>
            </div>
            <Separator orientation="vertical" className="h-6" />
        </>
    )
}


interface AvatarProps {
    src: string
    name: string
}


const Avatar = ({ src, name }: AvatarProps) => {
    return (
        <div
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
            className="group -ml-2 shrink-0 place-content-center flex relative border-4 border-white bg-gray-500 rounded-full"
        >
            <div className="opacity-0 group-hover:opacity-1 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity">
                {name}
            </div>
            <img alt="name" src={src} className="size-full rounded-full" />

        </div>
    )
}

export default Avatar
