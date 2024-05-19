import { NextPage } from 'next';

type Props = {
  /**
   * Search params are always strings!
   */
  searchParams: {};
};

export const QuizPage: NextPage<Props> = ({ searchParams }) => {
  return <div className="">Quiz page</div>;
};
