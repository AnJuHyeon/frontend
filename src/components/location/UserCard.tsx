import React, { useCallback, useState } from 'react';
import { ChevronUp, ChevronDown } from 'react-feather';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { User } from '@/stores/useUserStore';
import gradientOverlay from '@/assets/images/user_profile_radial_gradient.png';
import Tag from './Tag';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: User;
  onSelect: (userId: number) => void;
  selectedUserId: number | null;
  isRequested: boolean;
  onRequest: () => void;
  buttonLabel?: string;
  onButtonClick?: () => void;
  onRejectClick?: () => void;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onSelect,
  selectedUserId,
  isRequested,
  onRequest,
  buttonLabel,
  onButtonClick,
  onRejectClick,
  className = '',
}) => {
  const [showTags, setShowTags] = useState(false);
  const isSelected = selectedUserId === user.id;
  const mode = useBottomSheetStore((state) => state.mode);
  const navigate = useNavigate();

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelect(user.id);
    },
    [onSelect, user.id],
  );

  const handleToggleTags = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTags((prev) => !prev);
  }, []);

  return (
    <div className={`relative ${className}  w-full`}>
      <div
        className={`user-card aspect-[3/5]
    rounded-xl flex flex-col text-white relative overflow-hidden border-2 border-gray-600 bg-[#0A0A0B]
     `}
        onClick={handleCardClick}>
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${user.image})` }}
          />
          <img
            src={gradientOverlay}
            alt="gradient overlay"
            className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
          />
          <div className="absolute inset-0 z-20 flex flex-col p-2 text-white bg-gradient-to-b from-[#18181b] to-transparent via-[#18181b]/0">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs mobile:text-sm tablet:text-base">
                  {user.nickName}
                </p>
                <p className="text-xs">
                  {user.role} • {user.career}
                </p>
              </div>
              <button
                onClick={handleToggleTags}
                className="hover:opacity-80 rounded-full bg-[#18181b] px-1 py-1 mobile:px-2 mobile:py-2 tablet:px-3 tablet:py-3 transition-colors">
                {showTags ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            {showTags && (
              <div className="mt-2 p-2  mobile:p-3 tablet:p-4 text-xs mobile:text-sm tablet:text-base bg-neutral-900/30 backdrop-blur-[5px] rounded-lg shadow-[inset_0px_2px_12px_rgba(161,173,192,0.2)] outline outline-[0.5px] outline-offset-[-0.5px] outline-neutral-200/50">
                <div className="flex flex-col gap-1">
                  {user.tags.map((tag, index) => (
                    <Tag key={index} color={tag.color} text={tag.text} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {mode === 'explore' &&
          (isSelected ? (
            <div className="p-2 mt-2 flex flex-col gap-2 bg-[#0A0A0B] rounded-b-lg transition-all">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profilePreview/${user.id}`);
                }}
                className="w-full px-2 py-2 rounded-full text-#E6E6E6 bg-[#0A0A0B] hover:bg-#146EF5 text-xs mobile:text-sm tablet:text-base">
                상세 프로필 보기
              </button>

              {buttonLabel === '채팅방으로 이동' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onButtonClick?.();
                  }}
                  className="w-full px-2 py-2 rounded-3xl text-#E6E6E6 bg-[#0A0A0B] hover:#146EF5 text-xs mobile:text-sm tablet:text-base">
                  채팅방으로 이동
                </button>
              )}

              {buttonLabel === '수락 대기중...' && (
                <button
                  disabled
                  className="w-full px-2 py-2 rounded-3xl border border-[#2C7DF6] text-[#E6E6E6] bg-[#0A0A0B] cursor-not-allowed text-xs mobile:text-sm tablet:text-base">
                  수락 대기중...
                </button>
              )}

              {!buttonLabel && (
                <button
                  disabled={isRequested}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequest();
                  }}
                  className={`w-full px-2 py-2 rounded-3xl text-#E6E6E6 transition-all
            text-xs mobile:text-sm tablet:text-base
            ${
              isRequested
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-[#0A0A0B] hover:bg-[#146EF5]'
            }`}>
                  {isRequested ? '요청 완료' : '대화 요청하기'}
                </button>
              )}
            </div>
          ) : (
            <div className="p-2 mt-2 bg-[#0A0A0B] rounded-b-lg transition-all">
              <p className="text-xs text-gray-300 mobile:text-sm tablet:text-base">
                {user.introduction}
              </p>
            </div>
          ))}

        {mode === 'chat' && (
          <div className="p-2 mt-2 flex flex-col gap-2 bg-[#0A0A0B] rounded-b-lg transition-all">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profilePreview/${user.id}`);
              }}
              className="w-full px-2 py-2 rounded-full text-#E6E6E6 bg-[#0A0A0B] hover:bg-blue-600 text-xs mobile:text-sm tablet:text-base">
              상세 프로필 보기
            </button>
            {buttonLabel === '수락 대기중...' && (
              <button
                disabled
                className="w-full px-2 py-2 rounded-full border border-[#2C7DF6] text-#E6E6E6 bg-[#0A0A0B] cursor-not-allowed text-xs mobile:text-sm tablet:text-base">
                수락 대기중...
              </button>
            )}

            {buttonLabel === '수락하기' && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onButtonClick) onButtonClick();
                  }}
                  className="w-full px-2 py-2 rounded-full text-#E6E6E6 bg-[#0A0A0B] text-xs mobile:text-sm tablet:text-base">
                  수락하기
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onRejectClick) onRejectClick();
                  }}
                  className="w-full px-2 py-2 rounded-full text-#E6E6E6 bg-[#0A0A0B] text-xs mobile:text-sm tablet:text-base">
                  거절하기
                </button>
              </>
            )}

            {buttonLabel === '채팅방으로 이동' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onButtonClick) onButtonClick();
                }}
                className="w-full px-2 py-2 rounded-full text-#E6E6E6 bg-[#0A0A0B] hover:bg-blue-600 text-xs mobile:text-sm tablet:text-base">
                채팅방으로 이동
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
