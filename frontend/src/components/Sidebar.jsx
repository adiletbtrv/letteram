import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, Pin } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pinnedUsers, setPinnedUsers] = useState(() => {
    const saved = localStorage.getItem("letteram-pinned-users");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    localStorage.setItem("letteram-pinned-users", JSON.stringify(pinnedUsers));
  }, [pinnedUsers]);

  const togglePinUser = (userId) => {
    setPinnedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnline = !showOnlineOnly || onlineUsers.includes(user._id);
    return matchesSearch && matchesOnline;
  });

  const pinnedContacts = filteredUsers.filter((user) => pinnedUsers.includes(user._id));
  const unpinnedContacts = filteredUsers.filter((user) => !pinnedUsers.includes(user._id));

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2 mb-3">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/*Searchbar*/}
        <div className="hidden lg:block mb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered input-sm w-full pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
          </div>
        </div>

        {/*online filter toggle*/}
        <div className="hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm transition-all duration-200"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {/*pinned*/}
        {pinnedContacts.length > 0 && (
          <>
            <div className="px-3 py-2 text-xs font-semibold text-base-content/60 hidden lg:block">
              PINNED
            </div>
            {pinnedContacts.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                isSelected={selectedUser?._id === user._id}
                isOnline={onlineUsers.includes(user._id)}
                isPinned={true}
                onSelect={() => setSelectedUser(user)}
                onTogglePin={() => togglePinUser(user._id)}
              />
            ))}
          </>
        )}

        {/*all contacts*/}
        {unpinnedContacts.length > 0 && pinnedContacts.length > 0 && (
          <div className="px-3 py-2 text-xs font-semibold text-base-content/60 hidden lg:block">
            ALL CONTACTS
          </div>
        )}
        {unpinnedContacts.map((user) => (
          <UserItem
            key={user._id}
            user={user}
            isSelected={selectedUser?._id === user._id}
            isOnline={onlineUsers.includes(user._id)}
            isPinned={false}
            onSelect={() => setSelectedUser(user)}
            onTogglePin={() => togglePinUser(user._id)}
          />
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            {searchQuery ? "No contacts found" : "No online users"}
          </div>
        )}
      </div>
    </aside>
  );
};

const UserItem = ({ user, isSelected, isOnline, isPinned, onSelect, onTogglePin }) => {
  return (
    <div
      className={`
        w-full p-3 flex items-center gap-3 group
        hover:bg-base-300 transition-all duration-200
        ${isSelected ? "bg-base-300 ring-1 ring-base-300" : ""}
      `}
    >
      <button onClick={onSelect} className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative mx-auto lg:mx-0">
          <img
            src={user.profilePic || "/avatar.png"}
            alt={user.name}
            className="size-12 object-cover rounded-full transition-transform duration-200 group-hover:scale-105"
          />
          {isOnline && (
            <span
              className="absolute bottom-0 right-0 size-3 bg-green-500 
              rounded-full ring-2 ring-zinc-900 animate-pulse"
            />
          )}
        </div>

        <div className="hidden lg:block text-left min-w-0 flex-1">
          <div className="font-medium truncate">{user.fullName}</div>
          <div className="text-sm text-zinc-400">{isOnline ? "Online" : "Offline"}</div>
        </div>
      </button>

      <button
        onClick={onTogglePin}
        className={`
          hidden lg:flex p-2 rounded-lg transition-all duration-200
          ${isPinned ? "text-primary bg-primary/10" : "text-base-content/40 hover:bg-base-200"}
          opacity-0 group-hover:opacity-100
        `}
      >
        <Pin className={`size-4 transition-transform duration-200 ${isPinned ? "fill-current" : ""}`} />
      </button>
    </div>
  );
};

export default Sidebar;