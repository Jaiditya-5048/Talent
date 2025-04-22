import { useState, ReactNode } from 'react';
import { Notice } from '../util/types';
import { NoticeContext } from './NoticeContext';

export const NoticeProvider = ({ children }: { children: ReactNode }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [deleteId, setDeleteId] = useState<string | number>('');
  const [modal, setModal] = useState<'add' | 'delete' | null>(null);

  const openModal = (type: 'add' | 'delete') => setModal(type);
  const closeModal = () => setModal(null);
  const saveNotices = (data: Notice[]) => setNotices(data);

  return (
    <NoticeContext.Provider
      value={{
        notices,
        modal,
        openModal,
        closeModal,
        deleteId,
        setDeleteId,
        saveNotices,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};
