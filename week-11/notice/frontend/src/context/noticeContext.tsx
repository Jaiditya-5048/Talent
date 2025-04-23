import { createContext, useContext, useState, ReactNode } from 'react';
import { Notice, Flasy, catagoryApiResponse } from '../util/types';

;

export interface NoticeContextType {
  notices: Notice[];
  setNotices: (notice: Notice[]) => void;
  modal: 'add' | 'delete' | null;
  openModal: (type: 'add' | 'delete') => void;
  closeModal: () => void;
  noticeId: string | number;
  setNoticeId: (Id: string | number) => void;
  saveNotices: (data: Notice[]) => void;
  flashy: Flasy | null;
  setFlashy: (flash: Flasy | null) => void;
  edit: boolean;
  setEdit: (flag: boolean) => void;
  notice: Notice;
  setNotice: (notice: Notice) => void;
  categories: catagoryApiResponse[];
  setCategories: (catgories: catagoryApiResponse[]) => void;
}

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

export const NoticeProvider = ({ children }: { children: ReactNode }) => {
 const note = {
  _id: '',
  title: '',
  description: '',
  pin: false,
  createdAt: '',
  updatedAt: '',
}
  const [notices, setNotices] = useState<Notice[]>([]);
  const [noticeId, setNoticeId] = useState<string | number>('');
  const [notice, setNotice] = useState<Notice>(note);
  const [modal, setModal] = useState<'add' | 'delete' | null>(null);
  const [flashy, setFlashy] = useState<Flasy | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [categories, setCategories] = useState<catagoryApiResponse[]>([]);
  const openModal = (type: 'add' | 'delete') => setModal(type);
  const closeModal = () => {setModal(null); setEdit(false)};
  const saveNotices = (data:Notice[]) => setNotices(data);
  return (
    <NoticeContext.Provider
      value={{
        notices,
        setNotices,
        modal,
        openModal,
        closeModal,
        noticeId,
        setNoticeId,
        saveNotices,
        flashy,
        setFlashy,
        edit,
        setEdit,
        notice,
        setNotice,
        categories,
        setCategories,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};

export const useNotice = () => {
  const context = useContext(NoticeContext);
  if (!context) throw new Error('useNotice must be used within NoticeProvider');
  return context;
};