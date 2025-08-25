import css from './page.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import NoteList from '@/components/NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import error from '@/app/notes/error';

function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);
  return (
    <>
      <div className={css.app}>
        <Header />
        {isPending && <div className={css.loading}>Loading...</div>}
        {isSuccess && data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isError && error}
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default Home;
