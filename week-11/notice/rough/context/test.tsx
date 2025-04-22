// import { createContext, useContext, useState, ReactNode } from 'react';
// import { Notice } from '../util/types';



// export interface NoticeContextType {
//   notices: Notice[];
//   // addNotice: (notice: Notice) => void;
//   // deleteNotice: (id: string) => void;
//   modal: 'add' | 'delete' | null;
//   openModal: (type: 'add' | 'delete') => void;
//   closeModal: () => void;
//   deleteId: string | number;
//   setDeleteId: (Id: string | number) => void;
//   saveNotices: (data:Notice[]) => void;
// }

// const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

// export const NoticeProvider = ({ children }: { children: ReactNode }) => {
//   const [notices, setNotices] = useState<Notice[]>([]);
//   const [deleteId, setDeleteId] = useState<string | number>('');
//   const [modal, setModal] = useState<'add' | 'delete' | null>(null);
//   // const [refresh, setRefresh] = useState<boolean>();

//   // const addNotice = (notice: Notice) => {
//   //   setNotices((prev) => [...prev, notice]);
//   // };

//   // const deleteNotice = (id: string) => {
//   //   setNotices((prev) => prev.filter((notice) => notice.id !== id));
//   // };

//   const openModal = (type: 'add' | 'delete') => setModal(type);
//   const closeModal = () => setModal(null);
//   const saveNotices = (data:Notice[]) => setNotices(data);
//   return (
//     <NoticeContext.Provider
//       value={{
//         notices,
//         // addNotice,
//         modal,
//         openModal,
//         closeModal,
//         deleteId,
//         setDeleteId,
//         saveNotices,
//       }}
//     >
//       {children}
//     </NoticeContext.Provider>
//   );
// };

// export const useNotice = () => {
//   const context = useContext(NoticeContext);
//   if (!context) throw new Error('useNotice must be used within NoticeProvider');
//   return context;
// };



// noticeContext;