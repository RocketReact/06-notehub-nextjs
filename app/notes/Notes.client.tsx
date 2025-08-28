'use client';

import css from './page.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import NoteList from '@/components/NoteList/NoteList';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    throwOnError: true,
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
        <div className={css.toolbar}>
          <SearchBox onSearchChange={handleSearch} />
          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <button onClick={openModal} className={css.button}>
            Create Note+
          </button>
        </div>
        {isSuccess && data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {isPending && <div className={css.loading}>Loading...</div>}
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default NotesClient;
