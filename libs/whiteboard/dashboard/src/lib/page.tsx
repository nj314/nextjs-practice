import { useOrganization } from '@clerk/nextjs';
import { NextPage } from 'next';
import { BoardList } from './components/board-list';
import { EmptyOrg } from './components/empty-org';

type Props = {
  /**
   * Search params are always strings!
   */
  searchParams: {
    favorites?: string;
    search?: string;
  };
};

export const DashboardPage: NextPage<Props> = ({ searchParams }) => {
  const { organization } = useOrganization();

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={{
            favorites: searchParams.favorites === 'true',
            search: searchParams.search,
          }}
        />
      )}
    </div>
  );
};
