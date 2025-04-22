import { createContext } from 'react';
import { Notice } from '../util/types';

export interface NoticeContextType {
  notices: Notice[];
  modal: 'add' | 'delete' | null;
  openModal: (type: 'add' | 'delete') => void;
  closeModal: () => void;
  deleteId: string | number;
  setDeleteId: (Id: string | number) => void;
  saveNotices: (data: Notice[]) => void;
}

export const NoticeContext = createContext<NoticeContextType | undefined>(undefined);
