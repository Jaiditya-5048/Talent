import { useContext } from 'react';
import { NoticeContext } from './NoticeContext';

export const useNotice = () => {
  const context = useContext(NoticeContext);
  if (!context) throw new Error('useNotice must be used within a NoticeProvider');
  return context;
};
