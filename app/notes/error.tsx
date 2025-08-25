'use client';

type Props = {
  error: Error;
};

export default function error({ error }: Props) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}
