import { createContext, useContext, useState, ReactNode } from 'react';
import { NoticeApi, Flasy, categoryApiResponse } from '../util/types';

export interface NoticeContextType {
  notices: NoticeApi[];
  setNotices: React.Dispatch<React.SetStateAction<NoticeApi[]>>;
  modal: 'add' | 'delete' | null;
  openModal: (type: 'add' | 'delete') => void;
  closeModal: () => void;
  noticeId: string | number;
  setNoticeId: (Id: string | number) => void;
  saveNotices: (data: NoticeApi[]) => void;
  flashy: Flasy | null;
  setFlashy: (flash: Flasy | null) => void;
  edit: boolean;
  setEdit: (flag: boolean) => void;
  notice: NoticeApi;
  setNotice: (notice: NoticeApi) => void;
  categories: categoryApiResponse[];
  setCategories: (catgories: categoryApiResponse[]) => void;
  category: string;
  setCategory: (category: string) => void;
  categoryId: string;
  setCategoryId: (categoryId: string) => void;
  draggble: boolean;
  setDraggble: (draggbleId: boolean) => void;
}

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

export const NoticeProvider = ({ children }: { children: ReactNode }) => {
  const note = {
    _id: '',
    title: '',
    description: '',
    pin: false,
    categories: [{ category: { _id: '', category: '', counter: 0, }, order: 0, _id: '' }],
    createdAt: '',
    updatedAt: '',
  };
  
  const [notices, setNotices] = useState<NoticeApi[]>([]);
  const [noticeId, setNoticeId] = useState<string | number>('');
  const [notice, setNotice] = useState<NoticeApi>(note);
  const [modal, setModal] = useState<'add' | 'delete' | null>(null);
  const [flashy, setFlashy] = useState<Flasy | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [categories, setCategories] = useState<categoryApiResponse[]>([]);
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [draggble, setDraggble] = useState(false);
  const openModal = (type: 'add' | 'delete') => setModal(type);
  const closeModal = () => {
    setModal(null);
    setEdit(false);
  };
  const saveNotices = (data: NoticeApi[]) => setNotices(data);
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
        category,
        setCategory,
        categoryId,
        setCategoryId,
        draggble,
        setDraggble,
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
