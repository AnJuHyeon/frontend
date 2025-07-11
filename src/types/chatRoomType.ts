export interface ChatRoomType {
  roomId: number;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string | null;
  lastSenderid:number;
  unreadCount: number;
  exited: boolean;
  otherId: number;
}
